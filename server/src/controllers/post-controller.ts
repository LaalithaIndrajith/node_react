import express from "express";
import {UserService} from "../services/user-service";
import {PostService} from "../services/post-service";

export const createPost = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const { email, title, description } = req.body;
        const user =  await UserService.getUserByEmail(email);
        if (!user) {
            res.status(400).json({ error: "Something went wrong" });
            return;
        }
        const post = await PostService.createPost(user.id,title,description)
        res.status(200).json(post).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

