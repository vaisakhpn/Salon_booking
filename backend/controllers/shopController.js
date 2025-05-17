import shopModel from "../models/shopModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";

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

const bookingsShop = async (req, res) => {
  try {
    const shopId = req.shop.id;

    const bookings = await bookingModel.find({ shopId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookingComplete = async (req, res) => {
  try {
    const shopId = req.shop.id;
    const { bookingId } = req.body;
    const bookingData = await bookingModel.findById(bookingId);
    if (bookingData && bookingData.shopId === shopId) {
      await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const bookingCancel = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const bookingData = await bookingModel.findById(bookingId);
    if (!bookingData) {
      return res.json({ success: false, message: "Booking not found" });
    }

    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    const { shopId, slotDate, slotTime } = bookingData;

    // Find the shop
    const shopData = await shopModel.findById(shopId);
    if (!shopData) {
      return res.json({ success: false, message: "Shop not found" });
    }

    let slots_booked = shopData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }

    await shopModel.findByIdAndUpdate(shopId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const shopDashboard = async (req, res) => {
  try {
    const shopId = req.shop.id;

    const bookings = await bookingModel.find({ shopId });

    const uniqueCustomerIds = [...new Set(bookings.map((b) => b.userId))];
    const dashData = {
      bookings: bookings.length,
      customers: uniqueCustomerIds.length,
      latestBookings: bookings.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const shopProfile = async (req, res) => {
  try {
    const shopId = req.shop.id;
    const profileData = await shopModel.findById(shopId).select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateShopProfile = async (req, res) => {
  try {
    const shopId = req.shop.id;
    const { fees, address, available, phone } = req.body;
    await shopModel.findByIdAndUpdate(shopId, {
      fees,
      address,
      available,
      phone,
    });

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getShops = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = (req.query.searchTerm || "").trim();

    const searchQuery = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { "address.line1": { $regex: searchTerm, $options: "i" } },
        { "address.line2": { $regex: searchTerm, $options: "i" } },
      ],
    };

    const shops = await shopModel
      .find(searchQuery)
      .limit(limit)
      .skip(startIndex);
    const totalCount = await shopModel.countDocuments(searchQuery);

    return res.json({ success: true, shops, totalCount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  bookingCancel,
  shopList,
  loginShop,
  bookingsShop,
  bookingComplete,
  shopDashboard,
  updateShopProfile,
  shopProfile,
  getShops,
};
