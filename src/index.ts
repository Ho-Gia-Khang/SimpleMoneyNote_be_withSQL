import cors from "cors";
import express from "express";
import { deserializeUser } from "./middlewares/deserializeUser";
import userRouter from "./routes/UserRoutes";
import bookRouter from "./routes/BookRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(deserializeUser);

app.use("/user", userRouter);
app.use("/book", bookRouter);

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
