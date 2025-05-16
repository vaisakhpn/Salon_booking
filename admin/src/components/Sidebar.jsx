import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { sToken } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-gray-600">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5  px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img className="w-6" src={assets.home_icon} alt="home" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/all-bookings"}
          >
            <img className="w-6" src={assets.appointment_icon} alt="booking" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5  px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/add-shop"}
          >
            <img className="w-6" src={assets.add_icon} alt="Add" />
            <p className="hidden md:block">Add Shop</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5  px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/shop-list"}
          >
            <img className="w-6" src={assets.shop_icon} alt="people" />
            <p className="hidden md:block">Shop list</p>
          </NavLink>
        </ul>
      )}
      {sToken && (
        <ul className="text-gray-600">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5  px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/shop-dashboard"}
          >
            <img className="w-6" src={assets.home_icon} alt="home" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/shop-bookings"}
          >
            <img className="w-6" src={assets.appointment_icon} alt="booking" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5  px-3 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-500" : ""
              }`
            }
            to={"/shop-profile"}
          >
            <img className="w-6" src={assets.shop_icon} alt="people" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
