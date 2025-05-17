import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectColudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import shopRouter from "./routes/shopRoute.js";
import userRouter from "./routes/userRoute.js";
import { startAutoCompletion } from "./controllers/autoComplete.js";

// app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectColudinary();

startAutoCompletion();
// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/shop", shopRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server Started", port));
