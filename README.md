<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>TanStack Start Dashboard Starter Template With Shadcn-ui</strong></div>
<div align="center">Built with TanStack Start</div>
<br />
<div align="center">
<a href="https://dub.sh/tanstack-start-dashboard">View Demo</a>
<span>
</div>

## Overview

This is a starter template using the following stack:

- Framework - [TanStack Start](https://tanstack.com/start)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [Better Auth](https://www.better-auth.com/)
- Styling - [Tailwind CSS v4](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Zod](https://zod.dev)
- Data Fetching - [TanStack React Query](https://tanstack.com/query/latest)
- Tables - [TanStack React Table](https://tanstack.com/table/latest)
- Forms - [TanStack React Form](https://tanstack.com/form/latest) • [React Hook Form](https://react-hook-form.com)
- Icons - [Tabler Icons](https://tabler.io/icons)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

_If you are looking for a Next.js dashboard template, here is the [repo](https://git.new/shadcn-dashboard)._

## Pages

| Pages                                                                           | Specifications                                                                                                                                      |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Dashboard (Overview)](https://tanstack-start-dashboard.kiranism.dev/dashboard) | Cards with Recharts graphs for analytics. Clean dashboard layout with responsive design and modern UI components.                                   |
| [Products](https://tanstack-start-dashboard.kiranism.dev/dashboard/products)    | TanStack React Table with server-side searching, filtering, and pagination. Demonstrates advanced table functionality with type-safe data handling. |
| [Settings](https://tanstack-start-dashboard.kiranism.dev/dashboard/settings)    | Settings page with form components using TanStack React Form and React Hook Form integration.                                                       |
| [Not Found](https://tanstack-start-dashboard.kiranism.dev/404)                  | Custom 404 Not Found page with proper error handling and navigation.                                                                                |

## Feature-based Organization

```plaintext
src/
├── routes/ # TanStack Router directory
│ ├── __root.tsx # Root layout component
│ ├── index.tsx # Home page
│ ├── dashboard/ # Dashboard route group
│ │ ├── route.tsx # Dashboard layout
│ │ ├── index.tsx # Dashboard overview
│ │ ├── products.tsx # Products page
│ │ └── settings.tsx # Settings page
│ └── api/ # API routes
│
├── components/ # Shared components
│ ├── ui/ # Shadcn-ui components
│ ├── app-sidebar.tsx # Application sidebar
│ ├── user-nav.tsx # User navigation component
│ ├── path-breadcrumbs.tsx # Breadcrumb navigation
│ └── providers.tsx # Context providers
│
├── features/ # Feature-based modules
│ ├── overview/ # Dashboard overview feature
│ ├── products/ # Products management feature
│ └── settings/ # Settings feature
│
├── lib/ # Core utilities and configurations
│ └── utils.ts # Shared utilities
│
├── hooks/ # Custom hooks
│
├── data/ # Data layer and API calls
│
├── styles/ # Global styles and Tailwind config
│
└── utils/ # Additional utilities
```

## Getting Started

> [!NOTE]  
> We are using **TanStack Start** with **React 19**, follow these steps:

Clone the repo:

```bash
git clone https://github.com/kiranism/tanstack-start-dashboard.git
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm run dev
```

The application will be available at http://localhost:3001.

### Build for Production

Build the application:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm run start
```

## Scripts

- `pnpm run dev` - Start development server on port 3001
- `pnpm run build` - Build the application for production
- `pnpm run start` - Start the production server

## Key Features

- **🚀 TanStack Start** - Full-stack React framework with file-based routing
- **🎨 Modern UI** - Beautiful dashboard built with Shadcn-ui components
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS v4
- **🔍 Type Safety** - Full TypeScript support with strict type checking
- **📊 Data Tables** - Advanced table functionality with TanStack React Table
- **📈 Charts & Analytics** - Interactive charts with Recharts
- **🎭 Theme Support** - Dark/light mode with next-themes
- **📋 Forms** - Multiple form solutions with validation
- **🔄 Data Fetching** - Efficient data management with TanStack React Query
- **🎯 Developer Experience** - Hot reload, TypeScript, ESLint, and Prettier

## Project Structure Benefits

- **Feature-based organization** - Logical grouping of related components and logic
- **Scalable architecture** - Easy to extend and maintain as your project grows
- **Type-safe routing** - Fully typed routes with TanStack Router
- **Component reusability** - Shared UI components with consistent design
- **Modern tooling** - Latest versions of React, TypeScript, and build tools

## Authentication Setup

This template provides space for authentication integration. You can easily add your preferred authentication solution such as:

- **Clerk** - Complete authentication and user management
- **Auth0** - Enterprise-grade authentication platform
- **Supabase Auth** - Open source authentication with built-in user management
- **Custom Auth** - Roll your own authentication solution

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

> [!TIP]
> This template is designed to help you quickly bootstrap a TanStack Start project with minimal necessary boilerplate. Perfect for developers who want to build modern dashboards with the latest React ecosystem tools.

Cheers! 🥂
