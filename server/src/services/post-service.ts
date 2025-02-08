import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export abstract class PostService {

    public static async createPost(authorId: string, title: string, description:string ) {
        return prisma.post.create({
            data: { authorId, title, description }
        })
    }
}