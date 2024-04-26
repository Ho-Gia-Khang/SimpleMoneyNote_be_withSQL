import cors from "cors";
import express from "express";
import { deserializeUser } from "./middlewares/deserializeUser";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";
import walletRouter from "./routes/WallteRoutes";
import appSettingsRouter from "./routes/AppSettingsRoute";
import noteRouter from "./routes/NoteRoute";

const app = express();

app.use(express.json());
app.use(cors());
app.use(deserializeUser);

app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/wallet", walletRouter);
app.use("/appSettings", appSettingsRouter);
app.use("/note", noteRouter);

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
