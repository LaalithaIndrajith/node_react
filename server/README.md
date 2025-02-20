# Node + Express Backend

This is the backend server for the application, built with Node.js, Express, TypeScript, and Prisma. It provides API endpoints for user authentication and post management using MongoDB as the database.

## Project Structure

```
.
├── README.md
├── nodemon.json
├── package-lock.json
├── package.json
├── prisma
│   └── schema.prisma
├── src
│   ├── controllers
│   │   ├── auth-controller.ts
│   │   └── post-controller.ts
│   ├── helpers
│   │   └── auth-helper.ts
│   ├── index.ts
│   ├── router
│   │   ├── auth-router.ts
│   │   ├── index.ts
│   │   └── post-router.ts
│   └── services
│       ├── post-service.ts
│       └── user-service.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB
- Prisma CLI

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/LaalithaIndrajith/node_react.git
   cd server
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   PORT=8080
   FRONTEND_URL="http://localhost:5173"
   ```

4. Run Prisma migrations:
   ```sh
   npx prisma generate
   ```

5. Start the server:
   ```sh
   npm start
   ```
---
# API Documentation

## Authentication Endpoints

### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "username": "testuser",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "id": "userId",
    "email": "user@example.com",
    "username": "testuser"
  }
  ```

### Login User
- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "id": "userId",
    "email": "user@example.com",
    "username": "testuser",
    "token": "jwt_token_here"
  }
  ```

## Post Endpoints

### Create a Post
- **URL:** `/posts/new`
- **Method:** `POST`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Request Body:**
  ```json
  {
    "title": "My First Post",
    "description": "This is the content of the post."
  }
  ```
- **Response:**
  ```json
  {
    "id": "postId",
    "title": "My First Post",
    "description": "This is the content of the post.",
    "authorId": "userId"
  }
  ```

### Get All Posts
- **URL:** `/posts/all`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "postId",
      "title": "My First Post",
      "description": "This is the content of the post.",
      "author": {
        "id": "userId",
        "username": "testuser",
        "email": "user@example.com"
      }
    }
  ]
  ```

### Get Posts by Author ID
- **URL:** `/posts`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  [
    {
      "id": "postId",
      "title": "My First Post",
      "description": "This is the content of the post."
    }
  ]
  ```

### Get Post by Post ID
- **URL:** `/posts/edit/:postId`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "id": "postId",
    "title": "My First Post",
    "description": "This is the content of the post."
  }
  ```

### Update Post
- **URL:** `/posts/edit/:postId`
- **Method:** `PUT`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer jwt_token_here"
  }
  ```
- **Request Body:**
  ```json
  {
    "title": "Updated Post Title",
    "description": "Updated post content."
  }
  ```
- **Response:**
  ```json
  {
    "id": "postId",
    "title": "Updated Post Title",
    "description": "Updated post content."
  }
  ```


