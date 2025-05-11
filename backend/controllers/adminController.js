import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import shopModel from "../models/shopModel.js";
import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";

//API FOR ADDING SHOP
const addShop = async (req, res) => {
  try {
    const { name, email, phone, password, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !phone || !password || !about || !fees || !address) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const shopData = {
      name,
      email,
      phone,
      image: imageUrl,
      password: hashedPassword,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newShop = new shopModel(shopData);
    await newShop.save();

    res.json({ success: true, message: "Shop added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const allShops = async (req, res) => {
  try {
    const shops = await shopModel.find({}).select("-password");
    res.json({ success: true, shops });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookingAdmin = async (req, res) => {
  try {
    const bookings = await bookingModel.find({});
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const bookingCancel = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingData = await bookingModel.findById(bookingId);

    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    const { shopId, slotDate, slotTime } = bookingData;

    const shopData = await shopModel.findById(shopId);

    let slots_booked = shopData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await shopModel.findByIdAndUpdate(shopId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminDashboard = async (req, res) => {
  try {
    const shops = await shopModel.find({});

    const users = await userModel.find({});

    const bookings = await bookingModel.find({});

    const dashData = {
      shops: shops.length,
      bookings: bookings.length,
      customers: users.length,
      latestBookings: bookings.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addShop, loginAdmin, allShops, bookingAdmin, bookingCancel,adminDashboard };
