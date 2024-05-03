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
import { StatusCodes } from "http-status-codes";

export async function getCategoriesHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;
        const categories = await findCategories(userId);

        if (!categories) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`No categories for user Id ${userId} found`);
        }
        return res.status(StatusCodes.OK).send(categories);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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

        return res.status(StatusCodes.OK).send(category);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
        return res.status(StatusCodes.CREATED).send(newCategory);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
                .status(StatusCodes.NOT_FOUND)
                .send(`Category with id ${categoryId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== category.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        const updatedCategory = await updateCategory({
            categoryId: categoryId,
            input: req.body,
        });
        return res.status(StatusCodes.OK).send(updatedCategory);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
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
                .status(StatusCodes.NOT_FOUND)
                .send(`Category with id ${categoryId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== category.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        await deleteCategory(categoryId);
        return res.status(StatusCodes.OK).send("Category deleted successfully");
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
