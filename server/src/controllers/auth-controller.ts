import express from "express";
import { PrismaClient } from '@prisma/client'
import {authentication, random} from "../helpers/auth-helper";

const prisma = new PrismaClient()

// Register user for the authentication
export const register = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const { email, password, username } = req.body;

        // Validating inputs
        if (!email || !password || !username) {
            res.sendStatus(400);
            return;
        }

        // Checking for an existing email
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        })
        if (existingUser) {
            res.status(400).json({ error: "Email is already taken" });
            return;
        }

        // Create a new user with a hashed password.
        const salt = random();
        const user = await prisma.user.create({
            data:{
                email,
                username,
                authentication: {
                    salt,
                    password: authentication(salt, password),
                },
            },
        });

        res.status(200).json(user).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const login = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const { email, password } = req.body;

        // Verify the email and password
        if (!email || !password) {
            res.sendStatus(400);
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email: email },
            select:{
                id: true,
                email: true,
                username: true,
                authentication: {
                    select: {
                        password: true,
                        salt: true,
                        sessionToken: true,
                    },
                },
            }
        })

        if(!user){
            res.sendStatus(400);
            return;
        }

        // Hash the provided password with the salt
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            res.status(403).json({ error: "Invalid email or password" });
            return;
        }

        // Generate the session token
        const salt = random();
        const authenticationToken = authentication(salt,user.id)

        // Update user with new session token
        await prisma.user.update({
            where: { email },
            data: {
                authentication: {
                    update: {
                        sessionToken: authenticationToken,
                    },
                },
            },
        });

        // Sets cookie for authentication.
        res.cookie("LAALITHA-AUTH", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });

        res.status(200).json(user);
        return;
    }catch (err){
        console.log(err);
        res.sendStatus(400);
        return;
    }


}