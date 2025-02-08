import express from "express";
import authRouter from "./auth-router";
import postRouter from "./post-router";

const router = express.Router();

export default (): express.Router => {
    authRouter(router);
    postRouter(router);
    return router;
};