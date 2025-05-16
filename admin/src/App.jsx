import React, { useContext } from "react";
import Login from "./pages/login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AddShop from "./pages/Admin/AddShop";
import ShopList from "./pages/Admin/ShopList";
import Allbooking from "./pages/Admin/Allbooking";
import { ShopContext } from "./context/ShopContext";

const App = () => {
  const { aToken } = useContext(AdminContext);

  const { sToken } = useContext(ShopContext);

  return aToken || sToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-bookings" element={<Allbooking />} />
          <Route path="/add-shop" element={<AddShop />} />
          <Route path="/shop-list" element={<ShopList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
