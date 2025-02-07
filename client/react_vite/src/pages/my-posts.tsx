import {useBreadcrumb} from "@/context/BreadcrumbContext.tsx";
import {useEffect} from "react";


export function MyPostsPage(){
    const { setBreadcrumbList } = useBreadcrumb();

    useEffect(() => {
        setBreadcrumbList([
            { title: "Home", link: "/home" },
            { title: "My Posts", link: "/home/my-posts" },
        ]);
    }, []);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className={'text-4xl'}> My Posts</div>
            </div>
        </>
    )
}