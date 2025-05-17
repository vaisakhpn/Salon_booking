import React, { useContext } from "react";
import SearchBox from "../SearchBox";

import dropdown from "../../assets/dropdown_icon.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="top-0 relative left-0 w-full bg-header p-1 z-50 border-b border-b-gray-400 mb-2 py-4">
      <header className="flex flex-row justify-between items-center max-w-6xl mx-auto  p-4 ">
        <a className="text-black font-bold text-xl sm:text-3xl" href="/">
          Logo
        </a>
        <div className="flex items-center  text-sm">
          <SearchBox label="Glam up,Kochi.." />
        </div>
        <div>
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full object-cover"
                src={userData.image}
                alt="profile"
              />
              <img className="w-2.5" src={dropdown} alt="dropdown" />
              <div className="absolute top-0 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-bookings")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Bookings
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 p-1 sm:p-2 px-2 sm:px-5 rounded-full items-center hover:bg-blue-700 text-white text-sm sm:text-lg"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
