import express from "express";
import {PostService} from "../services/post-service";

export const createPost = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const { authorId, title, description } = req.body;
        const post = await PostService.createPost(authorId,title,description)
        res.status(200).json(post).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const getPostsByAuthorId  = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const authorId = req.params.authorId;
        if(!authorId){
            res.status(400).json({ error: "Invalid author" });
        }
        const posts =  await PostService.getPostsByAuthorId(authorId);
        res.status(200).json(posts).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

