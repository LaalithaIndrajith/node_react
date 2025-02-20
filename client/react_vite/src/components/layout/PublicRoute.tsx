import {AuthHelper} from "@/helpers/auth-helper.ts";
import {Navigate, Outlet} from "react-router";

export function PublicRoute() {
    return AuthHelper.isAuthenticated() ? <Navigate to="/home" replace /> : <Outlet />;
}