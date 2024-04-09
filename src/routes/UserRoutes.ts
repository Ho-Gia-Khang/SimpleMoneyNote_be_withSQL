import express from "express";
import {
    createUserHandler,
    deleteUserHandler,
} from "../controllers/UserController";

const userRouter = express.Router();

// static routes
userRouter.post("/create", createUserHandler);

// dynamic routes
userRouter.delete("/delete/:userId", deleteUserHandler);

export default userRouter;
