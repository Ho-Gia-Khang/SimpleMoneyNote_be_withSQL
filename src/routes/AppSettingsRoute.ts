import express from "express";
import requireUser from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import {
    appSettingsParams,
    createAppSettingsSchema,
} from "../models/AppSettingsModel";
import {
    getAppSettingsHandler,
    updateAppSettingsHandler,
} from "../controllers/AppSettingsController";

const appSettingsRouter = express.Router();

appSettingsRouter.get(
    "/get/:userId",
    [requireUser, validate(appSettingsParams)],
    getAppSettingsHandler
);

appSettingsRouter.put(
    "/update/:userId",
    [requireUser, validate(createAppSettingsSchema)],
    updateAppSettingsHandler
);

export default appSettingsRouter;
