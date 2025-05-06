import express from "express";
import {
  addShop,
  allShops,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-shop", authAdmin, upload.single("image"), addShop);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-shops",authAdmin, allShops);

export default adminRouter;
