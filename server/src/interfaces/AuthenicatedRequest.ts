import express from "express";

export interface AuthenticatedRequest extends express.Request {
    userId?: string;
}