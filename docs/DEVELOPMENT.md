# Development Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Code Standards](#code-standards)
4. [Creating New Features](#creating-new-features)
5. [Common Workflows](#common-workflows)
6. [Debugging](#debugging)
7. [Testing](#testing)
8. [Deployment](#deployment)

---

## Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended 20+)
- **npm**: 9+ or yarn
- **Database**: MySQL 8+ or MariaDB 10.5+
- **Git**: For version control

### Initial Setup

1. **Clone and install**
```bash
git clone https://github.com/SHEVEL0V/next-16_prisma_mysql.git
cd next-16_prisma_mysql
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. **Setup database**
```bash
npx prisma db push
npx prisma generate
```

4. **Verify setup**
```bash
npx tsc --noEmit  # Check TypeScript
npm run lint       # Check ESLint
npm run dev        # Start dev server
```

### Development Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

Features:
- Hot Module Reload (HMR)
- TypeScript checking
- Fast refresh
- Dev-only logging

---

## Project Structure

### Directory Layout

```
src/
├── app/                         # Next.js App Router
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── signin/page.tsx         # Login page
│   ├── signup/page.tsx         # Register page
│   └── user/[id]/              # User dashboard routes
│       ├── board/page.tsx      # Board view
│       ├── menu/page.tsx       # Menu page
│       ├── task/page.tsx       # Task details
│       └── profile/page.tsx    # Profile page
│
├── components/
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MuiThemeProvider.tsx
│   └── ui/                     # Reusable UI components
│       ├── buttons/
│       ├── fields/
│       ├── editor/
│       └── *.tsx               # UI component files
│
├── features/                   # Feature modules
│   ├── board/
│   │   ├── services/
│   │   │   ├── board.ts
│   │   │   ├── column.ts
│   │   │   └── task.ts
│   │   ├── components/
│   │   │   ├── column/
│   │   │   └── sidebar/
│   │   ├── actions.ts          # Server actions
│   │   ├── queries.ts          # Server queries
│   │   ├── schema.ts           # Validation schemas
│   │   └── types.ts            # TypeScript types
│   ├── auth/
│   │   ├── services.ts
│   │   ├── schema.ts
│   │   ├── actions.ts
│   │   └── components/
│   └── user/
│       ├── services.ts
│       ├── schema.ts
│       ├── actions.ts
│       └── components/
│
├── lib/
│   └── prisma.ts               # Prisma client singleton
│
├── utils/
│   ├── wrapperAction.ts        # Safe action wrapper
│   ├── wrapperQuery.ts         # Safe query wrapper
│   ├── session.ts              # JWT session management
│   ├── getUser.ts              # Get current user
│   └── theme.ts                # Theme utilities
│
├── theme/
│   ├── index.ts                # Theme export
│   └── constants.ts            # Theme colors/constants
│
└── types/
    └── index.ts                # Global type definitions

prisma/
├── schema.prisma               # Main schema
├── auth.prisma                 # Auth models
├── board.prisma                # Board models
└── migrations/                 # Migration history
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Files | kebab-case | `user-button.tsx` |
| Directories | kebab-case | `auth-components/` |
| Components | PascalCase | `UserButton`, `TaskCard` |
| Functions | camelCase | `getUserInfo()`, `handleClick()` |
| Types | PascalCase | `UserType`, `BoardData` |
| Constants | UPPER_SNAKE_CASE | `SALT_ROUNDS`, `MAX_LENGTH` |
| Interfaces | PascalCase (I prefix optional) | `User`, `IBoard` |

---

## Code Standards

### TypeScript

**Always define return types:**
```typescript
// ❌ Bad
function getUser(id) { ... }

// ✅ Good
function getUser(id: string): Promise<User> { ... }
```

**Use Partial<T> for optional fields:**
```typescript
// ❌ Bad
function update(id: string, data: any) { ... }

// ✅ Good
function update(id: string, data: Partial<User>) { ... }
```

**Never use `any` type:**
```typescript
// ❌ Bad
const data: any = response;

// ✅ Good
const data: Board = response;
```

**Extract array element types:**
```typescript
// ❌ Bad
type TaskList = Task[];
const task = tasks[0] as Task;

// ✅ Good
type Task = Board["columns"][number]["tasks"][number];
const task = tasks[0]; // Type is inferred
```

### Comments

**Add comments for complex logic only:**
```typescript
// ✅ Good - explains why
// Use timing-safe comparison with fake hash to prevent user enumeration
const isPasswordValid = user
  ? await bcrypt.compare(data.password, user.password)
  : await bcrypt.compare(data.password, "fake_hash");

// ❌ Bad - obvious what code does
// Increment counter
count++;
```

**Use JSDoc for functions:**
```typescript
/**
 * Get board by ID with all columns and tasks
 * @param id - Board UUID
 * @returns Board with nested columns and tasks
 * @throws Error if board not found
 */
export async function getBoardById(id: string): Promise<Board> {
  ...
}
```

### Imports

**Group imports in order:**
1. Standard library
2. Third-party packages
3. Local imports
4. Relative imports

```typescript
// ✅ Good
import { useState } from "react";

import { Box } from "@mui/material";
import prisma from "@/lib/prisma";

import { boardService } from "./services";
import type { BoardType } from "./types";
```

### Line Length

Soft limit of **100 characters**. Hard limit of **120 characters**.

```typescript
// ✅ Good - broken into readable lines
const result = await prisma.board.findUnique({
  where: { id: boardId },
  include: { columns: { include: { tasks: true } } }
});

// ❌ Bad - single long line
const result = await prisma.board.findUnique({ where: { id: boardId }, include: { columns: { include: { tasks: true } } } });
```

---

## Creating New Features

### Step 1: Create Feature Directory

```bash
mkdir -p src/features/[feature-name]/{services,components,actions}
```

### Step 2: Define Database Models

Add models to `prisma/[feature-name].prisma`:

```prisma
model Feature {
  id String @id @default(uuid())
  title String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Step 3: Create Service Layer

`src/features/[feature-name]/services.ts`:

```typescript
/** @format */

import prisma from "@/lib/prisma";

/**
 * Feature Service
 * Handles all database operations for feature
 */
export const featureService = {
  /**
   * Get all feature items
   * @returns Array of feature items
   */
  getAll: async () => {
    return prisma.feature.findMany({
      orderBy: { createdAt: "desc" }
    });
  },

  /**
   * Get feature by ID
   * @param id - Feature UUID
   * @returns Feature item or null
   */
  getById: async (id: string) => {
    return prisma.feature.findUnique({ where: { id } });
  },

  /**
   * Create new feature item
   * @param data - Feature data
   * @returns Created feature
   */
  create: async (data: { title: string }) => {
    return prisma.feature.create({ data });
  },
};
```

### Step 4: Create Validation Schemas

`src/features/[feature-name]/schema.ts`:

```typescript
/** @format */

import { z } from "zod";

/**
 * Schema for creating feature items
 * Validates required fields and constraints
 */
export const createFeatureSchema = z.object({
  title: z.string().min(1, "Title required").max(100),
  description: z.string().max(500).optional(),
});

export const updateFeatureSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, "Title required").max(100),
});

export const deleteFeatureSchema = z.object({
  id: z.uuid(),
});
```

### Step 5: Create Server Actions

`src/features/[feature-name]/actions.ts`:

```typescript
/** @format */
"use server";

import { createSafeAction } from "@/utils/wrapperAction";
import { featureService } from "./services";
import {
  createFeatureSchema,
  updateFeatureSchema,
  deleteFeatureSchema,
} from "./schema";

/**
 * Creates a new feature item
 * Validates input and handles database operation
 */
export const createFeatureAction = createSafeAction(
  createFeatureSchema,
  async (data) => {
    return await featureService.create(data);
  },
  { revalidatePath: "/features" }
);

/**
 * Updates an existing feature item
 */
export const updateFeatureAction = createSafeAction(
  updateFeatureSchema,
  async ({ id, ...data }) => {
    return await featureService.update(id, data);
  },
  { revalidatePath: "/features" }
);

/**
 * Deletes a feature item
 */
export const deleteFeatureAction = createSafeAction(
  deleteFeatureSchema,
  async ({ id }) => {
    return await featureService.delete(id);
  },
  { revalidatePath: "/features" }
);
```

### Step 6: Create Components

`src/features/[feature-name]/components/FeatureList.tsx`:

```typescript
/** @format */

"use client";

import { memo, useCallback } from "react";
import type { FeatureType } from "../types";

/**
 * Feature list component
 * Displays all feature items
 */
export const FeatureList = memo(({ items }: { items: FeatureType[] }) => {
  return (
    <div>
      {items.map((item) => (
        <FeatureItem key={item.id} item={item} />
      ))}
    </div>
  );
});

FeatureList.displayName = "FeatureList";
```

### Step 7: Create Types

`src/features/[feature-name]/types.ts`:

```typescript
/** @format */

import type { Prisma } from "@g/prisma/client";

/**
 * Feature type with all nested relationships
 */
export type FeatureType = Prisma.FeatureGetPayload<null>;
```

### Step 8: Export from Index

`src/features/[feature-name]/index.ts`:

```typescript
export { featureService } from "./services";
export * from "./actions";
export * from "./types";
export * from "./schema";
```

---

## Common Workflows

### Adding a New Column to Board

1. **Update Prisma Schema**
   ```prisma
   model Board {
     // ... existing fields
     newField String? // Add new field
   }
   ```

2. **Create Migration**
   ```bash
   npx prisma migrate dev --name add_new_field
   ```

3. **Update Service**
   ```typescript
   create: async (data: { title: string; newField?: string }) => {
     return prisma.board.create({ data });
   }
   ```

4. **Update Schema Validation**
   ```typescript
   export const boardSchema = z.object({
     title: z.string(),
     newField: z.string().optional(),
   });
   ```

### Editing a Component

1. **Locate component** in `src/components/` or `src/features/`
2. **Add/modify props** with TypeScript types
3. **Update JSDoc** if props changed
4. **Test changes** in dev mode
5. **Run linter**: `npm run lint`

### Adding Error Handling

```typescript
// ✅ Good - Specific error handling
try {
  const result = await featureService.delete(id);
  return { success: true, data: result };
} catch (error) {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      throw new Error("Feature not found");
    }
  }
  throw error;
}
```

### Performance Optimization

1. **Memoize components** receiving frequently-updated props
   ```typescript
   export const Component = memo(({ prop }) => {...});
   ```

2. **Use useCallback** for event handlers
   ```typescript
   const handleClick = useCallback(() => { ... }, [deps]);
   ```

3. **Optimize queries** with include/select
   ```typescript
   include: { columns: { include: { tasks: true } } }
   ```

4. **Use React caching** for queries
   ```typescript
   export const getBoards = cache(() => safeQuery(boardService.get));
   ```

---

## Debugging

### Dev Server Logging

Development-only logging is automatically included:

```typescript
const isDev = process.env.NODE_ENV === "development";
if (isDev) console.log("Debug info");
```

**Logs include**:
- Action start/success/error
- Validation errors
- Database conflicts
- Cache revalidation
- Redirects

### TypeScript Errors

**Check all errors:**
```bash
npx tsc --noEmit
```

**Common fixes**:
```bash
# Reinstall types
npm install

