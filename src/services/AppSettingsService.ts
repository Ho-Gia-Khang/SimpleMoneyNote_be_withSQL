import { AppSettingsInput } from "../models/AppSettingsModel";
import prisma from "./client";

export async function findAppSettings(userId: string) {
    try {
        const appSettings = await prisma.appSettings.findUnique({
            where: {
                userId: userId,
            },
        });
        return appSettings;
    } catch (err: any) {
        console.error(err);
    }
}

export async function createAppSettings({
    userId,
    input,
}: {
    userId: string;
    input: AppSettingsInput;
}) {
    try {
        const newAppSettings = await prisma.appSettings.create({
            data: {
                userId: userId,
                ...input,
            },
        });
        return newAppSettings;
    } catch (error: any) {
        console.error(error);
    }
}

export async function updateAppSettings({
    AppSettingsId,
    input,
}: {
    AppSettingsId: string;
    input: AppSettingsInput;
}) {
    try {
        const updatedAppSettings = await prisma.appSettings.update({
            where: {
                id: AppSettingsId,
            },
            data: { ...input },
        });
        return updatedAppSettings;
    } catch (error: any) {
        console.error(error);
    }
}
