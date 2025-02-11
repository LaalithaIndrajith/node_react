import express from "express";
import {createPost, getPostByPostId, getPostsByAuthorId, updatePost} from "../controllers/post-controller";

export default (router: express.Router):void => {
    router.post("/posts/new", createPost);
    router.get("/posts/:authorId", getPostsByAuthorId);
    router.get("/posts/edit/:postId", getPostByPostId);
    router.put("/posts/edit/:postId", updatePost);
};