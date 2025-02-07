import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Link} from "react-router";
import {Fragment} from "react";

export type BreadcrumbEntry = {
    title: string;
    link: string;
}

type BreadcrumbProps = {
    list: BreadcrumbEntry[];
}
export function NavBreadcrumb({list}: BreadcrumbProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {list.length !== 0 && (
                    list.map((breadcrumbItem: BreadcrumbEntry, index: number) => (
                        <Fragment key={index}>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <Link to={breadcrumbItem.link}>{breadcrumbItem.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {(index !== list.length - 1) && <BreadcrumbSeparator className="hidden md:block" />}
                        </Fragment>
                    ))
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}