import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyBookings = () => {
  const { backendUrl, token, getShopData } = useContext(AppContext);

  const [bookings, setBookings] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserBooking = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/bookings", {
        headers: { token },
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
        console.log(data.bookings);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-booking",
        { bookingId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserBooking();
        getShopData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const payOnline = async () => {
    toast.error("Currently unavailable");
  };

  useEffect(() => {
    if (token) {
      getUserBooking();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Bookings
      </p>

      <div>
        {bookings.slice(0, 5).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.shopData.image}
                alt="image"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.shopData.name}
              </p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.shopData.address.line1}</p>
              <p className="text-xs">{item.shopData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time :
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={payOnline}
                  disabled
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-500 hover:text-white transition-all duration-300  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelBooking(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel Booking
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Booking Cancelled
                </button>
              )}
              {item.isCompleted && (
                <button
                  disabled
                  className="text-green-500 sm:min-w-48 py-2 border border-green-500 rounded "
                >
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
