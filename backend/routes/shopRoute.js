import express from "express";
import { shopList } from "../controllers/shopController.js";

const shopRouter = express.Router();

shopRouter.get("/list", shopList);

export default shopRouter;
