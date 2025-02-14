import {PostCard} from "@/components/posts/post-card.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {TPostCard} from "@/pages/posts/my-posts.tsx";
import {AuthHelper} from "@/helpers/auth-helper.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function AllPostsPage() {
    const [posts, setPosts] = useState<TPostCard[]>([]);

    useEffect(()=>{
        const fetchPosts = async () => {
            try {
                const BEARER_TOKEN = AuthHelper.getAuthToken()
                const response = await axios.get(`${BACKEND_URL}/posts/all`, {
                    headers: {
                        'Authorization': `Bearer ${BEARER_TOKEN}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    },[])

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <h2 className="text-lg font-semibold">All Posts</h2>
                </div>
                {posts.length > 0 ? (
                    posts.map((post) => <PostCard key={post.id} {...post} />)
                ) : (
                    <p className="text-gray-500 text-center">No posts available.</p>
                )}

            </div>
        </>
    )
}