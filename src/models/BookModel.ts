import { object, string, TypeOf } from "zod";

export interface BookInput {
    name: string;
}

export const createBookSchema = object({
    body: object({
        name: string({
            required_error: "Book name is required",
        }),
    }),
});

export const bookParams = object({
    params: object({
        bookId: string({
            required_error: "Book ID is required",
        }),
    }),
});

export type GetBookDetailInput = TypeOf<typeof bookParams>;
export type CreateBookInput = TypeOf<typeof createBookSchema>;
