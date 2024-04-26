import { number, object, string, TypeOf } from "zod";

export interface WalletInput {
    name: string;
    balance: number;
    theme?: string;
    currency?: string;
    interest?: number;
    description?: string;
}

export const createWalletSchema = object({
    body: object({
        name: string({
            required_error: "Wallet name is required",
        }),
        balance: number({
            required_error: "Wallet balance is required",
        }),
        theme: string().optional(),
        currency: string().optional(),
        interest: number().optional(),
        description: string().optional(),
    }),
});

export const walletParams = object({
    params: object({
        walletId: string({
            required_error: "Wallet ID is required",
        }),
    }),
});

export type getWalletDetailInput = TypeOf<typeof walletParams>;
export type createWalletInput = TypeOf<typeof createWalletSchema>;