# Regenerate Prisma client
npx prisma generate

# Clean and rebuild
rm -rf .next
npm run build
```

### Database Issues

**Check Prisma schema:**
```bash
npx prisma validate
```

**View database:**
```bash
npx prisma studio
```

**Reset database** (development only):
```bash
npx prisma migrate reset
```

---

## Testing

### Running Linter

```bash
npm run lint
```

**Fix automatically:**
```bash
npm run lint -- --fix
```

### TypeScript Check

```bash
npx tsc --noEmit
```

### Manual Testing Checklist

- [ ] Create board - verify default columns created
- [ ] Update board - check cache revalidation
- [ ] Delete board - verify cascade delete
- [ ] Drag task - verify order changes
- [ ] Login - check session created
- [ ] Logout - check session cleared
- [ ] Update profile - verify all fields save
- [ ] Test validation - submit invalid data

---

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

Ensure all `.env` variables are set in production:
- DATABASE_URL
- AUTH_SECRET (min 32 chars)
- JWT_SECRET (min 32 chars)
- JWT_EXPIRATION_DAYS
- NODE_ENV=production
- NEXT_PUBLIC_APP_URL

### Performance Optimization

1. **Check bundle size:**
   ```bash
   npm run build
   ```

2. **Remove dev-only code** (automatic in production)

3. **Minify CSS/JS** (automatic with Next.js)

### Database Migration

1. **Test locally**: `npx prisma migrate deploy`
2. **Run on production**: Same command
3. **Verify schema**: `npx prisma validate`

---

## Useful Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |
| `npm run lint` | Check code style |
| `npm run lint -- --fix` | Auto-fix linting issues |
| `npx tsc --noEmit` | Check TypeScript |
| `npx prisma db push` | Sync schema to database |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev --name description` | Create new migration |
| `npx prisma studio` | Open database UI |
| `npx prisma validate` | Validate schema |

---

## Git Workflow

### Commit Messages

```
feat: Add board reordering feature
fix: Correct task priority update bug
docs: Update API documentation
refactor: Simplify service layer
style: Format code with prettier
test: Add unit tests for auth
chore: Update dependencies
```

### Branch Naming

```
feature/user-authentication
bugfix/task-deletion-issue
docs/api-documentation
refactor/service-layer
```

### Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] No console errors/warnings
- [ ] TypeScript checks pass: `npx tsc --noEmit`
- [ ] Linting passes: `npm run lint`
- [ ] Database migrations included (if needed)
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Material-UI Documentation](https://mui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)
