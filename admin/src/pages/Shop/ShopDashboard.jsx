import React, { useContext, useEffect } from "react";

import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { ShopContext } from "../../context/ShopContext";

const Dashboard = () => {
  const { dashData, sToken, getDashData, cancelBooking,completeBooking } =
    useContext(ShopContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (sToken) {
      getDashData();
    }
  }, [sToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.bookings}
              </p>
              <p className="text-gray-400 ">Bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="14" src={assets.customers_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.customers}
              </p>
              <p className="text-gray-400 ">Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white ">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p>Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0 ">
            {dashData.latestBookings.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.shopData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.shopData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                 {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelBooking(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeBooking(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
