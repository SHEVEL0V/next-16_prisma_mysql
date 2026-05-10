# Form & Modal Features

This directory contains reusable form and modal features to reduce duplication and maintain consistent patterns across the application.

## Structure

```
features/
├── form/                          # Form feature components
│   ├── components/
│   │   ├── FormSection.tsx        # Group related form fields
│   │   ├── FormErrorAlert.tsx     # Display form-wide errors/success
│   │   └── FormFieldError.tsx     # Display inline field errors
│   └── index.ts
│
└── modal/                         # Modal feature utilities
    ├── components/
    │   ├── ModalHeader.tsx        # Reusable modal header
    │   └── ModalActions.tsx       # Reusable modal footer with actions
    ├── hooks/
    │   └── useModalNavigation.ts  # Handle modal navigation
    └── index.ts
```

## Usage

### Form Feature

#### FormSection
Groups related form fields with optional title and description:

```tsx
import { FormSection } from '@/features/form';

<FormSection 
  title="Personal Information" 
  description="Please fill in your details"
>
  <TextField name="firstName" label="First Name" />
  <TextField name="lastName" label="Last Name" />
</FormSection>
```

#### FormErrorAlert
Displays form submission errors or success messages:

```tsx
import { FormErrorAlert } from '@/features/form';
import { useActionState } from 'react';

const [state, action, isPending] = useActionState(submitAction, {
  success: false,
  errors: {},
  message: ""
});

<FormErrorAlert state={state} />
```

#### FormFieldError
Shows inline error messages for specific form fields:

```tsx
import { FormFieldError } from '@/features/form';

<TextField name="email" label="Email" />
<FormFieldError fieldName="email" errors={state.errors} />
```

### Modal Feature

#### ModalHeader
Reusable modal header with title and close button:

```tsx
import { ModalHeader } from '@/features/modal';

<Dialog>
  <ModalHeader title="Create Item" onClose={handleClose} />
  {/* Dialog content */}
</Dialog>
```

#### ModalActions
Reusable modal footer with standard action buttons:

```tsx
import { ModalActions } from '@/features/modal';
import { MESSAGES } from '@/constants';

<Dialog>
  {/* Dialog content */}
  <ModalActions
    primaryLabel="Create"
    onCancel={handleClose}
    formId="create-form"
    loading={isPending}
  />
</Dialog>
```

#### useModalNavigation
Hook for handling modal open/close with router integration:

```tsx
import { useModalNavigation } from '@/features/modal';

const { open, close, toggle } = useModalNavigation();

// Use close to dismiss modal and go back
close(); // router.back()
```

## Best Practices

1. **FormSection** - Use for grouping 2+ related fields with visual separation
2. **FormErrorAlert** - Place immediately below form title or at the top of form
3. **FormFieldError** - Place directly below the field it validates
4. **ModalHeader + ModalActions** - Use together for consistent modal structure
5. **useModalNavigation** - Pair with router-based modals for proper back navigation

## Integration Examples

### Complete Form Example
```tsx
import { FormSection, FormErrorAlert, FormFieldError } from '@/features/form';
import { useActionState } from 'react';

export default function CreateItemForm() {
  const [state, action, isPending] = useActionState(createAction, {
    success: false,
    errors: {},
    message: ""
  });

  return (
    <Box component="form" action={action}>
      <FormErrorAlert state={state} />
      
      <FormSection title="Details">
        <TextField name="title" label="Title" />
        <FormFieldError fieldName="title" errors={state.errors} />
        
        <TextField name="description" label="Description" multiline rows={4} />
        <FormFieldError fieldName="description" errors={state.errors} />
      </FormSection>
      
      <FormSection title="Settings">
        <Checkbox name="isPublic" label="Make Public" />
      </FormSection>
    </Box>
  );
}
```

### Complete Modal Example
```tsx
import { ModalHeader, ModalActions } from '@/features/modal';
import { Dialog, DialogContent } from '@mui/material';

export default function CreateModal() {
  const handleClose = () => router.back();

  return (
    <Dialog open onClose={handleClose} fullWidth maxWidth="sm">
      <ModalHeader title="Create Item" onClose={handleClose} />
      
      <DialogContent dividers>
        <Box component="form" id="create-form" action={formAction}>
          {/* Form fields */}
        </Box>
      </DialogContent>
      
      <ModalActions
        primaryLabel="Create"
        onCancel={handleClose}
        formId="create-form"
        loading={isPending}
      />
    </Dialog>
  );
}
```

## Type Safety

All components are fully typed with TypeScript. Import types as needed:

```tsx
import type { FormFieldErrorProps } from '@/features/form';
```

## Performance

Components use React.memo where appropriate to prevent unnecessary re-renders:
- ModalHeader
- ModalActions
- FormErrorAlert
- FormFieldError
- FormSection

## Accessibility

- Form fields include proper labels and error associations
- Modal headers use semantic HTML (DialogTitle)
- Close buttons have aria-labels
- Error messages use FormHelperText for accessibility

## Future Enhancements

Planned additions:
- FormRadioGroup - Reusable radio button group component
- FormCheckboxGroup - Reusable checkbox group component
- FormSelectField - Reusable select field with async options
- ModalConfirm - Confirmation dialog component
