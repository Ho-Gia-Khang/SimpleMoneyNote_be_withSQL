import { Request, Response } from "express";
import {
    createBook,
    findBook,
    findBooks,
    updateBook,
    deleteBook,
} from "../services/BookService";
import { CreateBookInput, GetBookDetailInput } from "../models/BookModel";

export async function getBooksHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user.id;

        const books = await findBooks(userId);
        if (!books) {
            return res
                .status(404)
                .send(`User with id ${userId} does not have any books`);
        }

        const bookInfo = books.map((book) => {
            return {
                id: book.id,
                name: book.name,
            };
        });
        return res.send(bookInfo);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function getBookDetailHandler(
    req: Request<GetBookDetailInput["params"]>,
    res: Response
) {
    try {
        const user = res.locals.user;
        if (!user) {
            return res.sendStatus(401);
        }

        const bookId = req.params.bookId;
        const book = await findBook(bookId);
        if (!book) {
            return res.send(`Book with id ${bookId} not found`);
        }

        return res.send(book);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}

export async function createBookHandler(
    req: Request<{}, {}, CreateBookInput["body"]>,
    res: Response
) {
    try {
        const userId = res.locals.user.id;
        const newBook = await createBook({ input: req.body, userId: userId });
        return res.send(newBook);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Book with id ${bookId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== book.userId) {
            return res.status(403).send("Unauthorized");
        }

        const updatedBook = await updateBook({
            bookId: bookId,
            input: req.body,
        });
        return res.send(updatedBook);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Book with id ${bookId} not found`);
        }

        const userId = res.locals.user.id;
        if (userId !== book.userId) {
            return res.status(403).send("Unauthorized");
        }

        await deleteBook(bookId);
        return res.sendStatus(200);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
