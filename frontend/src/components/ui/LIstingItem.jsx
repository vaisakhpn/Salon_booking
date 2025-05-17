import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const LIstingItem = ({ shop }) => {
  const { currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-2  text-gray-900  ">
      <div className="w-full flex  overflow-x-auto gap-2 pt-5 px-3 sm:px-0 sm:grid sm:grid-cols-auto sm:gap-y-6 sm:overflow-visible">
        <div
          onClick={() => navigate(`/booking/${shop._id}`)}
          className="min-w-[200px] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] shadow-md hover:shadow-lg  transition-all duration-500"
        >
          <img
            className="bg-blue-50 w-full h-40 object-cover rounded-t-xl"
            src={shop.image}
            alt="shop_image"
          />

          <div className="p-4">
            <div
              className={`flex shops-center gap-2 ${
                shop.available ? "text-green-500" : "text-red-500"
              } text-sm text-center`}
            >
              <p
                className={`w-2 h-2 ${
                  shop.available ? "bg-green-500" : "bg-red-500"
                } rounded-full `}
              ></p>
              <p className="text-sm">
                {shop.available ? "Opened" : "Not Opened"}
              </p>
            </div>
            <p className="text-gray-900 text-md font-medium">{shop.name}</p>
            <p className="text-gray-500 text-sm font-light">
              {currencySymbol}
              {shop.fees}
            </p>
            <p className="text-gray-500 text-sm font-light">
              {shop.address.line1}, {shop.address.line2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LIstingItem;
