import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {LoginPage} from "@/pages/login.tsx";
import {RegisterPage} from "@/pages/register.tsx";
import NotFoundPage from "@/pages/not-found.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
        errorElement:<NotFoundPage/>
    },{
        path: "register",
        element: <RegisterPage/>
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
