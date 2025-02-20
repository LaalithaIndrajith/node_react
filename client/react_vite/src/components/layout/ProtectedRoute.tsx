import {Navigate, Outlet, useMatches} from "react-router";
import {MainLayout} from "@/components/layout/main-layout.tsx";
import {useBreadcrumb} from "@/context/BreadcrumbContext.tsx";
import {useEffect} from "react";
import {AuthHelper} from "@/helpers/auth-helper.ts";

type RouteHandle = {
    breadcrumbList?: { title: string; link: string }[];
};

export function ProtectedRoute() {

    const matches = useMatches();
    const { setBreadcrumbList } = useBreadcrumb();

    useEffect(() => {
        const currentBreadcrumbs = matches
            .map((match) => (match.handle as RouteHandle)?.breadcrumbList || [])
            .flat();
        setBreadcrumbList(currentBreadcrumbs);
    }, [matches, setBreadcrumbList]);

    return AuthHelper.isAuthenticated() ? (
        <MainLayout>
            <Outlet />
        </MainLayout>
    ) : (
        <Navigate to="/" replace />
    );
}
