import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../models/UserModel";
import { createUser, deleteUser, findUser } from "../services/UserService";
import { StatusCodes } from "http-status-codes";

export const getUserhandler = async () => {};

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) => {
    try {
        const newUser = await createUser(
            omit(req.body, "passwordConfirmation")
        );

        res.locals.user = newUser;
        return res.status(StatusCodes.CREATED).send(omit(newUser, "password"));
    } catch (e: any) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

export const updateUserHandler = async () => {};

export const deleteUserHandler = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user.id;
        const user = await findUser(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send("User not found");
        }

        await deleteUser(userId);
        return res.sendStatus(StatusCodes.OK);
    } catch (e: any) {
        console.error(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
