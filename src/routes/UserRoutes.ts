import express, { NextFunction, Request, Response } from "express";
import {
    createUserHandler,
    deleteUserHandler,
} from "../controllers/UserController";
import validate from "../middlewares/validateResource";
import { createUserSchema } from "../models/UserModel";
import {
    createUserSessionHandler,
    deleteSessionHandler,
} from "../controllers/SessionController";
import { createSessionSchema } from "../models/SessionModel";
import requireUser from "../middlewares/requireUser";
import { createAppSettingsHandler } from "../controllers/AppSettingsController";

const userRouter = express.Router();

// static routes
userRouter.post(
    "/create",
    validate(createUserSchema),
    (req: Request, res: Response, next: NextFunction) => {
        createUserHandler(req, res).then(() => {
            createAppSettingsHandler(req, res, next);
        });
    }
);
userRouter.post(
    "/login",
    validate(createSessionSchema),
    createUserSessionHandler
);

// dynamic routes
userRouter.delete("/logout/:userId", requireUser, deleteSessionHandler);
userRouter.delete("/delete/:userId", requireUser, deleteUserHandler);

export default userRouter;
