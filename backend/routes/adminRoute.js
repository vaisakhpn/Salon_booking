import express from "express";
import { addShop } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-shop", upload.single("image"), addShop);

export default adminRouter;
