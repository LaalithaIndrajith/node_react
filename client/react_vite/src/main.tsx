import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {LoginPage} from "@/pages/login.tsx";
import {RegisterPage} from "@/pages/register.tsx";
import NotFoundPage from "@/pages/not-found.tsx";
import {ProtectedRoute} from "@/components/layout/ProtectedRoute.tsx";
import {HomePage} from "@/pages/home.tsx";
import {MyPostsPage} from "@/pages/posts/my-posts.tsx";
import {BreadcrumbProvider} from "@/context/BreadcrumbContext.tsx";
import {AllPostsPage} from "@/pages/posts/all-posts.tsx";
import {NewPostPage} from "@/pages/posts/new-post.tsx";
import {EditPostPage} from "@/pages/posts/edit-post.tsx";
import {PublicRoute} from "@/components/layout/PublicRoute.tsx";

const router = createBrowserRouter([
    {
        element: <PublicRoute />, 
        children: [
            { path: "/", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
        ],
        errorElement: <NotFoundPage />,
    },
    {
        path: "home",
        element: <ProtectedRoute />, // Protect this route
        children: [
            {
                path: "",
                element: <HomePage />,
                handle: { breadcrumbList: [{ title: "Home", link: "/home" }]}
            },
            {
                path: "my-posts",
                element: <MyPostsPage />,
                handle: { breadcrumbList: [{ title: "Home", link: "/home" }, { title: "My Posts", link: "/home/my-posts" }]}
            },
            {
                path: "all-posts",
                element: <AllPostsPage />,
                handle: { breadcrumbList: [{ title: "Home", link: "/home" }, { title: "All Posts", link: "/home/all-posts" }]}
            },
            {
                path: "new-Post",
                element: <NewPostPage />,
                handle: { breadcrumbList: [{ title: "Home", link: "/home" }, { title: "New Post", link: "/home/new-post" }]}
            },
            {
                path: "edit-Post/:postId",
                element: <EditPostPage />,
                handle: { breadcrumbList: [{ title: "Home", link: "/home" }, { title: "Edit Post", link: "/home/edit-post" }]}
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BreadcrumbProvider>
            <RouterProvider router={router}/>
        </BreadcrumbProvider>
    </StrictMode>,
)
