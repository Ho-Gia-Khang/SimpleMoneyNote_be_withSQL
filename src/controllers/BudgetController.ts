import { Request, Response } from "express";
import {
    createBudgetInput,
    createBudgetParamsInput,
    getBudgetDetailInput,
} from "../models/BudgetModel";
import {
    createBudget,
    deleteBudget,
    findBudget,
    updateBudget,
} from "../services/BudgetService";
import { findCategory } from "../services/CategoryService";

export async function getBudgetHandler(
    req: Request<getBudgetDetailInput["params"]>,
    res: Response
) {
    try {
        const budgetId = req.params.budgetId;
        const budgets = await findBudget(budgetId);
        return res.send(budgets);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function createBudgetHandler(
    req: Request<
        createBudgetParamsInput["params"],
        {},
        createBudgetInput["body"]
    >,
    res: Response
) {
    try {
        const categoryId = req.params.categoryId;
        const category = await findCategory(categoryId);
        if (!category) {
            return res
                .status(404)
                .send(`Category with id ${categoryId} not found`);
        }

        const newBudget = await createBudget({
            categoryId: categoryId,
            input: req.body,
        });

        return res.send(newBudget);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function updateBudgetHandler(
    req: Request<getBudgetDetailInput["params"]>,
    res: Response
) {
    try {
        const budgetId = req.params.budgetId;
        const budget = await findBudget(budgetId);
        if (!budget) {
            return res.status(404).send(`Budget with id ${budgetId} not found`);
        }

        const updatedBudget = await updateBudget({
            budgetId: budgetId,
            input: req.body,
        });
        return res.send(updatedBudget);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function deleteBudgetHandler(
    req: Request<getBudgetDetailInput["params"]>,
    res: Response
) {
    try {
        const budgetId = req.params.budgetId;
        const budget = await findBudget(budgetId);
        if (!budget) {
            return res.status(404).send(`Budget with id ${budgetId} not found`);
        }

        await deleteBudget(budgetId);
        return res.send("Budget deleted successfully");
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
