import { Request, Response } from "express";
import {
    createNote,
    deleteNote,
    findNote,
    findNotes,
    updateNote,
} from "../services/NoteService";
import {
    createNoteInput,
    getNoteDetailInput,
    getNotesInput,
} from "../models/NoteModel";
import { findBook } from "../services/BookService";
import { StatusCodes } from "http-status-codes";

export async function getNotesHandler(
    req: Request<getNotesInput["params"]>,
    res: Response
) {
    try {
        const bookId = req.params.bookId;
        const notes = await findNotes(bookId);
        if (!notes) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Book with id ${bookId} does not have any notes`);
        }

        const noteInfos = notes.map((note) => {
            return {
                id: note.id,
                amount: note.amount,
                type: note.type,
                date: note.date,
                description: note.description,
                categoryId: note.categoryId,
                walletId: note.walletId,
            };
        });
        return res.status(StatusCodes.OK).send(noteInfos);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function getNoteDetailHandler(
    req: Request<getNoteDetailInput["params"]>,
    res: Response
) {
    try {
        const noteId = req.params.noteId;
        const note = await findNote(noteId);
        if (!note) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Note with id ${noteId} not found`);
        }

        return res.status(StatusCodes.OK).send(note);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function createNoteHandler(
    req: Request<getNotesInput["params"], {}, createNoteInput["body"]>,
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

        const newNote = await createNote({
            bookId: bookId,
            userId: userId,
            input: req.body,
        });
        return res.status(StatusCodes.CREATED).send(newNote);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function updateNoteHandler(
    req: Request<getNoteDetailInput["params"], {}, createNoteInput["body"]>,
    res: Response
) {
    try {
        const noteId = req.params.noteId;
        const note = await findNote(noteId);
        if (!note) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Note with id ${noteId} not found`);
        }

        const updatedNote = await updateNote({
            noteId: noteId,
            input: req.body,
        });
        return res.status(StatusCodes.NOT_FOUND).send(updatedNote);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteNoteHandler(
    req: Request<getNoteDetailInput["params"]>,
    res: Response
) {
    try {
        const noteId = req.params.noteId;
        const note = await findNote(noteId);
        if (!note) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .send(`Note with id ${noteId} not found`);
        }

        await deleteNote(noteId);
        return res.sendStatus(StatusCodes.OK);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
