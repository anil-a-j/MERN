import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);

app.use("/", (req, res) => {
  res.send("server is running");
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
