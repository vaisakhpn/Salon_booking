import React, { useContext } from "react";

import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { sToken, setSToken } = useContext(ShopContext);

  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }

    if (sToken) {
      setSToken("");
      localStorage.removeItem("sToken");
    }

    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs0">
        <img src="" className="w-36 sm:w-40 cursor-pointer" alt="logo" />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Shop"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-500 text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
