import express from "express";
import { PrismaClient } from '@prisma/client'
import {authentication, random} from "../helpers/auth-helper";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as process from "node:process";

const prisma = new PrismaClient()
dotenv.config();

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
            }
        })

        if(!user){
            res.sendStatus(400);
            return;
        }

        // Create JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.SECRET_STR || "default-secret-key-for-jwt-secret",
            { expiresIn: "2h" }
        );

        // res.status(200).json(user);
        res.status(200).json({
            status: "success",
            user,
            token
        });
        return;
    }catch (err){
        console.log(err);
        res.sendStatus(400);
        return;
    }


}