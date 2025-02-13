import express from "express";
import {createPost, getAllPosts, getPostByPostId, getPostsByAuthorId, updatePost} from "../controllers/post-controller";
import {isAuthenticated} from "../middlewares";

export default (router: express.Router):void => {
    router.get("/posts/all", isAuthenticated, getAllPosts);
    router.post("/posts/new", isAuthenticated, createPost);
    router.get("/posts/:authorId", isAuthenticated, getPostsByAuthorId);
    router.get("/posts/edit/:postId", isAuthenticated, getPostByPostId);
    router.put("/posts/edit/:postId", isAuthenticated, updatePost);

};