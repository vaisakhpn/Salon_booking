import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import shopModel from "../models/shopModel.js";

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

export { addShop };
