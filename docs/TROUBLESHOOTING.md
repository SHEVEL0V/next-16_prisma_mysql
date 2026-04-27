# Troubleshooting Guide

## Database Issues

### Cannot connect to database

**Error**: `Error: Cannot connect to database`

**Solutions**:
1. Check DATABASE_URL in .env.local
   ```bash
   echo $DATABASE_URL
   ```

2. Verify MySQL/MariaDB service is running
   ```bash
   # macOS
   brew services list | grep mysql
   
   # Linux
   sudo systemctl status mysql
   ```

3. Test connection with Prisma Studio
   ```bash
   npx prisma studio
   ```

4. Check credentials in DATABASE_URL
   - Format: `mysql://user:password@localhost:3306/database`
   - Test with direct connection: `mysql -h localhost -u user -p`

### Prisma Migration Error

**Error**: `Error: P3005 - Database already exists`

**Solution**:
```bash
# Mark migration as rolled back
npx prisma migrate resolve --rolled-back init

# Deploy migrations
npx prisma migrate deploy
```

### P2002 - Unique constraint failed

**Error**: `Error: Unique constraint failed on the fields: (email)`

**Cause**: Duplicate email when registering or updating user

**Solution**:
1. Check if email already exists in database
   ```bash
   npx prisma studio
   # Search User table for email
   ```

2. Use different email or delete duplicate record
3. System automatically returns user-friendly error

---

## Authentication Issues

### JWT Token Invalid

**Error**: `Error: Session verification failed`

**Solutions**:
1. Verify AUTH_SECRET is consistent
   - Should be minimum 32 characters
   - Must be same across all servers

2. Check JWT_EXPIRATION_DAYS setting
   - Default: 7 days
   - Verify in .env.local

3. Clear browser cookies and re-authenticate
   ```javascript
   // In browser console
   document.cookie.split(";").forEach(c => {
     document.cookie = c.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
   });
   ```

4. Generate new secrets if tokens are corrupted
   ```bash
   openssl rand -base64 32
   ```

### Permission Denied - Profile Update

**Error**: `Error: User does not have permission`

**Solutions**:
1. Verify user is authenticated
2. Check userId in request matches session
3. Ensure session token is valid (not expired)
4. Login again if token is old

### Cannot Login

**Error**: `Error: Invalid email or password`

**Causes**:
1. User doesn't exist (typo in email)
2. Wrong password
3. Account not created

**Solution**: Register new account if needed

---

## TypeScript Issues

### Cannot find module

**Error**: `error TS2304: Cannot find name 'x'`

**Solutions**:
```bash
# Reinstall types
npm install

# Regenerate Prisma client
npx prisma generate

# Check all TypeScript errors
npx tsc --noEmit
```

### Property does not exist

**Error**: `error TS2339: Property 'xyz' does not exist`

**Solutions**:
1. Check spelling and case sensitivity
2. Verify type definition is imported
3. Check Prisma types were generated
   ```bash
   npx prisma generate
   ```

### Type is not assignable

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solutions**:
1. Check that types match exactly
2. Use `as` type casting only when necessary
3. Verify interface matches data structure
4. Check if optional fields are handled

---

## Performance Issues

### Slow Database Queries

**Symptoms**: Page loads slowly, actions take long

**Solutions**:
1. Check Prisma query efficiency
   ```typescript
   // ❌ Bad - N+1 queries
   const boards = await prisma.board.findMany();
   for (const board of boards) {
     const columns = await prisma.column.findMany({ where: { boardId: board.id } });
   }
   
   // ✅ Good - Single query
   const boards = await prisma.board.findMany({
     include: { columns: true }
   });
   ```

2. Use Prisma Studio to analyze queries
   ```bash
   npx prisma studio
   ```

3. Check database connection pool
   - Verify connectionLimit in Prisma configuration
   - Default: 5 connections

### High Memory Usage

**Symptoms**: Process memory keeps growing

**Solutions**:
1. Check for memory leaks in Prisma client
   ```typescript
   // Ensure Prisma client is singleton
   // See src/lib/prisma.ts
   ```

2. Verify no circular dependencies
3. Check for retained event listeners
4. Monitor with node --inspect flag

---

## Build Issues

### Build Fails

**Error**: `error during build`

**Solutions**:
1. Clean and rebuild
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. Check for TypeScript errors
   ```bash
   npx tsc --noEmit
   ```

