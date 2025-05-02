import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import verified from "../assets/verified_icon.svg";
import info_icon from "../assets/info_icon.svg";

const Booking = () => {
  const { shopId } = useParams();
  const { shops, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [shopInfo, setShopInfo] = useState(null);
  const [shopSlots, setShopSlots] = useState([]);
  const [slotIndex, setSlotindex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchShopInfo = async () => {
    const shopInfo = shops.find((shop) => shop._id === shopId);
    setShopInfo(shopInfo);
  };

  const getAvailableSlots = async () => {
    setShopSlots([]);

    //getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSolts = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        //add slot to array
        timeSolts.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        //increment current time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setShopSlots((prev) => [...prev, timeSolts]);
    }
  };

  useEffect(() => {
    fetchShopInfo();
  }, [shops, shopId]);

  useEffect(() => {
    getAvailableSlots();
  }, [shopInfo]);

  useEffect(() => {
    console.log(shopSlots);
  }, [shopSlots]);

  return (
    shopInfo && (
      <div>
        {/*-------Shop details----*/}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-blue-500 w-full object-cover sm:max-w-72 rounded-lg"
              src={shopInfo.image}
              alt="shop_image"
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {shopInfo.name} <img className="w-5" src={verified} alt="icon" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {shopInfo.address.line1}, {shopInfo.address.line2}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {shopInfo.phone}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={info_icon} alt="info_icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {shopInfo.about}
              </p>
            </div>
            <p className=" text-gray-500 font-medium mt-3">
              Charge:
              <span className="text-gray-700 ">
                {currencySymbol}
                {shopInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*-----Booking slots----*/}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {shopSlots.length &&
              shopSlots.map((item, index) => (
                <div
                  onClick={() => setSlotindex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-y-scroll mt-4 ">
            {shopSlots.length &&
              shopSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-blue-500 text-white font-light text-sm px-14 py-3 rounded-full my-6">
            Book the slot
          </button>
        </div>
      </div>
    )
  );
};

export default Booking;
