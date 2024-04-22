import express from "express";
import validate from "../middlewares/validateResource";
import {
    createBookHandler,
    deleteBookHandler,
    getBookDetailHandler,
    getBooksHandler,
    updateBookHandler,
} from "../controllers/BookController";
import requireUser from "../middlewares/requireUser";
import { bookParams, createBookSchema } from "../models/BookModel";

const bookRouter = express.Router();

//static routes
bookRouter.get("/getAll", requireUser, getBooksHandler);
bookRouter.post(
    "/create",
    [requireUser, validate(createBookSchema)],
    createBookHandler
);

// dynamic routes
bookRouter.get(
    "/get/:bookId",
    [requireUser, validate(bookParams)],
    getBookDetailHandler
);
bookRouter.put(
    "/update/:bookId",
    [requireUser, validate(bookParams)],
    updateBookHandler
);
bookRouter.delete(
    "/delete/:bookId",
    [requireUser, validate(bookParams)],
    deleteBookHandler
);

export default bookRouter;
