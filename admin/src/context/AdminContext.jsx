import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [shops, setShops] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getAllShops = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-shops",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setShops(data.shops);
        console.log(data.shops);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (shopId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { shopId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);

        getAllShops();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/bookings", {
        headers: { aToken },
      });

      if (data.success) {
        console.log(data.bookings);
        setBookings(data.bookings);
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
        backendUrl + "/api/admin/cancel-booking",
        { bookingId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
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
    aToken,
    setAToken,
    backendUrl,
    shops,
    getAllShops,
    changeAvailability,
    bookings,
    setBookings,
    getAllBookings,
    cancelBooking,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
