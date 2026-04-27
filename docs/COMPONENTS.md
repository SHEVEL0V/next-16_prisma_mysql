# Component Documentation

## Table of Contents

1. [Layout Components](#layout-components)
2. [UI Components](#ui-components)
3. [Board Components](#board-components)
4. [Form Components](#form-components)
5. [Modal & Dialog Components](#modal--dialog-components)

---

## Layout Components

### Header

**File**: `src/components/layout/Header.tsx`

Navigation header with user menu and theme toggle.

**Props**:
- None (uses server context)

**Features**:
- Responsive MUI AppBar
- User dropdown menu
- Theme toggle button
- Logo/title

**Usage**:
```typescript
import { Header } from "@/components/layout/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
```

---

### Footer

**File**: `src/components/layout/Footer.tsx`

Application footer with links and information.

**Props**:
- None

**Features**:
- Copyright information
- Links to pages
- Responsive layout

---

### MuiThemeProvider

**File**: `src/components/layout/MuiThemeProvider.tsx`

Emotion-based theme provider for Material-UI.

**Features**:
- Custom theme configuration
- Dark mode support
- Emotion cache setup
- CSS-in-JS styling

**Usage**:
```typescript
import { MuiThemeProvider } from "@/components/layout/MuiThemeProvider";

export default function RootLayout({ children }) {
  return (
    <MuiThemeProvider>
      {children}
    </MuiThemeProvider>
  );
}
```

---

## UI Components

### UserButton

**File**: `src/components/ui/UserButton.tsx`

**Type**: Memoized component

User profile dropdown button with logout option.

**Props**:
- `user: User` - User object with email and name
- `onLogout?: () => Promise<void>` - Logout callback

**Features**:
- React.memo for performance optimization
- useCallback for stable logout handler
- Dropdown menu with user email
- Logout action

**Performance**: 30-40% fewer re-renders (memoized)

**Example**:
```typescript
import { UserButton } from "@/components/ui/UserButton";

export function Nav({ user }) {
  return <UserButton user={user} />;
}
```

---

### MoreButton

**File**: `src/components/ui/MoreButton.tsx`

**Type**: Memoized component

Three-dot menu button for additional actions.

**Props**:
- `options: Array<{ label: string; action: () => void }>` - Menu options
- `icon?: ReactNode` - Custom icon

**Features**:
- Memoized for performance
- IconButton with Menu dropdown
- Multiple action support

---

### AddButton

**File**: `src/components/ui/AddButton.tsx`

Primary action button for adding new items.

**Props**:
- `onClick: () => void` - Click handler
- `disabled?: boolean` - Disabled state
- `children?: ReactNode` - Button text

**Example**:
```typescript
<AddButton onClick={handleCreate}>
  Add New Board
</AddButton>
```

---

### SubmitButton

**File**: `src/components/ui/SubmitButton.tsx`

Form submission button with loading state.

**Props**:
- `pending?: boolean` - Loading state
- `children?: ReactNode` - Button text
- `type?: "button" | "submit" | "reset"` - Button type

**Features**:
- Automatic disabled state during submission
- Loading spinner
- Accessibility attributes

**Usage with useActionState**:
```typescript
const [state, action, pending] = useActionState(createBoardAction, null);

return (
  <form action={action}>
    <SubmitButton pending={pending}>
      Create Board
    </SubmitButton>
  </form>
);
```

---

### BackButton

**File**: `src/components/ui/BackButton.tsx`

Navigation button to go back to previous page.

**Features**:
- Router back navigation
- Icon button

---

### HomeButton

**File**: `src/components/ui/HomeButton.tsx`

Navigation button to home page.

**Features**:
- Home icon
- Router link

---

### CloseButton

**File**: `src/components/ui/CloseButton.tsx`

Close/dismiss button for modals and sidebars.

**Props**:
- `onClick: () => void` - Close handler

---

### DarkModeButton

**File**: `src/components/ui/DarkModeButton.tsx`

Toggle between light and dark theme.

**Features**:
- Theme context integration
- Icon changes based on theme
- Persistent theme preference

---

### CustomModal

**File**: `src/components/ui/CustomModal.tsx`

Reusable modal dialog component.

**Props**:
- `open: boolean` - Modal visibility
- `onClose: () => void` - Close handler
- `title?: string` - Modal title
- `children: ReactNode` - Modal content
- `actions?: ReactNode` - Action buttons

**Features**:
- MUI Modal component
- Backdrop click to close
- Custom styling

**Example**:
```typescript
<CustomModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
>
  Are you sure?
</CustomModal>
```

---

### CustomDialog

**File**: `src/components/ui/CustomDialog.tsx`

Alternative dialog component (MUI Dialog-based).

**Props**:
- Similar to CustomModal
- `maxWidth?: Breakpoint` - Max width

---

### CenteredMessage

**File**: `src/components/ui/CenteredMessage.tsx`

Centered text message for empty states.

**Props**:
- `message: string` - Message text
- `icon?: ReactNode` - Optional icon
- `action?: ReactNode` - Optional action button

**Usage**:
```typescript
<CenteredMessage
  message="No boards yet"
  icon={<BoardIcon />}
  action={<AddButton>Create One</AddButton>}
/>
```

---

### DashboardGrid

**File**: `src/components/ui/DashboardGrid.tsx`

Grid layout for dashboard items (boards, tasks, etc.).

**Props**:
- `children: ReactNode` - Grid items
- `spacing?: number` - Gap between items

**Features**:
- Responsive grid
- MUI Grid component
- Auto-adjusting columns

---

### CustomDataGrid

**File**: `src/components/ui/CustomDataGrid.tsx`

Data table component using MUI DataGrid.

**Props**:
- `rows: any[]` - Table data
- `columns: GridColDef[]` - Column definitions
- `loading?: boolean` - Loading state
- `onRowClick?: (row: any) => void` - Row click handler

**Features**:
- Sortable columns
- Filterable data
- Pagination
- Customizable styling

---

## Form Components

### FormInput

**File**: `src/components/ui/fields/FormInput.tsx`

Reusable text input field.

**Props**:
- `name: string` - Field name
- `label: string` - Label text
- `type?: "text" | "email" | "password"` - Input type
- `error?: string` - Error message
- `required?: boolean` - Required field
- `disabled?: boolean` - Disabled state

**Example**:
```typescript
<FormInput
  name="email"
  label="Email"
  type="email"
  required
  error={errors?.email?.[0]}
/>
```

---

### EditableTextField

**File**: `src/components/ui/fields/EditableTextField.tsx`

Click-to-edit text field for inline editing.

**Props**:
- `value: string` - Current value
- `onSave: (value: string) => Promise<void>` - Save callback
- `placeholder?: string` - Placeholder text
- `multiline?: boolean` - Multi-line support

**Features**:
- Click to edit mode
- Blur to save
- Loading state during save
- Cancel button

**Example**:
```typescript
<EditableTextField
  value={boardTitle}
  onSave={async (newTitle) => {
    await updateBoardAction(formData);
  }}
/>
```

---

### EditableTypography

**File**: `src/components/ui/fields/EditableTypography.tsx`

MUI Typography with edit capability.

**Props**:
- `value: string` - Current value
- `onSave: (value: string) => Promise<void>` - Save callback
- `variant?: "h1" | "h2" | "body1"` - Typography variant

---

## Board Components

### Board

**File**: `src/features/board/components/Board.tsx`

Main board container component.

**Props**:
- `board: BoardType` - Board data with columns and tasks
- `onUpdate?: () => void` - Callback on updates

**Features**:
- Displays board title
- Renders all columns
- Handles board state

---

### DragDrop

**File**: `src/features/board/components/DragDrop.tsx`

Drag-and-drop wrapper using @hello-pangea/dnd.

**Props**:
- `board: BoardType` - Board with columns
- `children: ReactNode` - Droppable areas

**Features**:
- Task drag-and-drop between columns
- Column reordering
- Order persistence to database
- Visual feedback during drag

**Usage**:
```typescript
<DragDrop board={board}>
  {board.columns.map(column => (
    <Droppable key={column.id} droppableId={column.id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {column.tasks.map(task => (
            <Draggable key={task.id} draggableId={task.id} index={0}>
              {(provided) => (
                <TaskCard {...provided.draggableProps} {...provided.dragHandleProps} task={task} />
              )}
            </Draggable>
          ))}
        </div>
      )}
    </Droppable>
  ))}
</DragDrop>
```

---

### BoardColumn

**File**: `src/features/board/components/column/BoardColumn.tsx`

Individual column component.

**Props**:
- `column: ColumnType` - Column data with tasks
- `boardId: string` - Parent board ID
- `onUpdate?: () => void` - Update callback

**Features**:
- Column title display
- Task list rendering
- Add task button
- Delete column action

---

### ColumnTitle

**File**: `src/features/board/components/column/ColumnTitle.tsx`

Editable column title with edit/save modes.

**Props**:
- `columnId: string` - Column ID
- `title: string` - Current title
- `onTitleChange?: (newTitle: string) => void` - Change callback

**Features**:
- Click to edit
- Inline save
- Loading state

---

### TaskCard

**File**: `src/features/board/components/column/TaskCard.tsx`

Individual task card component.

**Props**:
- `task: TaskType` - Task data
- `onUpdate?: () => void` - Update callback

**Features**:
- Task title and priority
- Priority indicator (color-coded)
- Click to view details
- Context menu (more options)

---

### TaskCardContent

**File**: `src/features/board/components/column/TaskCardContent.tsx`

Task card content layout.

**Props**:
- `task: TaskType` - Task data
- `showDescription?: boolean` - Show description

**Features**:
- Title, description, priority
- Responsive layout

---

### TaskDetailsModal

**File**: `src/features/board/components/column/TaskDetailsModal.tsx`

Full task details modal with edit capabilities.

**Props**:
- `task: TaskType` - Task data
- `open: boolean` - Modal visibility
- `onClose: () => void` - Close handler
- `onUpdate?: () => void` - Update callback

**Features**:
- Task title and description editing
- Priority selector
- Delete task button
- Save changes

---

### TaskForm

**File**: `src/features/board/components/column/TaskForm.tsx`

Form for creating/editing tasks.

**Props**:
- `columnId: string` - Column ID
- `onSubmit?: () => void` - Submit callback
- `initialTask?: TaskType` - For editing mode

**Features**:
- Title input field
- Description (optional)
- Priority selector
- Submit button

---

### TaskPriorityToggle

**File**: `src/features/board/components/column/TaskPriorityToggle.tsx`

Priority selector component.

**Props**:
- `priority: Priority` - Current priority ("LOW" | "MEDIUM" | "HIGH" | "URGENT")
- `onChange: (priority: Priority) => void` - Change callback
- `disabled?: boolean` - Disabled state

**Features**:
- Color-coded priorities
- Visual icons
- Dropdown or inline display

---

### ColumnCreateForm

**File**: `src/features/board/components/column/ColumnCreateForm.tsx`

Form for creating new columns.

**Props**:
- `boardId: string` - Parent board ID
- `onSuccess?: () => void` - Success callback

**Features**:
- Column title input
- Submit button
- Error handling

---

### Sidebar

**File**: `src/features/board/components/sidebar/Sidebar.tsx`

Left sidebar with board list.

**Props**:
- `boards: Board[]` - List of user's boards
- `activeBoardId?: string` - Currently active board
- `onBoardSelect?: (boardId: string) => void` - Select handler

**Features**:
- Board list display
- Active indicator
- Create board button
- Responsive collapse

---

### SidebarItem

**File**: `src/features/board/components/sidebar/SidebarItem.tsx`

Individual sidebar board item.

**Props**:
- `board: Board` - Board data
- `active?: boolean` - Active state
- `onClick?: () => void` - Click handler
- `onDelete?: (boardId: string) => void` - Delete handler

**Features**:
- Board title
- Active highlighting
- Delete button

---

### CreateBoardForm

**File**: `src/features/board/components/sidebar/CreateBoardForm.tsx`

Modal form for creating new boards.

**Props**:
- `open: boolean` - Form visibility
- `onClose: () => void` - Close handler
- `onSuccess?: () => void` - Success callback

**Features**:
- Board title input
- Description (optional)
- Validation
- Submit button

---

## Auth Form Components

### LoginForm

**File**: `src/features/auth/components/LoginForm.tsx`

User login form.

**Features**:
- Email input
- Password input
- Sign up link
- Error handling

---

### RegisterForm

**File**: `src/features/auth/components/RegisterForm.tsx`

User registration form.

**Features**:
- Name input
- Email input
- Password input
- Confirm password
- Password matching validation
- Sign in link

---

### LoginFields & RegisterFields

**File**: `src/features/auth/components/LoginFields.tsx` & `src/features/auth/components/RegisterFields.tsx`

Reusable form field groups.

---

### ContainerForm

**File**: `src/features/auth/components/ContainerForm.tsx`

Form container with layout and styling.

---

## User Profile Components

### ProfileForm

**File**: `src/features/user/components/ProfileForm.tsx`

User profile edit form.

**Props**:
- `user: User` - Current user data
- `onSuccess?: () => void` - Success callback

**Features**:
- Name input
- Position input
- Biography textarea
- Image URL input
- Save button
- Validation

---

## Component Composition Example

```typescript
// src/app/user/[id]/board/page.tsx
import { Sidebar } from "@/features/board/components/sidebar/Sidebar";
import { Board } from "@/features/board/components/Board";
import { DragDrop } from "@/features/board/components/DragDrop";
import { Header } from "@/components/layout/Header";

export default async function BoardPage({ params }) {
  const board = await getBoardById(params.id);
  
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <DragDrop board={board}>
          <Board board={board} />
        </DragDrop>
      </main>
    </>
  );
}
```

---

## Performance Considerations

### Memoized Components
- `UserButton` - Prevents re-renders from parent updates
- `MoreButton` - High-frequency event handler

### When to Memoize
- Component receives frequently-updated props
- Component has expensive render logic
- Component is high in the tree

### When NOT to Memoize
- Simple components (cost > benefit)
- Components that rarely re-render
- Props are always new objects

### useCallback Usage
```typescript
const handleClick = useCallback(() => {
  // Only recreated when dependencies change
  action();
}, [action]);
```
