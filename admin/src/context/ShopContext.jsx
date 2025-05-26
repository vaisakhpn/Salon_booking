import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [loadingShops, setLoadingShops] = useState(true);
  const [sToken, setSToken] = useState(
    localStorage.getItem("sToken") ? localStorage.getItem("sToken") : ""
  );
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getBookings = async () => {
    try {
      setLoadingShops(true);
      const { data } = await axios.get(backendUrl + "/api/shop/bookings", {
        headers: { sToken },
      });
      if (data.success) {
        setBookings(data.bookings);
        setLoadingShops(false);
      } else {
        toast.error(data.message);
        setLoadingShops(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoadingShops(false);
    } finally {
      setLoadingShops(false);
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
      setLoadingShops(true);
      const { data } = await axios.get(backendUrl + "/api/shop/dashboard", {
        headers: { sToken },
      });

      if (data.success) {
        setDashData(data.dashData);
        setLoadingShops(false);
      } else {
        toast.error(data.message);
        setLoadingShops(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoadingShops(false);
    } finally {
      setLoadingShops(false);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/shop/profile", {
        headers: { sToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
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
    loadingShops,
    setDashData,
    setProfileData,
    getProfileData,
    profileData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
