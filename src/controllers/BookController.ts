import { Request, Response } from "express";
import {
    createBook,
    findBook,
    findBooks,
    updateBook,
    deleteBook,
} from "../services/BookService";
import { CreateBookInput, GetBookDetailInput } from "../models/BookModel";
import { StatusCodes } from "http-status-codes";

export async function getBooksHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;

        const books = await findBooks(userId);
        if (!books) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`User with id ${userId} does not have any books`);
        }

        const bookInfos = books.map((book) => {
            return {
                id: book.id,
                name: book.name,
            };
        });
        return res.status(StatusCodes.OK).send(bookInfos);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function getBookDetailHandler(
    req: Request<GetBookDetailInput["params"]>,
    res: Response
) {
    try {
        const bookId = req.params.bookId;
        const book = await findBook(bookId);
        if (!book) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Book with id ${bookId} not found`);
        }

        return res.status(StatusCodes.OK).send(book);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function createBookHandler(
    req: Request<{}, {}, CreateBookInput["body"]>,
    res: Response
) {
    try {
        const userId = res.locals.user.id;
        const newBook = await createBook({ input: req.body, userId: userId });
        return res.status(StatusCodes.CREATED).send(newBook);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function updateBookHandler(
    req: Request<GetBookDetailInput["params"]>,
    res: Response
) {
    try {
        const bookId = req.params.bookId;
        const book = await findBook(bookId);
        if (!book) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Book with id ${bookId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== book.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        const updatedBook = await updateBook({
            bookId: bookId,
            input: req.body,
        });
        return res.status(StatusCodes.OK).send(updatedBook);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteBookHandler(
    req: Request<GetBookDetailInput["params"]>,
    res: Response
) {
    try {
        const bookId = req.params.bookId;
        const book = await findBook(bookId);
        if (!book) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Book with id ${bookId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== book.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized");
        }

        await deleteBook(bookId);
        return res.sendStatus(StatusCodes.OK);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
