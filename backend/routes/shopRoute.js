import express from "express";
import { loginShop, shopList } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get("/list", shopList);
shopRouter.post("/login", loginShop);

export default shopRouter;
