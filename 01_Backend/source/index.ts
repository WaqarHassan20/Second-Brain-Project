import { ContentRouter } from "./routes/content";
import { BrainRouter } from "./routes/brain";
import { UserRouter } from "./routes/user";
import { DATABASE_KEY } from "./imports";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use((req, res, next) => {
  if (req.method !== "GET") {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/content", ContentRouter);
app.use("/api/v1/brain", BrainRouter);

(async () => {
  try {
    await mongoose.connect(DATABASE_KEY);
    console.log("DataBase is connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Error : ", error);
  }
})();
