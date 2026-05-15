###############################################################################
# Stage 1 — Install dependencies
###############################################################################
FROM node:24-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

###############################################################################
# Stage 2 — Build the application
###############################################################################
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client → ./generated/prisma (see schema.prisma output path)
RUN npx prisma generate

# Build Next.js (output: "standalone" is set in next.config.ts)
RUN npm run build

###############################################################################
# Stage 3 — Lean production runner
###############################################################################
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# ── Next.js standalone bundle ─────────────────────────────────────────────
# Contains server.js + its own minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Static assets (JS/CSS chunks) — must live at .next/static relative to server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
# Public assets
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

# ── Prisma ────────────────────────────────────────────────────────────────
# Generated client (imported as @g/prisma/client via tsconfig alias)
COPY --from=builder --chown=nextjs:nodejs /app/generated              ./generated
# Schema files + migrations (needed for prisma migrate deploy)
COPY --from=builder --chown=nextjs:nodejs /app/prisma                 ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts       ./prisma.config.ts
# Prisma packages: client adapter, CLI, and migration engine
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma   ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma    ./node_modules/prisma
# tsx — used by Prisma CLI to load prisma.config.ts at runtime
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/tsx       ./node_modules/tsx

USER nextjs

EXPOSE 3000

# Run pending migrations, then start the standalone Next.js server
CMD ["sh", "-c", "node ./node_modules/prisma/build/index.js migrate deploy && node server.js"]
