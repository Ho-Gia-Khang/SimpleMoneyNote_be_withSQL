import { object, string, TypeOf } from "zod";
import { types } from "../services/client";
import { Type } from "@prisma/client";

export interface CategoryInput {
    name: string;
    type?: Type;
    icon?: string;
}

export const createCategorySchema = object({
    body: object({
        name: string({
            required_error: "Category name is required",
        }),
        type: types.optional(),
        icon: string({}).optional(),
        budgetId: string({}).optional(),
    }),
});

export const CategoryParams = object({
    params: object({
        categoryId: string({
            required_error: "Category ID is required",
        }),
    }),
});

export type createCategoryInput = TypeOf<typeof createCategorySchema>;
export type getCategoryDetailInput = TypeOf<typeof CategoryParams>;
