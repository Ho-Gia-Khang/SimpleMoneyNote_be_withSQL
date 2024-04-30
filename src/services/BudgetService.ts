import { BudgetInput } from "../models/BudgetModel";
import prisma from "./client";

export async function findBudget(budgetId: string) {
    try {
        const budget = await prisma.budget.findUnique({
            where: {
                id: budgetId,
            },
        });
        return budget;
    } catch (err: any) {
        console.log(err);
    }
}

export async function createBudget({
    categoryId,
    input,
}: {
    categoryId: string;
    input: BudgetInput;
}) {
    try {
        const newBudget = await prisma.budget.create({
            data: {
                categoryId: categoryId,
                ...input,
            },
        });
        return newBudget;
    } catch (err: any) {
        console.log(err);
    }
}

export async function updateBudget({
    budgetId,
    input,
}: {
    budgetId: string;
    input: BudgetInput;
}) {
    try {
        const updatedBudget = await prisma.budget.update({
            where: {
                id: budgetId,
            },
            data: { ...input },
        });
        return updatedBudget;
    } catch (err: any) {
        console.log(err);
    }
}

export async function deleteBudget(budgetId: string) {
    try {
        await prisma.budget.delete({
            where: {
                id: budgetId,
            },
        });
    } catch (err: any) {
        console.log(err);
    }
}
