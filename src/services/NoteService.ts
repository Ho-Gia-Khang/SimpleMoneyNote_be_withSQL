import { NoteInput } from "../models/NoteModel";
import { findAppSettings } from "./AppSettingsService";
import prisma from "./client";

export async function findNotes(bookId: string) {
    try {
        const notes = await prisma.note.findMany({
            where: {
                bookId: bookId,
            },
        });
        return notes;
    } catch (err: any) {
        console.error(err);
    }
}

export async function findNote(noteId: string) {
    try {
        const note = await prisma.note.findUnique({
            where: {
                id: noteId,
            },
        });
        return note;
    } catch (error: any) {
        console.error(error);
    }
}

export async function createNote({
    bookId,
    userId,
    input,
}: {
    bookId: string;
    userId: string;
    input: NoteInput;
}) {
    try {
        const defaultSettings = await findAppSettings(userId);

        const defaultTheme = defaultSettings!.defaultTheme;
        const defaultCurrentcy = defaultSettings!.defaultCurrency;

        const newNote = await prisma.note.create({
            data: {
                bookId: bookId,
                theme: defaultTheme,
                currency: defaultCurrentcy,
                ...input,
            },
        });
        return newNote;
    } catch (error: any) {
        console.error(error);
    }
}

export async function updateNote({
    noteId,
    input,
}: {
    noteId: string;
    input: NoteInput;
}) {
    try {
        const updatedNote = await prisma.note.update({
            where: {
                id: noteId,
            },
            data: {
                ...input,
            },
        });
        return updatedNote;
    } catch (error: any) {
        console.error(error);
    }
}

export async function deleteNote(noteId: string) {
    try {
        await prisma.note.delete({
            where: {
                id: noteId,
            },
        });
    } catch (error: any) {
        console.error(error);
    }
}
