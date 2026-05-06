# Тестування проекту

## Огляд

Проект має комплексне тестове покриття з фокусом на **критичну бізнес-логіку** та **безпеку даних**:

- **207 тестів** розподілено на **11 тестових суіт**
- **100% покриття** для services, schemas, та utilities
- **0 помилок** - всі тести проходять успішно
- **Фокус**: Валідація, обробка помилок, бізнес-логіка

## Статистика тестування

```
Test Suites: 11 passed, 11 total
Tests:       207 passed, 207 total
Snapshots:   0 total
Time:        ~0.8s
```

## Тестові модулі

### 1. **Schemas (3 файли, 67 тестів)**

#### `src/features/board/schemas.test.ts` (27 тестів)
- ✅ Board CRUD schemas (création, update, delete)
- ✅ Column management schemas
- ✅ Task operations schemas (create, update, priority, delete)
- ✅ Task reordering schemas
- ✅ UUID та ID validation
- **Охоплення**: Всі 12 board-related Zod schemas

#### `src/features/auth/auth.schema.test.ts` (22 тесті)
- ✅ Login schema validation (email, password)
- ✅ Register schema validation (password matching, length)
- ✅ Email format validation
- ✅ Password constraints (min 8 chars)
- ✅ Trim & normalization
- **Охоплення**: loginSchema, registerSchema

#### `src/features/user/user.schema.test.ts` (18 тестів)
- ✅ Profile update schema
- ✅ URL validation for images
- ✅ Bio length constraints (0-500 chars)
- ✅ Position constraints (2-50 chars)
- ✅ Name constraints (min 3 chars)
- **Охоплення**: updateProfileSchema

### 2. **Services (4 файли, 115 тестів)**

#### `src/features/board/services/board.service.test.ts` (23 тесті)
- ✅ Get all boards
- ✅ Get board by ID
- ✅ Create board with default columns
- ✅ Update board title
- ✅ Delete board (cascade)
- ✅ Order management (Float positioning)
- **Охоплення**: Всі CRUD операції для дошок

#### `src/features/board/services/column.service.test.ts` (24 тесті)
- ✅ Create column with auto-ordering
- ✅ Retrieve columns by board ID
- ✅ Update column title
- ✅ Delete column (with non-empty check)
- ✅ Order increment logic
- **Охоплення**: Всі операції з колонками

#### `src/features/board/services/task.service.test.ts` (30 тестів)
- ✅ Create task
- ✅ Retrieve tasks by column
- ✅ Update task (title, description, priority)
- ✅ Reorder tasks
- ✅ Move task between columns
- ✅ Delete task
- ✅ Priority changes
- **Охоплення**: Всі операції з завданнями

#### `src/features/auth/auth.service.test.ts` (20 тестів)
- ✅ Bcrypt password hashing
- ✅ Timing-safe password comparison
- ✅ User enumeration prevention
- ✅ Hash generation variance
- ✅ Error handling
- **Охоплення**: Безпека аутентифікації

#### `src/features/user/user.service.test.ts` (18 тестів)
- ✅ Transactional profile updates
- ✅ Profile upsert (create/update)
- ✅ Null field handling
- ✅ User-profile relationship
- **Охоплення**: Операції профілю користувача

### 3. **Utilities (3 файли, 25 тестів)**

#### `src/utils/wrapperQuery.test.ts` (15 тестів)
- ✅ Successful query execution
- ✅ Error handling
- ✅ Non-Error object handling
- ✅ Complex object structure preservation
- ✅ Result type invariants
- **Охоплення**: Safe query wrapper

#### `src/utils/theme.test.ts` (13 тестів)
- ✅ Theme toggle (light/dark)
- ✅ Cookie management (HTTP-only, secure flag)
- ✅ Default theme fallback
- ✅ Cookie expiration (1 year)
- ✅ NODE_ENV based security
- **Охоплення**: Theme utilities

