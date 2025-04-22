import React from "react";

import barber from "../../../assets/barber.png";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row  md:flow-col flex-wrap bg-blue-500 rounded-lg px-6 md:px-14  lg:px-3  my-16 mx-10 ">
      {/*---left---*/}
      <div className=" flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[6vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Salon
          <br />
          With 100+ Trusted Shops
        </p>

        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Create account
        </button>
      </div>
      {/*---right---*/}

      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative ">
        <img
          className="w-full absolute bottom-0  right-0 max-w-md"
          src={barber}
          alt="slider"
        />
      </div>
    </div>
  );
};

export default Banner;
