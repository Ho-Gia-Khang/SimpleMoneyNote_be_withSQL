import { NextFunction, Request, Response } from "express";
import { createAppSettingsInput } from "../models/AppSettingsModel";
import {
    createAppSettings,
    findAppSettings,
    updateAppSettings,
} from "../services/AppSettingsService";

export async function getAppSettingsHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;
        const appSettings = await findAppSettings(userId);
        if (!appSettings) {
            return res.send(
                `App settings for user with id ${userId} not found`
            );
        }
        return res.send(appSettings);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function createAppSettingsHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = res.locals.user.id;
        await createAppSettings({
            userId: userId,
            input: {},
        });
        return next();
    } catch (e: any) {
        console.error(e);
        return next(e);
    }
}

export async function updateAppSettingsHandler(
    req: Request<{}, {}, createAppSettingsInput["body"]>,
    res: Response
) {
    try {
        const userId = res.locals.user.id;
        const appSettings = await findAppSettings(userId);
        if (!appSettings) {
            return res.send(
                `App settings for user with id ${userId} not found`
            );
        }

        const updatedAppSettings = await updateAppSettings({
            AppSettingsId: appSettings.id,
            input: req.body,
        });
        return res.send(updatedAppSettings);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
