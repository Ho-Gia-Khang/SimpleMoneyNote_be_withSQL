import { Request, Response } from "express";
import { validatePassword } from "../services/UserService";
import {
    createSession,
    findSessions,
    updateSession,
} from "../services/SessionService";
import { signJwt } from "../utils/jwt";

export async function createUserSessionHandler(req: Request, res: Response) {
    // validate user password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    //create a session
    const session = await createSession({ userId: user.id });

    //create an access token
    const accessToken = signJwt(
        { ...user, session: session.id },
        { expiresIn: "30m" }
    );

    //create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session.id },
        { expiresIn: "90d" }
    );

    res.locals.user = user;
    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;

    const sessions = await findSessions({ userId: userId, valid: true });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user.id;

    await updateSession({ query: userId, update: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}
