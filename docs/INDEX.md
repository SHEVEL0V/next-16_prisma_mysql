# Documentation Index

Повна документація проекту Kanban Board на Next.js 16.

## 📚 Основні документи

### [README.md](../README.md)
Основна документація проекту з технічним стеком, структурою та інструкціями з налаштування.

## 🔧 Технічна документація

### [API.md](./API.md)
Повний API Reference всіх сервісів, запитів та дій.

**Включає:**
- Board Service API
- Column Service API
- Task Service API
- User Service API
- Auth Service API
- Server Actions (14+ функцій)
- Server Queries (3 функції)
- Error Handling

### [ARCHITECTURE.md](./ARCHITECTURE.md)
Архітектурні рішення та дизайн паттерни.

**Включає:**
- Project Architecture (Feature-Based Modular)
- Design Patterns:
  - Service Layer Pattern
  - Safe Action Pattern
  - Safe Query Pattern
  - Memoization Pattern
  - Discriminated Union Types
  - Transaction Pattern
- Data Flow Diagrams
- Authentication Architecture
- Performance Optimizations
- Error Handling Strategy
- Best Practices

### [COMPONENTS.md](./COMPONENTS.md)
Карта всіх UI компонентів та їх використання.

**Включає:**
- Layout Components (Header, Footer, MuiThemeProvider)
- UI Components (30+ компонентів):
  - UserButton, MoreButton, AddButton, SubmitButton
  - CustomModal, CustomDialog, CenteredMessage
  - FormInput, EditableTextField, EditableTypography
- Board Components (Drag-Drop, Column, Task)
- Auth Components (Forms)
- User Profile Components
- Performance Considerations

### [DEVELOPMENT.md](./DEVELOPMENT.md)
Керівництво для розробників.

**Включає:**
- Getting Started (Setup & Installation)
- Project Structure & Naming Conventions
- Code Standards:
  - TypeScript Best Practices
  - Comment Guidelines
  - Import Formatting
- Creating New Features (8-step guide)
- Common Workflows
- Debugging Tips
- Testing Procedures
- Deployment Guide
- Useful Commands

---

## 🗂️ Структура проекту

```
src/
├── app/                    # Next.js App Router
├── components/             # UI компоненти
│   ├── layout/            # Layout компоненти
│   └── ui/                # Переиспользуемі UI компоненти
├── features/              # Feature модулі
│   ├── board/             # Дошка завдань
│   │   ├── services/      # Database операції
│   │   ├── components/    # Feature компоненти
│   │   ├── actions.ts     # Server actions
│   │   ├── queries.ts     # Server queries
│   │   ├── schema.ts      # Zod валідація
│   │   └── types.ts       # TypeScript типи
│   ├── auth/              # Автентифікація
│   └── user/              # Профіль користувача
├── lib/                   # Core бібліотеки
├── utils/                 # Утіліти
├── theme/                 # MUI тема
└── types/                 # Глобальні типи

prisma/
├── schema.prisma          # Основна схема
├── auth.prisma            # Auth моделі
├── board.prisma           # Board моделі
└── migrations/            # Історія змін
```

---

## 🔐 Безпека

**Впроваджені заходи безпеки:**

- ✅ **Bcrypt Password Hashing** (10 rounds)
- ✅ **JWT Session Encryption** (HS256 + AES-256-GCM)
- ✅ **HTTP-only Cookies** (SameSite=Lax)
- ✅ **Timing-Safe Comparison** (prevents user enumeration)
- ✅ **Input Validation** (Zod schemas)
- ✅ **CSRF Protection** (SameSite cookies)
- ✅ **No Dev Secrets in Logs** (production mode)