3. Verify environment variables
   - All required vars must be set
   - Check .env.local or .env.production

4. Check ESLint errors
   ```bash
   npm run lint
   ```

### Cannot find next/image

**Error**: `error: Cannot find module 'next/image'`

**Solution**:
```bash
npm install next@latest
```

---

## Runtime Issues

### Port 3000 already in use

**Error**: `Error: listen EADDRINUSE :::3000`

**Solutions**:
```bash
# Use different port
npm run dev -- -p 3001

# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

### Module not found at runtime

**Error**: `Error: Cannot find module 'x'`

**Solutions**:
```bash
# Rebuild with clean cache
rm -rf .next
npm run build

# Regenerate Prisma types
npx prisma generate
```

### Hydration mismatch

**Error**: `Hydration failed because the server rendered HTML was not an exact match`

**Causes**:
1. Date/time differences between server and client
2. Browser-specific rendering
3. Random data without seed

**Solutions**:
```typescript
// ❌ Bad - Random on each render
<div>{Math.random()}</div>

// ✅ Good - Use useEffect for client-only data
useEffect(() => {
  setData(Math.random());
}, []);

// ✅ Good - Don't render dates without formatting
const formatted = new Date(date).toLocaleDateString();
```

---

## Development Server Issues

### Fast Refresh Not Working

**Error**: Page doesn't hot-reload on file change

**Solutions**:
1. Check file is in src/ directory
2. Restart dev server
   ```bash
   npm run dev
   ```

3. Verify file has proper exports
4. Check for console errors

### TypeScript Errors After Install

**Error**: `TypeScript compilation failed`

**Solutions**:
```bash
# Regenerate Prisma client
npx prisma generate

# Rebuild
npm run build

# Check for missing dependencies
npm install
```

---

## Git Issues

### Merge Conflicts in Prisma Schema

**Error**: Conflicting changes in schema.prisma

**Solutions**:
1. Resolve conflicts manually
2. Run prisma validate
   ```bash
   npx prisma validate
   ```

3. Create new migration if needed
   ```bash
   npx prisma migrate dev --name resolve_conflict
   ```

### Large File Size

**Error**: Repository getting too large

**Solutions**:
1. Don't commit node_modules
   ```bash
   echo "node_modules/" >> .gitignore
   git rm --cached -r node_modules/
   ```

2. Don't commit .next
   ```bash
   echo ".next/" >> .gitignore
   ```

---

## Useful Debug Commands

### Check Environment

```bash
# Show all environment variables
printenv | grep -E "^(DATABASE|AUTH|JWT|NODE)"

# Test database connection
npx prisma db execute --stdin < /dev/null
```

### View Database

```bash
# Open Prisma Studio
npx prisma studio

# View logs
npx prisma generate --telemetry off
```

### TypeScript Debug

```bash
# Show all TypeScript errors
npx tsc --noEmit --pretty false

# Debug specific file
npx tsc --noEmit src/features/board/actions.ts
```

### ESLint Debug

```bash
# Show all linting errors
npm run lint

# Fix auto-fixable errors
npm run lint -- --fix

# Debug specific file
npm run lint -- src/features/board/actions.ts
```

### Database Debug

```bash
# Show all migrations
npx prisma migrate status

# Create seed data
npx prisma db seed

# Reset to initial state (dev only)
npx prisma migrate reset
```

---

## Common Best Practices to Avoid Issues

### 1. Always validate input
```typescript
// ✅ Good
export const action = createSafeAction(schema, handler);
```

### 2. Use transactions for multi-step operations
```typescript
// ✅ Good
return await prisma.$transaction(async (tx) => {
  // Multiple operations
});
```

### 3. Type everything
```typescript
// ✅ Good
function update(id: string, data: UpdateData): Promise<Result> {}
```

### 4. Handle all error cases
```typescript
// ✅ Good
if (dbError.code === "P2002") {
  return { success: false, message: "Already exists" };
}
```

### 5. Test before deploying
```bash
npx tsc --noEmit    # TypeScript
npm run lint        # ESLint
npm run build       # Production build
```

---

## Getting Help

1. **Check existing issues**: [GitHub Issues](https://github.com/SHEVEL0V/next-16_prisma_mysql/issues)
2. **Search docs**: Use browser search in this file
3. **Check logs**: `npm run dev` shows detailed error messages
4. **Enable debug mode**: `DEBUG=* npm run dev`

---

**Last updated**: 2026-04-27
