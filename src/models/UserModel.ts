import { TypeOf, object, string } from "zod";

export interface UserInput {
    email: string;
    password: string;
    comparePassword: (candidatePassword: string) => Promise<Boolean>;
}

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Please enter a valid email"),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password too short, please enter at least 6 characters"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required",
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

export type CreateUserInput = Omit<
    TypeOf<typeof createUserSchema>,
    "body.passwordConfirmation"
>;
