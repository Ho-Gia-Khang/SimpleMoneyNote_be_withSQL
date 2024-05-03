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
import { StatusCodes } from "http-status-codes";

export async function getBudgetHandler(
    req: Request<getBudgetDetailInput["params"]>,
    res: Response
) {
    try {
        const budgetId = req.params.budgetId;
        const budgets = await findBudget(budgetId);
        return res.status(StatusCodes.OK).send(budgets);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
                .status(StatusCodes.NOT_FOUND)
                .send(`Category with id ${categoryId} not found`);
        }

        const newBudget = await createBudget({
            categoryId: categoryId,
            input: req.body,
        });

        return res.status(StatusCodes.CREATED).send(newBudget);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Budget with id ${budgetId} not found`);
        }

        const updatedBudget = await updateBudget({
            budgetId: budgetId,
            input: req.body,
        });
        return res.status(StatusCodes.OK).send(updatedBudget);
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
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Budget with id ${budgetId} not found`);
        }

        await deleteBudget(budgetId);
        return res.send("Budget deleted successfully");
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
