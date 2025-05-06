import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const ShopList = () => {
  const { shops, aToken, getAllShops,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllShops();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium ">All Shops</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {shops.map((item, index) => (
          <div
            className="border border-indigo-200 hover:translate-y-[-10px] transition-all duration-500 rounded-xl max-w-56 overflow-hidden cursor-pointer group "
            key={index}
          >
            <img
              className="bg-indigo-50 w-56 h-40 object-cover "
              src={item.image}
              alt="shop image"
            />
            <div className="p-4 ">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <div className="flex mt-2 items-center gap-1 text-sm">
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopList;
