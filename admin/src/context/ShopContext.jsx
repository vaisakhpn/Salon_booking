import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [sToken, setSToken] = useState(
    localStorage.getItem("sToken") ? localStorage.getItem("sToken") : ""
  );
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/shop/bookings", {
        headers: { sToken },
      });
      if (data.success) {
        setBookings(data.bookings);
        console.log(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/shop/complete-booking",
        { bookingId },
        { headers: { sToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/shop/cancel-booking",
        { bookingId },
        { headers: { sToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/shop/dashboard", {
        headers: { sToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    sToken,
    setSToken,
    backendUrl,
    bookings,
    setBookings,
    getBookings,
    completeBooking,
    cancelBooking,
    getDashData,
    dashData,
    setDashData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
