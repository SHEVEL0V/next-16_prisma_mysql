# Структура Prisma схем

Prisma схеми організовані модульно для зручного управління та масштабування проекту.

## 📁 Структура файлів

```
prisma/
├── schema.prisma          # Головна схема (конфіг + include)
├── auth.prisma            # Моделі аутентифікації
├── board.prisma           # Моделі дошки завдань
└── migrations/            # Міграції бази даних
    └── 20260223131847_init/
```

---

## 📄 Файли схем

### `schema.prisma` (Головна схема)
**Відповідальність**: Конфіг генератора, datasource та включення інших схем

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Domain-specific schema files
include "./auth.prisma"
include "./board.prisma"
```

**Переваги**:
- ✅ Чистий та мінімальний
- ✅ Легко бачити інтеграції доменів
- ✅ Централізована конфігурація

---

### `auth.prisma` (Аутентифікація)
**Відповідальність**: Моделі користувачів та профілів

**Моделі**:
- `User` - основні дані користувача
  - `id` - UUID
  - `email` - унікальна адреса
  - `name` - ім'я
  - `password` - хеш пароля
  - `role` - роль (USER, ADMIN)
  - Relations: Profile, Board[], Task[]

- `Profile` - розширена інформація користувача
  - `id` - UUID
  - `image` - URL аватара (опціонально)
  - `position` - посада
  - `bio` - біографія (опціонально)
  - Relations: User

**Enum**:
- `Role` - USER, ADMIN

---

### `board.prisma` (Управління завданнями)
**Відповідальність**: Моделі дошки, колон та завдань

**Моделі**:
- `Board` - проектна дошка
  - `id` - UUID
  - `title` - назва дошки
  - `description` - опис (опціонально)
  - Relations: Column[], User[] (члени)

- `Column` - стан виконання (To Do, In Progress, Done)
  - `id` - UUID
  - `title` - назва колонки
  - `order` - позиція (Float для Drag & Drop)
  - Relations: Board, Task[]

- `Task` - завдання/картка
  - `id` - UUID
  - `title` - назва завдання
  - `description` - опис (Text для великих обсягів)
  - `type` - тип (BUG, FEATURE, TASK, EPIC)
  - `priority` - пріоритет (LOW, MEDIUM, HIGH, URGENT)
  - `order` - позиція в колонці
  - `dueDate` - дата завершення (опціонально)
  - Relations: Column, User[] (виконавці)

**Enum**:
- `TaskType` - BUG, FEATURE, TASK, EPIC
- `Priority` - LOW, MEDIUM, HIGH, URGENT

---

## 🔗 Відносини між моделями

```
User ──────────┐
      │        ├──> Profile (1:1)
      │        │
      ├────────┼──> Board[] (Many-to-Many через "BoardMembers")
      │        │
      └────────┼──> Task[] (Many-to-Many через "TaskAssignees")
               │
         Board ├──> Column[]
               │
            Column ├──> Task[]
                   │
                Task ├──> User[] (assignees)
```

---

## 📊 Генерація типів

```bash
# Генерувати типи Prisma з усіх схем
npm run prisma generate

# Миграція з автоматичним оновленням типів
npm run prisma migrate dev --name "descriptive_name"
```

**Вихідна папка**: `generated/prisma/`

---

## ✅ Best Practices

### 1. **Відділення доменів**
Кожен файл `.prisma` представляє окремий домен:
- `auth.prisma` - все про користувачів
- `board.prisma` - все про управління завданнями

### 2. **Іменування моделей**
- PascalCase для назв моделей: `User`, `Board`, `Task`
- snake_case для полів: `userId`, `dueDate`
- UPPER_CASE для enum: `USER`, `ADMIN`

### 3. **Документація**
- Коментарі для пояснення полів (як у коді)
- Enum документація з `///` комментарями

### 4. **Каскадне видалення**
- `onDelete: Cascade` для залежних моделей
- Column видаляється з Board
- Task видаляється з Column

### 5. **Timestamps**
- Всі моделі повинні мати `createdAt` та `updatedAt`

---

## 🚀 Додавання нової схеми

Якщо потрібна нова область функціональності:

1. **Створити файл**: `prisma/feature.prisma`
2. **Визначити моделі**: Додати моделі та enum
3. **Включити у schema.prisma**:
   ```prisma
   include "./feature.prisma"
   ```
4. **Мігрувати**:
   ```bash
   npm run prisma migrate dev --name "add_feature"
   ```

---

## 📝 Поточні міграції

- `20260223131847_init` - Ініціальна схема з User, Profile, Board, Column, Task

---

## 🔍 Перевірка схем

```bash
# Валідація синтаксису
npm run prisma validate

# Переглянути статус міграцій
npm run prisma migrate status

# Відкрити Prisma Studio для перегляду даних
npm run prisma studio
```

---

## 📚 Посилання

- [Prisma Docs - Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Prisma Docs - Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)
- [Prisma MySQL Provider](https://www.prisma.io/docs/concepts/database-connectors/mysql)
