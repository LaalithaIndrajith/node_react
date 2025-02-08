
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {SideNavMain} from "@/components/layout/side-nav-main.tsx";
import {useBreadcrumb} from "@/context/BreadcrumbContext.tsx";
import {NavBreadcrumb} from "@/components/layout/nav-breadcrumb.tsx";

export function MainLayout({ children }: { children: React.ReactNode }) {
    const { breadcrumbList } = useBreadcrumb();
    return (
        <>
            <SidebarProvider>
                <SideNavMain />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <NavBreadcrumb list={breadcrumbList}/>
                        </div>
                    </header>
                    <div className="flex p-5">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}