import { BookInput, CreateBookInput } from "./../models/BookModel";
import prisma from "./client";

export async function findBooks(userId: string) {
    try {
        const books = await prisma.book.findMany({
            where: {
                userId: userId,
            },
        });
        return books;
    } catch (err: any) {
        console.error(err);
    }
}

export async function findBook(bookId: string) {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });
        return book;
    } catch (error: any) {
        console.error(error);
    }
}

export async function createBook({
    input,
    userId,
}: {
    input: BookInput;
    userId: string;
}) {
    try {
        const newBook = await prisma.book.create({
            data: { userId, ...input },
        });
        return newBook;
    } catch (error: any) {
        console.error(error);
    }
}

export async function updateBook({
    bookId,
    input,
}: {
    bookId: string;
    input: BookInput;
}) {
    try {
        const updatedBook = await prisma.book.update({
            where: {
                id: bookId,
            },
            data: input,
        });
        return updatedBook;
    } catch (error: any) {
        console.error(error);
    }
}

export async function deleteBook(bookId: string) {
    try {
        await prisma.book.delete({
            where: {
                id: bookId,
            },
        });
    } catch (error: any) {
        console.error(error);
    }
}
