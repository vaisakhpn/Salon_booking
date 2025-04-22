import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const TopShops = () => {
  const navigate = useNavigate();
  const { shops } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Salon to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of salon shops.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {shops.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/booking/${item._id}`)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50  " src={item.image} alt="shop_image" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                <p className="text-sm">Opened</p>
              </div>
              <p className="text-gray-900 text-md font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm font-light">₹{item.fees}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopShops;
