import { Request, Response } from "express";
import {
    createCategory,
    deleteCategory,
    findCategories,
    findCategory,
    updateCategory,
} from "../services/CategoryService";
import {
    createCategoryInput,
    getCategoryDetailInput,
} from "../models/CategoryModel";

export async function getCategoriesHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;
        const categories = await findCategories(userId);

        if (!categories) {
            return res
                .status(404)
                .send(`No categories for user Id ${userId} found`);
        }
        return res.send(categories);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function getCategoryDetailHandler(
    req: Request<getCategoryDetailInput["params"]>,
    res: Response
) {
    try {
        const categoryId = req.params.categoryId;
        const category = await findCategory(categoryId);
        if (!category) {
            return res.send(`Category with id ${categoryId} not found`);
        }

        return res.send(category);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function createCategoryHandler(
    req: Request<{}, {}, createCategoryInput["body"]>,
    res: Response
) {
    try {
        const userId = res.locals.user.id;
        const newCategory = await createCategory({
            userId: userId,
            input: req.body,
        });
        return res.send(newCategory);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function updateCategoryHandler(
    req: Request<getCategoryDetailInput["params"]>,
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

        const userId = res.locals.user.id;
        if (userId !== category.userId) {
            return res.status(401).send("Unauthorized");
        }

        const updatedCategory = await updateCategory({
            categoryId: categoryId,
            input: req.body,
        });
        return res.send(updatedCategory);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function deleteCategoryHandler(
    req: Request<getCategoryDetailInput["params"]>,
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

        const userId = res.locals.user.id;
        if (userId !== category.userId) {
            return res.status(401).send("Unauthorized");
        }

        await deleteCategory(categoryId);
        return res.status(200).send("Category deleted successfully");
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
