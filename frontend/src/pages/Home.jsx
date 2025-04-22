import React from "react";
import Header from "../components/Header";
import DiscoverPage from "../components/ui/HomePage/DiscoverPage";
import TopShops from "../components/ui/HomePage/TopShops";

const Home = () => {
  return (
    <div>
      <Header />
    
      <TopShops/>
      <DiscoverPage />
    </div>
  );
};

export default Home;
