import express from "express";
import {
  bookingCancel,
  bookingComplete,
  bookingsShop,
  loginShop,
  shopDashboard,
  shopList,
  shopProfile,
  updateShopProfile,
  getShops,
} from "../controllers/shopController.js";
import authShop from "../middlewares/authShop.js";

const shopRouter = express.Router();

shopRouter.get("/list", shopList);
shopRouter.post("/login", loginShop);
shopRouter.get("/bookings", authShop, bookingsShop);
shopRouter.post("/complete-booking", authShop, bookingComplete);
shopRouter.post("/cancel-booking", authShop, bookingCancel);
shopRouter.get("/dashboard", authShop, shopDashboard);
shopRouter.get("/profile", authShop, shopProfile);
shopRouter.post("/update-profile", authShop, updateShopProfile);
shopRouter.get("/get", getShops);

export default shopRouter;
