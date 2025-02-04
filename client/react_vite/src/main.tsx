import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import {LoginPage} from "@/pages/login.tsx";
import {RegisterPage} from "@/pages/register.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
