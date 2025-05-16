import shopModel from "../models/shopModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bookingModel from "../models/bookingModel.js";
import cron from "node-cron";
import moment from "moment";

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
  cron.schedule("* * * * *", async () => {
    try {
      const now = moment();

      const bookings = await bookingModel.find({
        isCompleted: false,
        cancelled: false,
      });

      for (const booking of bookings) {
        const bookingDateTime = moment(
          `${booking.slotDate} ${booking.slotTime}`,
          "YYYY-MM-DD HH:mm"
        );

        // If 30 minutes have passed since the scheduled booking time
        if (now.diff(bookingDateTime, "minutes") >= 30) {
          await bookingModel.findByIdAndUpdate(booking._id, {
            isCompleted: true,
          });
          console.log("Booking completed");
        }
      }
    } catch (error) {
      console.error("Error auto-completing bookings:", error);
    }
  });
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

export {
  changeAvailablity,
  bookingCancel,
  shopList,
  loginShop,
  bookingsShop,
  bookingComplete,
};
