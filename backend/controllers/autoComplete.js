import bookingModel from "../models/bookingModel.js";

const checkForCompletedBookings = async () => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60000);

    const bookingsToComplete = await bookingModel.find({
      isCompleted: false,
      bookingTime: { $lte: thirtyMinutesAgo },
    });

    for (const booking of bookingsToComplete) {
      await bookingModel.findByIdAndUpdate(booking._id, {
        isCompleted: true,
        completedAt: new Date(), // optional: track when auto-completion happened
      });
      console.log(`Automatically completed booking ${booking._id}`);
    }
  } catch (error) {
    console.error("Error in booking completion check:", error);
  }
};

// Export both the function and an initialization method
export const startAutoCompletion = () => {
  // Run immediately on startup
  checkForCompletedBookings();
  // Then run every minute (60000 ms)
  setInterval(checkForCompletedBookings, 60000);
};

// Named export for manual testing if needed
export { checkForCompletedBookings };

// Default export (optional - choose one style)
export default {
  startAutoCompletion,
  checkForCompletedBookings,
};
