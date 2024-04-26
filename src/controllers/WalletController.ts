import { Request, Response } from "express";
import {
    createWallet,
    deleteWallet,
    findWallet,
    findWallets,
    updateWallet,
} from "../services/WalletService";
import { createWalletInput, getWalletDetailInput } from "../models/WalletModel";

export async function getWalletsHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;

        const wallets = await findWallets(userId);
        if (!wallets) {
            return res
                .status(404)
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
        return res.send(walletInfos);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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

        return res.send(wallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
        return res.send(newWallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Wallet with id ${walletId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== wallet.userId) {
            return res.status(401).send("Unauthorized");
        }

        const updatedWallet = await updateWallet({ walletId, input: req.body });
        return res.send(updatedWallet);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Wallet with id ${walletId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== wallet.userId) {
            return res.status(401).send("Unauthorized");
        }

        await deleteWallet(walletId);
        return res.send("Wallet deleted successfully");
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
