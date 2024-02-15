import express from "express";
import userRouter from "./routes/user.js";
import taskRoute from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URI],
  method:["GET","POST","DELETE","PUT"],
  credentials:true
}));

//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Working..");
});

//using error middleware
app.use(errorMiddleware);
