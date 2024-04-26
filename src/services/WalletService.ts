import { WalletInput } from "../models/WalletModel";
import { findAppSettings } from "./AppSettingsService";
import prisma from "./client";

export async function findWallets(userId: string) {
    try {
        const wallets = await prisma.wallet.findMany({
            where: {
                userId: userId,
            },
        });
        return wallets;
    } catch (err: any) {
        console.error(err);
    }
}

export async function findWallet(walletId: string) {
    try {
        const wallet = await prisma.wallet.findUnique({
            where: {
                id: walletId,
            },
        });
        return wallet;
    } catch (error: any) {
        console.error(error);
    }
}

export async function createWallet({
    userId,
    input,
}: {
    userId: string;
    input: WalletInput;
}) {
    try {
        const defaultSettings = await findAppSettings(userId);

        const defaultTheme = defaultSettings!.defaultTheme;
        const defaultCurrency = defaultSettings!.defaultCurrency;

        const newWallet = await prisma.wallet.create({
            data: {
                userId: userId,
                ...input,
                theme: defaultTheme,
                currency: defaultCurrency,
            },
        });
        return newWallet;
    } catch (error: any) {
        console.error(error);
    }
}

export async function updateWallet({
    walletId,
    input,
}: {
    walletId: string;
    input: WalletInput;
}) {
    try {
        const updatedWallet = await prisma.wallet.update({
            where: {
                id: walletId,
            },
            data: { ...input },
        });
        return updatedWallet;
    } catch (error: any) {
        console.error(error);
    }
}

export async function deleteWallet(walletId: string) {
    try {
        await prisma.wallet.delete({
            where: {
                id: walletId,
            },
        });
    } catch (error: any) {
        console.error(error);
    }
}
