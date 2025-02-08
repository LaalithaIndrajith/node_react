import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export abstract class UserService {

    public static async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                email: true,
                username: true,
            }
        })

    }
}