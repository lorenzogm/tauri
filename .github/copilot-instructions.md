# GitHub Copilot Instructions

## Project Overview

This project is a frontend application built with modern web technologies following strict conventions for maintainability and consistency.

## Tech Stack

- **TypeScript**: Primary language for type safety
- **React**: UI library for building components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint**: Code linting and formatting

## Monorepo

- Always run commands from the root of the monorepo.
- Use `pnpm` for package management.
- Use filters for running commands in specific packages, e.g., `pnpm --filter @ring/* build`.
- Use `pnpm check` for quality control checks.
- Use `pnpm fix` to automatically fix issues.

## Application Folder Structure

- **Always use kebab-case** for all file and directory names
- Examples: `user-profile.tsx`, `navigation-bar.ts`, `api-client.js`

```
├── apps/
│   ├── next-js-app/
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx                 # Root layout
│   │       │   ├── page.tsx                   # Home page
│   │       │   ├── loading.tsx                # Global loading UI
│   │       │   ├── error.tsx                  # Global error UI
│   │       │   ├── not-found.tsx              # 404 page
│   │       │   └── globals.css                # Global styles
│   │       └── ui/
│   │          ├── blocks/
│   │          │   ├── hero.tsx
│   │          │   ├── carousel.tsx
│   │          │   └── ...
│   │          ├── layouts/
│   │          │   ├── main-layout
│   │          │   │   ├── main-layout.tsx
│   │          │   │   ├── header.tsx
│   │          │   │   └── footer.tsx
│   │          │   ├── checkout-layout
│   │          │   │   ├── checkout-layout.tsx
│   │          │   │   ├── header.tsx
│   │          │   │   └── footer.tsx
│   │          │   └── ...
│   │          ├── pages/
│   │          │   ├── home-page
│   │          │   │   └── home-page.tsx
│   │          │   ├── user-profile-page
│   │          │   │   └── user-profile-page.tsx
│   │          │   └── ...
│   │          └── types/
│   │              ├── user.ts
│   │              └── ...
│   └── ...                       # Other apps
└── shared/
    ├── ui/
    │   └── src/
    │       ├── components/
    │       │   ├── button/button.tsx
    │       │   ├── input/input.tsx
    │       │   ├── heading/heading.tsx
    │       └── utils/
    └── ...                       # Other libs

```

### File Collocation Principles

- **Avoid global utility folders**: Instead of centralized `hooks/` or `utils/` folders, collocate related files near where they are used
- **Keep related code together**: Place helper functions, custom hooks, and utilities in the same directory as the components that use them
- **Example**: If a `ui/pages/user-profile/user-profile-page.tsx` needs a custom hook, create `user-profile-page.ts` in the same directory

## TypeScript

- Use TypeScript interfaces for all component props
- Have a single export per file.
- **Use camelCase** for variables, functions, properties, and methods
- Examples: `userData`, `handleUserLogin()`, `isLoggedIn`, `fetchUserProfile()`
- Avoid barrel files (index.ts files).
- Use `interface` for defining types.
- Use `type` for defining unions or complex types.
- Export always using named exports

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

## AI Files

### Script Creation Guidelines

- **Always create analysis and automation scripts in the `.ai/` directory**
- Create a subdirectory based on the ticket number (if known) or a timestamp (year, month, day, hour, minute) to group the files by task
- **Use Python for all analysis scripts** for consistency and reliability
- The `.ai/` folder is for summary files, documentation, scripts, or any helper files used by AI to achieve tasks
- Scripts should be well-documented with docstrings and usage instructions
- Include error handling and progress indicators
- Save analysis results in Markdown format for easy review
- The `.ai/` directory is included in `.gitignore` for local-only AI assistance
