import { Request, Response } from "express";
import { validatePassword } from "../services/UserService";
import {
    createSession,
    deleteSessions,
    findSessions,
    updateSession,
} from "../services/SessionService";
import { signJwt } from "../utils/jwt";
import { StatusCodes } from "http-status-codes";

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate user password
    const user = await validatePassword({
        email: req.body.email,
        password: req.body.password,
    });

    if (!user) {
        return res
            .status(StatusCodes.NOT_ACCEPTABLE)
            .send("Invalid email or password");
    }

    //create a session
    const session = await createSession({ userId: user.id });

    //create an access token
    const accessToken = signJwt(
        { ...user, session: session.id },
        { expiresIn: "15m" }
    );

    //create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session.id },
        { expiresIn: "90d" }
    );

    res.locals.user = user;
    return res.status(StatusCodes.OK).send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;

    const sessions = await findSessions({ userId: userId, valid: true });

    return res.status(StatusCodes.OK).send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;

    const sessions = await updateSession({ query: userId, update: false });

    if (sessions) {
        await deleteSessions({ userId: userId, valid: false });
    }

    return res.status(StatusCodes.OK).send({
        accessToken: null,
        refreshToken: null,
    });
}
