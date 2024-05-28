import { Request, Response } from "express";
import {
    createWallet,
    deleteWallet,
    findWallet,
    findWallets,
    updateWallet,
} from "../services/WalletService";
import { createWalletInput, getWalletDetailInput } from "../models/WalletModel";
import { StatusCodes } from "http-status-codes";

export async function getWalletsHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;

        const wallets = await findWallets(userId);
        if (!wallets) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`User with id ${userId} does not have any wallets`);
        }

        const walletInfos = wallets.map((wallet) => {
            return {
                id: wallet.id,
                name: wallet.name,
                balance: wallet.balance,
                interest: wallet.interest,
            };
        });
        return res.status(StatusCodes.OK).send(walletInfos);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function getWalletDetailHandler(
    req: Request<getWalletDetailInput["params"]>,
    res: Response
) {
    try {
        const walletId = req.params.walletId;
        const wallet = await findWallet(walletId);
        if (!wallet) {
            return res.send(`Wallet with id ${walletId} not found`);
        }

        return res.status(StatusCodes.OK).send(wallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function createWalletHandler(
    req: Request<{}, {}, createWalletInput["body"]>,
    res: Response
) {
    try {
        const userId = res.locals.user.id;
        const newWallet = await createWallet({
            userId: userId,
            input: req.body,
        });
        return res.status(StatusCodes.CREATED).send(newWallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function updateWalletHandler(
    req: Request<getWalletDetailInput["params"], {}, createWalletInput["body"]>,
    res: Response
) {
    try {
        const walletId = req.params.walletId;
        const wallet = await findWallet(walletId);
        if (!wallet) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Wallet with id ${walletId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== wallet.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        const updatedWallet = await updateWallet({
            walletId: walletId,
            input: req.body,
        });
        return res.status(StatusCodes.OK).send(updatedWallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteWallethandler(
    req: Request<getWalletDetailInput["params"]>,
    res: Response
) {
    try {
        const walletId = req.params.walletId;
        const wallet = await findWallet(walletId);
        if (!wallet) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Wallet with id ${walletId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== wallet.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        await deleteWallet(walletId);
        return res.sendStatus(StatusCodes.OK);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
