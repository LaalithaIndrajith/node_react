import {Navigate, Outlet, useMatches} from "react-router";
import {MainLayout} from "@/components/layout/main-layout.tsx";
import {useBreadcrumb} from "@/context/BreadcrumbContext.tsx";
import {useEffect} from "react";

type RouteHandle = {
    breadcrumbList?: { title: string; link: string }[];
};

const isAuthenticated = () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;

    return !!userDetails?.authToken; // Check if authToken exists and is truthy
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

    return isAuthenticated() ? (
        <MainLayout>
            <Outlet />
        </MainLayout>
    ) : (
        <Navigate to="/" replace />
    );
}