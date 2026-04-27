# API Reference

## Table of Contents

1. [Board Service](#board-service)
2. [Column Service](#column-service)
3. [Task Service](#task-service)
4. [User Service](#user-service)
5. [Auth Service](#auth-service)
6. [Server Actions](#server-actions)
7. [Server Queries](#server-queries)

---

## Board Service

**File**: `src/features/board/services/board.ts`

Manages all board-related database operations including creation, retrieval, updates, and deletion.

### Methods

#### `boardService.get()`

Get all boards for the current user, ordered by creation date (newest first).

```typescript
const boards = await boardService.get();
```

**Returns**: `Promise<Board[]>`

**Description**: Retrieves all boards without nested data. Results are ordered by creation date in descending order.

---

#### `boardService.getById(id)`

Get a single board with all its columns and tasks.

```typescript
const board = await boardService.getById(boardId);
```

**Parameters**:
- `id` (string, UUID): Board identifier

**Returns**: `Promise<Board | null>`

**Description**: Maintains order hierarchy and includes task assignees. Returns the complete board structure with all columns and tasks in correct order.

---

#### `boardService.create(data)`

Create a new board with default columns.

```typescript
const newBoard = await boardService.create({
  title: "My New Board",
  userId: "user-id"
});
```

**Parameters**:
- `data` (Prisma.BoardCreateInput): Board creation data including:
  - `title` (string): Board name
  - `userId` (string): Owner user ID

**Returns**: `Promise<Board>`

**Description**: Automatically initializes three default columns: "To Do", "In Progress", "Done" with predefined order values (1000, 2000, 3000).

---

#### `boardService.update(id, data)`

Update board title.

```typescript
const updated = await boardService.update(boardId, { title: "Updated Title" });
```

**Parameters**:
- `id` (string, UUID): Board identifier
- `data` (Prisma.BoardUpdateInput): Update payload with:
  - `title` (string): New board title

**Returns**: `Promise<Board>`

---

#### `boardService.delete(id)`

Delete board and all cascading data (columns, tasks).

```typescript
const deleted = await boardService.delete(boardId);
```

**Parameters**:
- `id` (string, UUID): Board identifier

**Returns**: `Promise<Board>`

**Note**: This operation cascades and deletes all columns and tasks associated with the board.

---

## Column Service

**File**: `src/features/board/services/column.ts`

Handles column operations within boards (create, read, update, delete, reorder).

### Methods

#### `columnService.getById(id)`

Get column by ID.

```typescript
const column = await columnService.getById(columnId);
```

**Parameters**:
- `id` (string, UUID): Column identifier

**Returns**: `Promise<Column | null>`

**Description**: Returns column data without tasks.

---

#### `columnService.create(boardId, title)`

Create new column with automatic ordering.

```typescript
const newColumn = await columnService.create(boardId, "New Column");
```

**Parameters**:
- `boardId` (string, UUID): Parent board identifier
- `title` (string): Column title

**Returns**: `Promise<Column>`

**Description**: Assigns order value 1000 units higher than the last column. Uses transaction to ensure consistency.

---

#### `columnService.update(id, data)`

Update column title or order.

```typescript
await columnService.update(columnId, { 
  title: "New Title",
  order: 2000 
});
```

**Parameters**:
- `id` (string, UUID): Column identifier
- `data` (object): Update payload containing:
  - `title?` (string): Optional new title
  - `order?` (number): Optional new order value

**Returns**: `Promise<Column>`

---

#### `columnService.delete(id)`

Delete column with validation.

```typescript
await columnService.delete(columnId);
```

**Parameters**:
- `id` (string, UUID): Column identifier

**Returns**: `Promise<Column>`

**Throws**: Error if column contains tasks

**Description**: Prevents deletion if column contains tasks. Validates count before deletion in a transaction.

---

## Task Service

**File**: `src/features/board/services/task.ts`

Manages task CRUD operations, ordering, and relationships with columns.

### Methods

#### `taskService.getById(id)`

Get task by ID.

```typescript
const task = await taskService.getById(taskId);
```

**Parameters**:
- `id` (string, UUID): Task identifier

**Returns**: `Promise<Task | null>`

---

#### `taskService.create(columnId, title)`

Create new task in column with automatic ordering.

```typescript
const newTask = await taskService.create(columnId, "New Task");
```

**Parameters**:
- `columnId` (string, UUID): Target column identifier
- `title` (string): Task title

**Returns**: `Promise<Task>`

**Description**: Automatically calculates order value based on the last task in the column (1000 units increment).

---

#### `taskService.update(taskId, data)`

Update task properties.

```typescript
await taskService.update(taskId, {
  title: "Updated Task",
  priority: "HIGH",
  description: "Task description"
});
```

**Parameters**:
- `taskId` (string, UUID): Task identifier
- `data` (Partial<Prisma.TaskUpdateInput>): Update payload

**Returns**: `Promise<Task>`

---

#### `taskService.delete(id)`

Delete task by ID.

```typescript
await taskService.delete(taskId);
```

**Parameters**:
- `id` (string, UUID): Task identifier

**Returns**: `Promise<Task>`

---

#### `taskService.reorder(id, order, columnId)`

Reorder task to different position/column.

```typescript
await taskService.reorder(taskId, 2500, targetColumnId);
```

**Parameters**:
- `id` (string, UUID): Task identifier
- `order` (number): New order value
- `columnId` (string, UUID): Target column identifier

**Returns**: `Promise<Task>`

**Description**: Updates both order and columnId for drag-and-drop operations.

---

#### `taskService.getAllInfo()`

Get all tasks with full relationship data.

```typescript
const allTasks = await taskService.getAllInfo();
```

**Returns**: `Promise<Task[]>`

---

## User Service

**File**: `src/features/user/services.ts`

Handles user profile updates and related operations.

### Methods

#### `userService.updateProfile(userId, data)`

Update user profile information.

```typescript
const profile = await userService.updateProfile(userId, {
  name: "John Doe",
  position: "Project Manager",
  bio: "Experienced PM",
  image: "https://example.com/avatar.jpg"
});
```

**Parameters**:
- `userId` (string, UUID): User identifier
- `data` (object): Profile update data

**Returns**: `Promise<Profile>`

---

## Auth Service

**File**: `src/features/auth/services.ts`

Handles user authentication (login, registration) and password hashing.

### Methods

#### `authService.login(data)`

Login user with email and password.

```typescript
const user = await authService.login({
  email: "user@example.com",
  password: "password123"
});
```

**Parameters**:
- `data` (object): Login credentials

**Returns**: `Promise<User>` (without password field)

**Throws**: Error if credentials are invalid

---

#### `authService.register(data)`

Register new user with email and password.

```typescript
const user = await authService.register({
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
});
```

**Parameters**:
- `data` (object): Registration data

**Returns**: `Promise<User>` (without password field)

**Throws**: Error if email already exists

---

## Server Actions

Server actions are form-based mutations using the `createSafeAction` wrapper with automatic validation and error handling.

**File**: `src/features/board/actions.ts`

### Board Actions

- `createBoardAction(formData)` - Create new board
- `updateBoardAction(formData)` - Update board title
- `deleteBoardAction(formData)` - Delete board
- `createColumnAction(formData)` - Create column
- `updateColumnAction(formData)` - Update column title
- `deleteColumnAction(formData)` - Delete column
- `createTaskAction(formData)` - Create task
- `updateTaskAction(formData)` - Update task title
- `updateTaskDetailsAction(formData)` - Update task details and description
- `updateTaskPriorityAction(formData)` - Update task priority
- `deleteTaskAction(formData)` - Delete task
- `reorderAction(formData)` - Reorder items via drag-and-drop

---

## Server Queries

**File**: `src/features/board/queries.ts`

Server-side data fetching with React caching.

- `getBoards()` - Fetch all user boards
- `getBoardById(id)` - Fetch single board with columns and tasks
- `getTasksAll()` - Fetch all tasks with relationships

---

## Error Handling

### Success Response
```typescript
{
  success: true,
  data: { /* result */ },
  message: "Operation successful"
}
```

### Failure Response
```typescript
{
  success: false,
  message: "Error description",
  errors: { fieldName: ["Error message"] }
}
```
