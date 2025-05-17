import cron from "node-cron";
import moment from "moment";
import bookingModel from "../models/bookingModel.js";

// Run every minute
cron.schedule("* * * * *", async () => {
  try {
    const now = moment();

    const bookings = await bookingModel.find({
      isCompleted: false,
      cancelled: false,
    });

    for (const booking of bookings) {
      const bookingDate = booking.slotDate; // Expected format: "YYYY-MM-DD"
      const bookingTime = booking.slotTime; // Expected format: "HH:mm" or "HH:mm A"

      const bookingDateTime = moment(
        `${bookingDate} ${bookingTime}`,
        "YYYY-MM-DD HH:mm"
      );

      // Only proceed if the booking date is today
      if (bookingDateTime.isSame(now, "day")) {
        if (now.diff(bookingDateTime, "minutes") >= 10) {
          await bookingModel.findByIdAndUpdate(booking._id, {
            isCompleted: true,
          });
          console.log(`✅ Booking ${booking._id} marked as completed`);
        }
      }
    }
  } catch (error) {
    console.error("❌ Cron job error:", error);
  }
});
