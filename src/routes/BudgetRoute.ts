import express from "express";
import {
    createBudgetHandler,
    deleteBudgetHandler,
    getBudgetHandler,
    updateBudgetHandler,
} from "../controllers/BudgetController";
import requireUser from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import {
    createBudgetParams,
    createBudgetSchema,
    getBudgetParams,
} from "../models/BudgetModel";

const budgetRouter = express.Router();

// dynamic routes
budgetRouter.post(
    "/create/:categoryId",
    [requireUser, validate(createBudgetSchema), validate(createBudgetParams)],
    createBudgetHandler
);
budgetRouter.get(
    "/getOne/:budgetId",
    [requireUser, validate(getBudgetParams)],
    getBudgetHandler
);
budgetRouter.put(
    "/update/:budgetId",
    [requireUser, validate(getBudgetParams)],
    updateBudgetHandler
);
budgetRouter.delete(
    "/delete/:budgetId",
    [requireUser, validate(getBudgetParams)],
    deleteBudgetHandler
);

export default budgetRouter;
