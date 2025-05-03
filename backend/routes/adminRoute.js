import express from "express";
import { addShop,loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";

const adminRouter = express.Router();

adminRouter.post("/add-shop", upload.single("image"), addShop);
adminRouter.post("/login",loginAdmin);


export default adminRouter;
