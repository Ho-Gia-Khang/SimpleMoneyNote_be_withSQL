import express from "express";

import {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategoriesHandler,
    getCategoryDetailHandler,
    updateCategoryHandler,
} from "../controllers/CategoryController";
import requireUser from "../middlewares/requireUser";
import validate from "../middlewares/validateResource";
import { CategoryParams, createCategorySchema } from "../models/CategoryModel";

const categoryRouter = express.Router();

// static routes
categoryRouter.get("/getAll", requireUser, getCategoriesHandler);
categoryRouter.post(
    "/create",
    [requireUser, validate(createCategorySchema)],
    createCategoryHandler
);

// dynamic routes
categoryRouter.get(
    "/getOne/:categoryId",
    [requireUser, validate(CategoryParams)],
    getCategoryDetailHandler
);
categoryRouter.put(
    "/update/:categoryId",
    [requireUser, validate(CategoryParams)],
    updateCategoryHandler
);
categoryRouter.delete(
    "/delete/:categoryId",
    [requireUser, validate(CategoryParams)],
    deleteCategoryHandler
);

export default categoryRouter;
