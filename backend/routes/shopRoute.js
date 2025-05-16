import express from "express";
import {
    bookingCancel,
    bookingComplete,
  bookingsShop,
  loginShop,
  shopList,
} from "../controllers/shopController.js";
import authShop from "../middlewares/authShop.js";

const shopRouter = express.Router();

shopRouter.get("/list", shopList);
shopRouter.post("/login", loginShop);
shopRouter.get("/bookings", authShop, bookingsShop);
shopRouter.post("/complete-booking", authShop, bookingComplete);
shopRouter.post("/cancel-booking", authShop, bookingCancel);

export default shopRouter;
