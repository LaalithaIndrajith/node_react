import express from "express";
import jwt from "jsonwebtoken";
import * as process from "node:process";
import {AuthenticatedRequest} from "../interfaces/AuthenicatedRequest";

export const isAuthenticated = async (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    try {
        const authHeader = req.header("authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send('Authentication failed: Missing or invalid token format.');
            return
        }
        const token =  authHeader.split(' ')[1];
        const SECRET = process.env.SECRET_STR || "default-secret-key-for-jwt-secret"
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send('Access denied: Invalid or expired token.')
                return;
            }

            req.userId = (decoded as { id: string }).id;
            next();
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return
    }
};