import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput, DeleteUserInput } from "../models/UserModel";
import { createUser, deleteUser, findUser } from "../services/UserService";

export const getUserhandler = async () => {};

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) => {
    try {
        const newUser = await createUser(req.body);

        return res.send(omit(newUser, "password"));
    } catch (e: any) {
        console.log(e);
        return res.status(409).send(e.message);
    }
};

export const updateUserHandler = async () => {};

export const deleteUserHandler = async (
    req: Request<DeleteUserInput["params"]>,
    res: Response
) => {
    try {
        const user = await findUser(req.params.userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        await deleteUser(req.params.userId);
        return res.sendStatus(200);
    } catch (e: any) {
        console.error(e);
        return res.status(409).send(e.message);
    }
};
