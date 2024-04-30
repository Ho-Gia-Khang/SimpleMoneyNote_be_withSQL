import { CategoryInput } from "../models/CategoryModel";
import prisma from "./client";

export async function findCategories(userId: string) {
    try {
        const categories = await prisma.category.findMany({
            where: {
                userId: userId,
            },
        });
        return categories;
    } catch (err: any) {
        console.log(err);
    }
}

export async function findCategory(categoryId: string) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        return category;
    } catch (err: any) {
        console.log(err);
    }
}

export async function createCategory({
    userId,
    input,
}: {
    userId: string;
    input: CategoryInput;
}) {
    try {
        const newCategory = await prisma.category.create({
            data: {
                userId: userId,
                ...input,
            },
        });
        return newCategory;
    } catch (err: any) {
        console.log(err);
    }
}

export async function updateCategory({
    categoryId,
    input,
}: {
    categoryId: string;
    input: CategoryInput;
}) {
    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: { ...input },
        });
        return updatedCategory;
    } catch (err: any) {
        console.log(err);
    }
}

export async function deleteCategory(categoryId: string) {
    try {
        await prisma.category.delete({
            where: {
                id: categoryId,
            },
        });
    } catch (err: any) {
        console.log(err);
    }
}
