import express from "express";
import validate from "../middlewares/validateResource";
import requireUser from "../middlewares/requireUser";
import {
    createWalletHandler,
    deleteWallethandler,
    getWalletDetailHandler,
    getWalletsHandler,
    updateWalletHandler,
} from "../controllers/WalletController";
import { createWalletSchema, walletParams } from "../models/WalletModel";

const walletRouter = express.Router();

//static routes
walletRouter.get("/getAll", requireUser, getWalletsHandler);
walletRouter.post(
    "/create",
    [requireUser, validate(createWalletSchema)],
    createWalletHandler
);

// dynamic routes
walletRouter.get(
    "/getOne/:walletId",
    [requireUser, validate(walletParams)],
    getWalletDetailHandler
);
walletRouter.put(
    "/update/:walletId",
    [requireUser, validate(walletParams)],
    updateWalletHandler
);
walletRouter.delete(
    "/delete/:walletId",
    [requireUser, validate(walletParams)],
    deleteWallethandler
);

export default walletRouter;
