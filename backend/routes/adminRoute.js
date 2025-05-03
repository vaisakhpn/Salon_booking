import express from "express";
import { addShop, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-shop", authAdmin, upload.single("image"), addShop);
adminRouter.post("/login", loginAdmin);

export default adminRouter;
