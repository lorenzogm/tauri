---
description: 'CUSTOM | ReactJS development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css, **/*.scss'
---

- Use the components from the shared UI library at `shared/ui` folder.
- Make sure the svg are displayed, use the mcp figma server to download the svgs
- Create a .mocks.ts file for the mocked data
- Include unit testing

## React

- Use PascalCase for React component names
- Component files should match the component name but in kebab-case
- Examples: `UserProfile` component in `user-profile.tsx`, `NavigationBar` component in `navigation-bar.tsx`
- Use `props` directly in the component
- Have a single `useState` per file.
- Avoid `useEffect`, `useCallback` and `useMemo` unless necessary.
- Check in `components` directory for existing components before creating new ones.

### Core Principles

1. **Presentational Only**: UI components should be purely presentational
2. **No Data Fetching**: Components should not perform API calls or data fetching
3. **No Global State**: Components should not manage or access global state
4. **No Framework Dependencies**: UI components should not depend on routing or other framework-specific features

### HTML Tag Component Mapping

Every HTML tag used in the application should have a corresponding React component:

- `<button>` → `Button` component
- `<input>` → `Input` component
- `<p>` → `Paragraph` component
- `<h1>`, `<h2>`, etc. → `Heading` component with size prop
- `<img>` → `Image` component
- `<a>` → `Link` component
- `<form>` → `Form` component
- `<select>` → `Select` component
- `<textarea>` → `Textarea` component

### Component Structure

All UI components should follow this structure:

```typescript
import React from 'react';

interface ComponentNameProps {
  // Props with descriptive names using camelCase
  children?: React.ReactNode;
  className?: string;
  // Other props...
}

export function ComponentName(props: ComponentNameProps) {
  return (
    <div className={`base-styles ${props.className || ''}`}>
      {props.children}
    </div>
  );
}
```

### Styling Guidelines

- Use Tailwind CSS classes for all styling
- Create reusable component variants using props
- Avoid inline styles
- Use conditional classes for different states

Example:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';
  const disabled = props.disabled || false;
  const className = props.className || '';

  const baseClasses = 'font-medium rounded focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
```

### Single useState Pattern

When components need state, use a single `useState` call to manage related state:

```typescript
interface ComponentState {
	isLoading: boolean;
	data: any[];
	error: string | null;
}

export function DataComponent(props: DataComponentProps) {
	const [state, setState] = React.useState<ComponentState>({
		isLoading: false,
		data: [],
		error: null,
	});

	const updateState = (updates: Partial<ComponentState>) => {
		setState((prevState) => ({ ...prevState, ...updates }));
	};

	// Use state.isLoading, state.data, state.error
	// Update with updateState({ isLoading: true })
}
```

## ESLint

Follow these ESLint rules:

- Use function declarations instead of arrow functions.
- Prefer const over let when variables are not reassigned
- Use function declarations for component definitions
- Always use semicolons
- Use single quotes for strings
- No unused variables or imports
- Proper TypeScript type annotations
- Avoid props destructuring
