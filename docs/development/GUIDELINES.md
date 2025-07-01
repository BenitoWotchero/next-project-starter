# 💻 Development Guidelines

> **Coding-Standards und Konventionen für [PROJECT_NAME]**

## 📋 Code-Style Standards

### TypeScript & React
```typescript
// ✅ Functional Components mit TypeScript
interface Props {
  title: string;
  children: React.ReactNode;
}

export function MyComponent({ title, children }: Props) {
  return (
    <div className="container">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// ✅ Named Exports bevorzugen
export { MyComponent };
```

### File & Folder Naming
```
src/
├── components/
│   ├── ui/              # Basis UI-Komponenten
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── features/        # Feature-spezifische Komponenten
│   │   └── auth/
│   └── layout/          # Layout-Komponenten
├── lib/                 # Utilities & Helpers
├── hooks/              # Custom React Hooks
└── types/              # TypeScript Type Definitions
```

### Naming Conventions
| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `UserProfile.tsx` |
| **Hooks** | camelCase mit "use" | `useAuthState.ts` |
| **Utilities** | camelCase | `formatDate.ts` |
| **Types** | PascalCase | `User`, `ApiResponse` |
| **Constants** | UPPER_SNAKE_CASE | `API_BASE_URL` |

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices
```tsx
// ✅ Komponenten-basierte Klassen
const buttonStyles = {
  base: "px-4 py-2 rounded-md font-medium transition-colors",
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
};

// ✅ Responsive Design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### CSS Organization
```css
/* ✅ Utility-first, dann Custom CSS */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Component Styles */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
  }
}
```

## 📁 Project Structure

### Feature-Based Organization
```
src/
├── app/                 # Next.js App Router
│   ├── (auth)/         # Route Groups
│   ├── api/            # API Routes
│   └── globals.css
├── components/
│   ├── ui/             # Reusable UI Components
│   └── features/       # Feature-specific Components
├── lib/
│   ├── auth.ts         # Authentication Logic
│   ├── db.ts          # Database Connection
│   └── utils.ts       # General Utilities
├── hooks/              # Custom Hooks
├── types/              # TypeScript Definitions
└── styles/             # Global Styles
```

## 🔧 Code Quality

### ESLint Rules
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "prefer-const": "error",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Pre-Commit Hooks
```bash
# Automatische Checks vor jedem Commit
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run test          # Unit Tests
npm run format        # Prettier
```

## 🧪 Testing Standards

### Unit Tests (Jest + Testing Library)
```typescript
// ✅ Component Testing
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

### API Testing
```typescript
// ✅ API Route Testing
import { createMocks } from 'node-mocks-http';
import handler from '../api/users';

describe('/api/users', () => {
  it('returns users list', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
```

## 📝 Documentation Standards

### Component Documentation
```typescript
/**
 * Button component with different variants and sizes
 * 
 * @param variant - Button style variant
 * @param size - Button size
 * @param disabled - Whether button is disabled
 * @param onClick - Click handler function
 */
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Function Documentation
```typescript
/**
 * Formats a date string to localized format
 * 
 * @param date - ISO date string
 * @param locale - Locale for formatting (default: 'de-DE')
 * @returns Formatted date string
 * 
 * @example
 * formatDate('2024-01-15') // '15.01.2024'
 */
export function formatDate(date: string, locale = 'de-DE'): string {
  return new Date(date).toLocaleDateString(locale);
}
```

## 🚀 Performance Guidelines

### Next.js Optimizations
```typescript
// ✅ Image Optimization
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // Above-the-fold images
/>

// ✅ Dynamic Imports
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});

// ✅ Font Optimization
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

### Bundle Optimization
```typescript
// ✅ Tree Shaking
import { debounce } from 'lodash-es'; // Specific import

// ❌ Avoid
import _ from 'lodash'; // Full library import
```

## 🔒 Security Guidelines

### API Security
```typescript
// ✅ Input Validation
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const body = await request.json();
  const validatedData = userSchema.parse(body); // Throws if invalid
}
```

### Environment Variables
```typescript
// ✅ Environment Variable Validation
const env = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32)
}).parse(process.env);
```

## 📋 Code Review Checklist

### Before Creating PR
- [ ] **Tests** → All tests pass (`npm run test`)
- [ ] **Linting** → No ESLint errors (`npm run lint`)
- [ ] **Types** → No TypeScript errors (`npm run type-check`)
- [ ] **Build** → Production build successful (`npm run build`)
- [ ] **Documentation** → Components/functions documented
- [ ] **Performance** → No obvious performance issues

### Review Criteria
- [ ] **Functionality** → Code works as expected
- [ ] **Readability** → Code is easy to understand
- [ ] **Security** → No security vulnerabilities
- [ ] **Performance** → Efficient implementation
- [ ] **Tests** → Adequate test coverage
- [ ] **Documentation** → Appropriate documentation

## 🔄 Git Workflow

### Commit Message Format
```
type(scope): short description

- Detailed change 1
- Detailed change 2

Fixes #123
```

**Types:**
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code formatting
- `refactor:` Code improvements
- `test:` Testing
- `chore:` Build/config changes

### Branch Naming
```
feature/user-authentication
fix/login-validation-bug
docs/api-documentation
refactor/user-service
```

---

**📅 Last Updated:** [LAST_UPDATE_DATE]  
**🔄 Review Frequency:** Monthly or with major changes  
**👥 Maintained by:** Development Team

## 🤖 AI-Chat Integration

**Quick References:**
```
"Folge @docs/development/GUIDELINES.md für Code-Standards"
"Überprüfe Code gegen @docs/development/GUIDELINES.md"
"Erstelle Komponente nach @docs/development/GUIDELINES.md"
``` 