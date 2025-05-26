import { useContext, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const ShopBooking = () => {
  const {
    sToken,
    bookings,
    getBookings,
    loadingShops,
    cancelBooking,
    completeBooking,
  } = useContext(ShopContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (sToken) {
      getBookings();
    }
  }, [sToken]);

  const renderSkeleton = () => {
    return [...Array(6)].map((_, index) => (
      <div
        key={index}
        className="flex flex-wrap justify-between max-sm:gap-5 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b animate-pulse"
      >
        <div className="h-4 bg-gray-200 rounded w-4 max-sm:hidden"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>
      <div className="bg-white border rounded text-sm  max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 gap-1 border-b">
          <p>#</p>
          <p>Customer</p>
          <p>Dat & Time</p>
          <p>Shop</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {loadingShops
          ? renderSkeleton()
          : bookings.reverse().map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-5 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />
                  <p>{item.userData.name}</p>
                </div>
                <p>
                  {slotDateFormat(item.slotDate)},{item.slotTime}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full bg-gray-200"
                    src={item.shopData.image}
                    alt=""
                  />
                  <p>{item.shopData.name}</p>
                </div>
                <p>
                  {currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
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
  );
};

export default ShopBooking;
