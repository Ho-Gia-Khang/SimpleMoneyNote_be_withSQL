import express from "express";
import validate from "../middlewares/validateResource";
import requireUser from "../middlewares/requireUser";
import {
    createNoteHandler,
    deleteNoteHandler,
    getNoteDetailHandler,
    getNotesHandler,
    updateNoteHandler,
} from "../controllers/NoteController";
import {
    createNoteSchema,
    getNoteParams,
    createNoteParams,
} from "../models/NoteModel";

const noteRouter = express.Router();

// static routes
noteRouter.get("/getAll", requireUser, getNotesHandler);

// dynamic routes
noteRouter.get(
    "/get/:noteId",
    [requireUser, validate(getNoteParams)],
    getNoteDetailHandler
);
noteRouter.post(
    "/create/:bookId",
    [requireUser, validate(createNoteParams), validate(createNoteSchema)],
    createNoteHandler
);
noteRouter.put(
    "/update/:noteId",
    [requireUser, validate(getNoteParams), validate(createNoteSchema)],
    updateNoteHandler
);
noteRouter.delete(
    "/delete/:noteId",
    [requireUser, validate(getNoteParams)],
    deleteNoteHandler
);

export default noteRouter;
