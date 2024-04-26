import { number, object, string, TypeOf } from "zod";

export interface AppSettingsInput {
    defaultTheme?: string;
    defaultCurrency?: string;
    language?: string;
    expenseColor?: string;
    incomeColor?: string;
}

export const createAppSettingsSchema = object({
    body: object({
        defaultTheme: string().optional(),
        defaultCurrency: string().optional(),
        language: string().optional(),
        expenseColor: string().optional(),
        incomeColor: string().optional(),
    }),
});

export const appSettingsParams = object({
    params: object({
        UserId: string({
            required_error: "User ID is required",
        }),
    }),
});

export type createAppSettingsInput = TypeOf<typeof createAppSettingsSchema>;
