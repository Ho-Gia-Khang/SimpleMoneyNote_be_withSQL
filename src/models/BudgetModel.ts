import { object, number, string, TypeOf } from "zod";

export interface BudgetInput {
    name: string;
    limit: number;
}

export const createBudgetSchema = object({
    body: object({
        name: string({
            required_error: "Budget name is required",
        }),
        limit: number({
            required_error: "Budget limit is required",
        }),
    }),
});

export const createBudgetParams = object({
    params: object({
        categoryId: string({
            required_error: "Category ID is required",
        }),
    }),
});

export const getBudgetParams = object({
    params: object({
        budgetId: string({
            required_error: "Budget ID is required",
        }),
    }),
});

export type createBudgetInput = TypeOf<typeof createBudgetSchema>;
export type getBudgetDetailInput = TypeOf<typeof getBudgetParams>;
export type createBudgetParamsInput = TypeOf<typeof createBudgetParams>;
