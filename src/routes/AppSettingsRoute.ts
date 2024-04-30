import express from "express";
import requireUser from "../middlewares/requireUser";
import {
    getAppSettingsHandler,
    updateAppSettingsHandler,
} from "../controllers/AppSettingsController";

const appSettingsRouter = express.Router();

// static routes
appSettingsRouter.get("/getOne", requireUser, getAppSettingsHandler);
appSettingsRouter.put("/update", requireUser, updateAppSettingsHandler);

export default appSettingsRouter;
