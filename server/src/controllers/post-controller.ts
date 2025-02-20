import express from "express";
import {PostService} from "../services/post-service";
import {AuthenticatedRequest} from "../interfaces/AuthenicatedRequest";

export const createPost = async (req: AuthenticatedRequest, res: express.Response): Promise<void> => {
    try{
        const { title, description } = req.body;

        if (!req.userId) {
            res.status(401).json({ error: "Unauthorized: User ID missing in request." });
            return;
        }

        const post = await PostService.createPost(req.userId,title,description)
        res.status(200).json(post).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const getPostsByAuthorId  = async (req: AuthenticatedRequest, res: express.Response): Promise<void> => {
    try{
        if (!req.userId) {
            res.status(401).json({ error: "Unauthorized: User ID missing in request." });
            return;
        }

        const posts =  await PostService.getPostsByAuthorId(req.userId);
        res.status(200).json(posts).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const getPostByPostId = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const postId = req.params.postId;
        if(!postId){
            res.status(400).json({ error: "Post ID is missing" });
            return;
        }
        const post =  await PostService.getPostByPostId(postId);
        res.status(200).json(post).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const updatePost = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const postId = req.params.postId;
        const { title, description } = req.body;
        const post = await PostService.updatePost(postId,title,description)
        res.status(200).json(post).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}

export const getAllPosts = async (req: express.Request, res: express.Response): Promise<void> => {
    try{
        const allPosts =  await PostService.getAllPosts();
        res.status(200).json(allPosts).end();
        return;

    }catch(err){
        console.log(err);
        res.sendStatus(400);
        return;
    }
}
