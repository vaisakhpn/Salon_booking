import React from "react";
import group from "../assets/group_profiles.png";
import book_arrow from "../assets/arrow_icon.svg";
import slider_img from "../assets/hero.png";

const Header = () => {
  return (
    <div className="flex flex-row md:flow-col flex-wrap bg-blue-500 rounded-lg px-6 md:px-10  lg:px-20">
      {/*---left---*/}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Glam Up
          <br />
          With Just a Click
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={group} alt="group_profile" />
          <p>
            Discover top-rated salons near you and book your beauty
            <br className="hidden sm:block" />
            appointment in seconds
          </p>
        </div>
        <div className="mt-3">
          <a
            href=""
            className="flex items-center gap-2  bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book Now <img className="w-3" src={book_arrow} alt="book" />
          </a>
        </div>
      </div>
      {/*---right---*/}
      <div className="md:w-1/2 relative flex items-center justify-center">
        <img
          className="w-full md:absolute max-h-96 rounded-lg "
          src={slider_img}
          alt="slider"
        />
      </div>
    </div>
  );
};

export default Header;
