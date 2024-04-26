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

export async function getNotesHandler(
    req: Request<getNotesInput["params"]>,
    res: Response
) {
    try {
        const bookId = req.params.bookId;
        const notes = await findNotes(bookId);
        if (!notes) {
            return res.send(`Book with id ${bookId} does not have any notes`);
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
        return res.send(noteInfos);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.send(`Note with id ${noteId} not found`);
        }

        return res.send(note);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Book with id ${bookId} not found`);
        }

        const userId = res.locals.user.id;

        const newNote = await createNote({
            bookId: bookId,
            userId: userId,
            input: req.body,
        });
        return res.send(newNote);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.send(`Note with id ${noteId} not found`);
        }

        const updatedNote = await updateNote({
            noteId: noteId,
            input: req.body,
        });
        return res.status(404).send(updatedNote);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
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
            return res.status(404).send(`Note with id ${noteId} not found`);
        }

        await deleteNote(noteId);
        return res.sendStatus(200);
    } catch (e: any) {
        console.error(e);
        return res.sendStatus(401);
    }
}
