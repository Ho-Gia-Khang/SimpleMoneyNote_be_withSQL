import express from "express";

import {
    createCategoryHandler,
    getCategoriesHandler,
    getCategoryDetailHandler,
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
    "/get/:categoryId",
    [requireUser, validate(CategoryParams)],
    getCategoryDetailHandler
);
categoryRouter.put(
    "/update/:categoryId",
    [requireUser, validate(CategoryParams)],
    getCategoryDetailHandler
);
categoryRouter.delete(
    "/delete/:categoryId",
    [requireUser, validate(CategoryParams)],
    getCategoryDetailHandler
);

export default categoryRouter;
