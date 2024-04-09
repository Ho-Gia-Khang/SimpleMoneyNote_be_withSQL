import cors from "cors";
import express from "express";
import userRouter from "./routes/UserRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
