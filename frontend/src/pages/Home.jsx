import React from "react";
import Header from "../components/ui/HomePage/Header";
import DiscoverPage from "../components/ui/HomePage/DiscoverPage";
import TopShops from "../components/ui/HomePage/TopShops";
import Banner from "../components/ui/HomePage/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <TopShops />
      <DiscoverPage />
      <Banner />
    </div>
  );
};

export default Home;
