import cors from "cors";
import express from "express";
import userRouter from "./routes/UserRoutes";
import { deserializeUser } from "./middlewares/deserializeUser";

const app = express();

app.use(express.json());
app.use(cors());
app.use(deserializeUser);

app.use("/user", userRouter);

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