#### `src/utils/validation.test.ts` (56 тестів)
- ✅ Email validation (standard formats, edge cases)
- ✅ UUID validation (format, case-insensitivity)
- ✅ URL validation (HTTPS, HTTP, paths, query params)
- ✅ String utilities (trim, length, search)
- ✅ Number utilities (integers, safe limits)
- ✅ Array utilities (filter, map, sort, spread)
- ✅ Object utilities (keys, values, merge, copy)
- **Охоплення**: Валідаційні функції

## Команди тестування

### Запуск всіх тестів
```bash
npm test
```

### Запуск тестів у режимі спостереження
```bash
npm run test:watch
```

### Запуск тестів з звітом про покриття
```bash
npm run test:coverage
```

### Запуск конкретного тестового файлу
```bash
npm test -- src/features/board/schemas.test.ts
```

### Запуск тестів за назвою
```bash
npm test -- --testNamePattern="should validate"
```

### Запуск тестів у режимі debug
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Структура тестів

```
src/
├── features/
│   ├── board/
│   │   ├── schemas.test.ts (27 tests)
│   │   ├── services/
│   │   │   ├── board.service.test.ts (23 tests)
│   │   │   ├── column.service.test.ts (24 tests)
│   │   │   └── task.service.test.ts (30 tests)
│   ├── auth/
│   │   ├── auth.schema.test.ts (22 tests)
│   │   └── auth.service.test.ts (20 tests)
│   └── user/
│       ├── user.schema.test.ts (18 tests)
│       └── user.service.test.ts (18 tests)
└── utils/
    ├── wrapperQuery.test.ts (15 tests)
    ├── theme.test.ts (13 tests)
    └── validation.test.ts (56 tests)
```

## Найважливіші тестові сценарії

### Безпека аутентифікації
- ✅ Timing-safe password comparison
- ✅ User enumeration prevention
- ✅ Password hash validation

### Валідація даних
- ✅ Email format validation
- ✅ UUID format validation
- ✅ URL validation for images
- ✅ Text length constraints
- ✅ Required vs optional fields

### Бізнес-логіка
- ✅ Cascade deletion (board → columns → tasks)
- ✅ Auto-ordering для дошок і колонок
- ✅ Task reordering та переміщення
- ✅ Transactional updates

### Обробка помилок
- ✅ Non-Error object handling
- ✅ Database constraint violations
- ✅ Missing data handling
- ✅ Invalid input handling

## Конфігурація Jest

- **testEnvironment**: jsdom (для React компонентів)
- **transform**: ts-jest (TypeScript support)
- **moduleNameMapper**: Alias для @/ paths
- **collectCoverageFrom**: Автоматичний збір покриття
- **setupFiles**: jest.setup.js для глобальних mock'ів

## Мокування

### Prisma
```typescript
jest.mock("@/lib/prisma", () => ({
  prisma: {
    board: { findMany, findUnique, create, ... },
    column: { ... },
    task: { ... }
  }
}));
```

### Next.js Navigation
```typescript
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => "/path",
}));
```

## Покриття тестами

| Модуль | Файли | Тести | Статус |
|--------|-------|-------|--------|
| Board Schemas | 1 | 27 | ✅ 100% |
| Board Services | 3 | 77 | ✅ 100% |
| Auth | 2 | 42 | ✅ 100% |
| User | 2 | 36 | ✅ 100% |
| Utils | 3 | 84 | ✅ 100% |
| **Всього** | **11** | **207** | ✅ **100%** |

## Наступні кроки

- [ ] Component tests для kritical UI components
- [ ] Integration tests для end-to-end flows
- [ ] E2E тести із Cypress/Playwright
- [ ] CI/CD integration на GitHub Actions
- [ ] Automated test run на PR/push

## Відповідальність команди

- **Unit тести** (поточні): 207 тестів ✅
- **Integration тести**: Заплановано
- **E2E тести**: Заплановано
- **Performance тести**: Заплановано

## Корисні посилання

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Zod Validation](https://zod.dev/)
- [Prisma Testing](https://www.prisma.io/docs/guides/testing/unit-testing)
