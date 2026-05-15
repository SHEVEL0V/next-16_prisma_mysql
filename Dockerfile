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

# Generate Prisma client → ./generated/prisma (path set in schema.prisma)
RUN npx prisma generate

# Build Next.js
RUN npm run build

###############################################################################
# Stage 3 — Production runner
###############################################################################
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Security: run as non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/.next            ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json     ./package.json

# Full node_modules — guarantees all Prisma CLI transitive deps are present
# (e.g. `effect` required by @prisma/config)
COPY --from=builder --chown=nextjs:nodejs /app/node_modules     ./node_modules

# Prisma generated client (engine binaries live here in Prisma 7)
COPY --from=builder --chown=nextjs:nodejs /app/generated        ./generated

# Prisma schema + migrations (needed for prisma migrate deploy)
COPY --from=builder --chown=nextjs:nodejs /app/prisma           ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000

# Run pending migrations, then start Next.js production server
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