Дивіться [ARCHITECTURE.md - Authentication Architecture](./ARCHITECTURE.md#authentication-architecture)

---

## ⚡ Оптимізація продуктивності

**Впроваджені оптимізації:**

- 30-40% менше re-renders (React.memo)
- 5-10% поліпшення в production (dev-only logging)
- Atomic queries (React cache)
- Optimized Prisma queries (include/select)
- Lazy loading на server actions

Дивіться [ARCHITECTURE.md - Performance Optimizations](./ARCHITECTURE.md#performance-optimizations)

---

## 📡 API Summary

### Основні Server Actions

| Дія | Файл | Назва |
|-----|------|-------|
| **Board** | `board/actions.ts` | `createBoardAction`, `updateBoardAction`, `deleteBoardAction` |
| **Column** | `board/actions.ts` | `createColumnAction`, `updateColumnAction`, `deleteColumnAction` |
| **Task** | `board/actions.ts` | `createTaskAction`, `updateTaskAction`, `deleteTaskAction` |
| **Reorder** | `board/actions.ts` | `reorderAction` |
| **Auth** | `auth/actions.ts` | `loginAction`, `registerAction`, `logoutAction` |
| **Profile** | `user/actions.ts` | `updateProfileAction` |

### Основні Queries

| Запит | Файл | Назва |
|-------|------|-------|
| Boards | `board/queries.ts` | `getBoards()` |
| Board | `board/queries.ts` | `getBoardById(id)` |
| Tasks | `board/queries.ts` | `getTasksAll()` |

Повна документація: [API.md](./API.md)

---

## 🎯 Дизайн паттерни

### 1. Service Layer
Ізольовані операції БД від бізнес-логіки

### 2. Safe Action Wrapper
Автоматична валідація, обробка помилок, cache revalidation

### 3. Safe Query Wrapper
Стандартизована обробка помилок для запитів

### 4. Memoization
React.memo для компонентів з частими оновленнями

### 5. Discriminated Unions
Типобезпечна обробка помилок на клієнті

### 6. Transactions
Атомарні операції для multi-step дій

Дивіться [ARCHITECTURE.md - Design Patterns](./ARCHITECTURE.md#design-patterns)

---

## 🚀 Quick Start

### 1. Встановлення
```bash
git clone https://github.com/SHEVEL0V/next-16_prisma_mysql.git
cd next-16_prisma_mysql
npm install
```

### 2. Налаштування
```bash
cp .env.example .env.local
# Відредагуйте .env.local з вашими налаштуваннями
```

### 3. База даних
```bash
npx prisma db push
npx prisma generate
```

### 4. Запуск
```bash
npm run dev
```

Детальні інструкції: [DEVELOPMENT.md - Getting Started](./DEVELOPMENT.md#getting-started)

---

## 📖 Як користуватися документацією

### Для розробників
1. Почніть з [DEVELOPMENT.md](./DEVELOPMENT.md)
2. Переглядайте [ARCHITECTURE.md](./ARCHITECTURE.md) для розуміння паттернів
3. Використовуйте [COMPONENTS.md](./COMPONENTS.md) для UI компонентів
4. Посилайтеся на [API.md](./API.md) при розробці

### Для архітектури
1. Прочитайте [ARCHITECTURE.md](./ARCHITECTURE.md) для огляду
2. Дивіться Data Flow діаграми
3. Вивчайте Design Patterns

### Для API-дозвілу
1. Відкрийте [API.md](./API.md)
2. Знайдіть потрібний сервіс або дію
3. Дивіться параметри та повертання

---

## 📝 Коментування коду

Весь код задокументований з JSDoc коментарями:

```typescript
/**
 * Brief description of function
 * More detailed explanation if needed
 * 
 * @param name - Parameter description
 * @returns Return value description
 * @throws Error conditions
 * @example Usage example
 */
export async function myFunction(name: string): Promise<Result> {
  ...
}
```

**Стандарти:**
- Коментарі англійською мовою
- JSDoc для публічних функцій
- Коментарі для складної логіки
- Без очевидних коментарів

---

## 🔗 Корисні посилання

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Material-UI Documentation](https://mui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)

---

## 📞 Контакти

**Repository**: [SHEVEL0V/next-16_prisma_mysql](https://github.com/SHEVEL0V/next-16_prisma_mysql)

**Автор**: SHEVEL0V

**Ліцензія**: Private

---

**Останнє оновлення**: 2026-04-27  
**Версія**: 0.1.1
