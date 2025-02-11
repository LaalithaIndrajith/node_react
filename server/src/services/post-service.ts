import {PrismaClient} from "@prisma/client";
import {getPostsByAuthorId} from "../controllers/post-controller";

const prisma = new PrismaClient()

export abstract class PostService {

    public static async createPost(authorId: string, title: string, description:string ) {
        return prisma.post.create({
            data: { authorId, title, description }
        })
    }

    public static async getPostsByAuthorId( authorId: string ) {
        return prisma.post.findMany({
            where: {
                authorId
            },
            include: {
                author: { // Corrected to 'author' as per the schema
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        })
    }

    public static async getPostByPostId(postId:string ) {
        return prisma.post.findUnique({
            where: {
                id: postId
            },
        })
    }

    public static async updatePost(postId: string, title: string, description:string ) {
        return prisma.post.update({
            where:{
                id: postId
            },
            data: {
                title: title,
                description: description
            }
        })
    }
}

