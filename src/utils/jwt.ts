import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_PRIVATE_KEY as string;
const publicKey = process.env.JWT_PUBLIC_KEY as string;

export const signJwt = (
    payload: Object,
    options?: jwt.SignOptions | undefined
) => {
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: "RS256",
    });
};

export const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded: decoded,
        };
    } catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
};
