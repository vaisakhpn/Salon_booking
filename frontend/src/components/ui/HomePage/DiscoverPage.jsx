import React from "react";

const DiscoverPage = () => {
  return (
    <div className="flex items-center justify-center mt-16 mb-10 my-16 mx-10  ">
      <div className="flex flex-col items-start justify-center  gap-16 w-full">
        <p className="text-black font-light text-5xl">
          Discover Top-Rated Salons Near you
        </p>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-3 max-w-lg">
            <p className="text-3xl font-light text-black">
              Find the Perfect Match
            </p>
            <p className="text-md font-light text-black ">
              Search for salons based on your preferences, including
              location,service and rating
            </p>
          </div>
          <div className="flex flex-col gap-3 max-w-xl">
            <p className="text-3xl font-light text-black">
              Explore Diverse options
            </p>
            <p className="text-md font-light text-black ">
              Browse through a curated selection of top-rated saloons in your
              area, from hair salons to nail salons and spas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
