import express from "express";
import requireUser from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import { appSettingsParams } from "../models/AppSettingsModel";
import {
    getAppSettingsHandler,
    updateAppSettingsHandler,
} from "../controllers/AppSettingsController";

const appSettingsRouter = express.Router();

appSettingsRouter.get(
    "/getOne/:userId",
    [requireUser, validate(appSettingsParams)],
    getAppSettingsHandler
);

appSettingsRouter.put("/update/:userId", requireUser, updateAppSettingsHandler);

export default appSettingsRouter;
