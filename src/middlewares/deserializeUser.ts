import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import { reIssueAccessToken } from "../services/SessionService";

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );

    const refreshToken = get(req, "headers.x_refresh") as string;

    if (!accessToken) {
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken({ refreshToken });

        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }
        const { decoded } = verifyJwt(newAccessToken as string);
        res.locals.user = decoded;

        return next();
    }

    return next();
};
