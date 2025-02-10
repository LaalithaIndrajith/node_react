import express from "express";
import {createPost, getPostsByAuthorId} from "../controllers/post-controller";

export default (router: express.Router):void => {
    router.post("/posts/new", createPost);
    router.get("/posts/:authorId", getPostsByAuthorId);
};