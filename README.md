# Meedium - Blog Web App

This is a full-stack blog web application built using **React (Vite) & TypeScript** for the frontend and **Node.js (Express) & Prisma** for the backend. The application allows users to create, edit, and manage blog posts.

## 🏗 Project Structure

```
.
├── client/    # Frontend (React + Vite + TailwindCSS)
│   └── react_vite/
│       ├── src/   # React components & pages
│       ├── public/
│       ├── package.json.
│       ├── package-lock.json
│       ├── postcss.config.js
│       ├── index.html
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts

└── server/    # Backend (Node.js + Express + Prisma + TypeScript)
    ├── src/
    │   ├── controllers/
    │   ├── router/
    │   ├── services/
    │   ├── index.ts
    ├── prisma/schema.prisma # Database schema
    ├── package.json
    ├── nodemon.json
    └── tsconfig.json

```

## 🚀 Features

- **User Authentication**
- **Create, Edit Blog Posts**
- **View Posts by Author**
- **Responsive UI with Tailwind CSS**
- **Backend API with Express & Prisma ORM**

## 📖 Documentation

For detailed setup instructions, refer to the specific documentation for each part of the project:

- **Frontend Documentation** ➝ [client/README.md](client/react_vite/README.md)
- **Backend Documentation** ➝ [server/README.md](server/README.md)

## 📌 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB Database** 

### Setup Instructions

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/LaalithaIndrajith/node_react.git
```

#### 2️⃣ Install Dependencies

**Frontend**
```bash
cd client/react_vite
npm install
```

**Backend**
```bash
cd server
npm install
```

#### 3️⃣ Configure Environment Variables
Create a `.env` file in both `client/react_vite/` and `server/` directories and configure necessary environment variables.

#### 4️⃣ Start the Development Servers

**Frontend:**
```bash
npm run dev
```

**Backend:**
```bash
npm run start
```

#### 5️⃣ Open in Browser
The frontend should be running at **`http://localhost:5173`**, and the backend API should be available at **`http://localhost:8080`**.

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- shadcn

### Backend
- Node.js (Express.js)
- TypeScript
- Prisma ORM
- MongoDB

### Tools
- ESLint & Prettier
- Nodemon for live reloading

## 🎯 Future Enhancements
- Comments on blog posts
- Rich text editor for creating posts
- Like/Dislike system
- Dark mode

---

For further details, check out the respective frontend and backend documentation!

