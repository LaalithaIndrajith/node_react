"use client"

import * as React from "react"
import {
    BookOpen,
    BookOpenCheck,
    LucideIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {Navbar} from "@/components/layout/navbar.tsx";
import {SideNavUser} from "@/components/layout/side-nav-user.tsx";

type NavItem = {
    title: string;
    url: string;
}

type SideNavBarProps = {
    navMain: NavMain[];
}

type NavMain = {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items: NavItem[];
}

const data: SideNavBarProps = {
    navMain: [
        {
            title: "Posts",
            url: "#",
            icon: BookOpen,
            isActive: true,
            items: [
                {
                    title: "New Post",
                    url: "new-post",
                },
                {
                    title: "All Posts",
                    url: "all-posts",
                },
                {
                    title: "My Posts",
                    url: "my-posts",
                },
            ],
        },
    ],

}

export function SideNavMain({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <BookOpenCheck className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Meedium</span>
                                    <span className="truncate text-xs">Online Blog</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Navbar items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <SideNavUser/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
