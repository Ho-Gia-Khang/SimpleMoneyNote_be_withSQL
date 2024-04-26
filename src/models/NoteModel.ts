import { Type } from "@prisma/client";
import { date, number, object, string, TypeOf, z, ZodType } from "zod";

export interface NoteInput {
    amount: number;
    type?: Type;
    date?: Date;
    description?: string;
    currency?: string;
    categoryId?: string;
    walletId?: string;
}

const types: ZodType<Type> = z.enum(["income", "expense"]);

export const createNoteSchema = object({
    body: object({
        amount: number({
            required_error: "Note amount is required",
        }),
        type: types.optional(),
        date: date({}).optional(),
        description: string({}).optional(),
        currency: string({}).optional(),
        categoryId: string({}).optional(),
        walletId: string({}).optional(),
    }),
});

export const getNoteParams = object({
    params: object({
        noteId: string({
            required_error: "Note ID is required",
        }),
    }),
});

export const createNoteParams = object({
    params: object({
        bookId: string({
            required_error: "Book ID is required",
        }),
    }),
});

export type getNoteDetailInput = TypeOf<typeof getNoteParams>;
export type getNotesInput = TypeOf<typeof createNoteParams>;
export type createNoteInput = TypeOf<typeof createNoteSchema>;
