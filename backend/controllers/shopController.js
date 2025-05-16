import shopModel from "../models/shopModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const changeAvailablity = async (req, res) => {
  try {
    const { shopId } = req.body;

    const shopData = await shopModel.findById(shopId);

    await shopModel.findByIdAndUpdate(shopId, {
      available: !shopData.available,
    });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const shopList = async (req, res) => {
  try {
    const shops = await shopModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, shops });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginShop = async (req, res) => {
  try {
    const { email, password } = req.body;
    const shop = await shopModel.findOne({ email });

    if (!shop) {
      return res.json({ success: false, message: "Invalid credentials " });
    }

    const isMatch = await bcrypt.compare(password, shop.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: shop._id,
        },
        process.env.JWT_SECRET
      );

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials " });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailablity, shopList, loginShop };
