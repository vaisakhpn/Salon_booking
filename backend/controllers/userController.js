import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import shopModel from "../models/shopModel.js";
import bookingModel from "../models/bookingModel.js";
import moment from "moment";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, message: "User added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookingShop = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shopId, slotDate, slotTime } = req.body;

    const shopData = await shopModel.findById(shopId).select("-password");

    if (!shopData.available) {
      return res.json({ success: false, message: "Shop not available" });
    }

    let slots_booked = shopData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");

    delete shopData.slots_booked;
    const formattedDate = slotDate.replace(/_/g, "-"); // Convert "11_5_2025" → "11-5-2025"
    const bookingTime = moment(
      `${formattedDate} ${slotTime}`,
      "D-M-YYYY hh:mm A"
    ).toDate();

    const bookingData = {
      userId,
      shopId,
      userData,
      shopData,
      amount: shopData.fees,
      slotTime,
      slotDate,
      bookingTime,
      date: Date.now(),
    };

    const newBooking = new bookingModel(bookingData);

    await newBooking.save();

    await shopModel.findByIdAndUpdate(shopId, { slots_booked });

    res.json({ success: true, message: "booking completed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await bookingModel.find({ userId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.body;

    const bookingData = await bookingModel.findById(bookingId);

    if (bookingData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
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
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Check if user exists or create
    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        image: picture,
        googleId,
        // any default values you want
      });
    }

    // Create your own JWT (server signed)
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token: jwtToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Google login failed" });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookingShop,
  listBooking,
  cancelBooking,
  googleLogin,
};
