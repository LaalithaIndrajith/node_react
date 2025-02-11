# React Vite Frontend

## Overview
This is the frontend of the Meedium - Online Blog web application built using React and Vite. The application allows users to create, edit, and view blog posts. It follows a modular component structure and uses various libraries for UI and state management.

## Project Structure
```
react_vite
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── common
│   │   ├── layout
│   │   ├── posts
│   │   └── ui
│   ├── constants
│   │   └── alert-type.ts
│   ├── context
│   │   └── BreadcrumbContext.tsx
│   ├── helpers
│   │   ├── auth-helper.ts
│   │   └── text-helper.ts
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── home.tsx
│   │   ├── login.tsx
│   │   ├── not-found.tsx
│   │   ├── posts
│   │   └── register.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Tech Stack
- **Framework:** React with Vite
- **Language:** TypeScript
- **State Management:** React Context API
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Validation:** Zod
- **Form Handling:** React Hook Form
- **UI Components:** shadcn

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/LaalithaIndrajith/node_react.git
   cd client/react_vite
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Available Scripts
- `npm run dev` - Runs the application in development mode.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality.
- `npm run preview` - Previews the production build.

## Environment Variables
Create a `.env` file in the root directory and configure the backend URL:
```
VITE_BACKEND_URL=http://localhost:5000
```

## Features
- User authentication (login/register)
- Create, edit, and delete blog posts
- Responsive design with Tailwind CSS
- Toast notifications