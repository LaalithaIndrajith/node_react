import { createContext, useContext, useState } from "react";

export type BreadcrumbEntry = {
    title: string;
    link: string;
};

type BreadcrumbContextType = {
    breadcrumbList: BreadcrumbEntry[];
    setBreadcrumbList: (list: BreadcrumbEntry[]) => void;
};

const BreadcrumbContext = createContext({} as BreadcrumbContextType);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbEntry[]>([]);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbList, setBreadcrumbList }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

// Custom hook to use BreadcrumbContext
export function useBreadcrumb() {
    return useContext(BreadcrumbContext);
}