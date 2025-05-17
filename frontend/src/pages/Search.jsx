import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";
import LIstingItem from "../components/ui/LIstingItem";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);
  const [shops, setShops] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        setShowMore(false);
        const searchQuery = new URLSearchParams(location.search).toString();
        const { data } = await axios.get(
          `${backendUrl}/api/shop/get?${searchQuery}`
        );

        if (data.success) {
          if (data.totalCount > data.shops.length) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
          setShops(data.shops);
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error("Error fetching shops:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [location.search, backendUrl]);

  const onShowMoreClick = async () => {
    const numberOfListings = shops.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();

    try {
      const { data } = await axios.get(
        `${backendUrl}/api/shop/get?${searchQuery}`
      );
      if (data.shops && data.shops.length > 0) {
        setShops((prev) => [...prev, ...data.shops]);

        if (data.totalCount > startIndex + data.shops.length) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Error loading more shops:", error.message);
    }
  };

  return (
    <div>
      <div>
        <h1>Search Result:</h1>
        <div className="p-7 flex flex-wrap gap-9">
          {!loading && shops.length === 0 && (
            <p className="text-xl text-slate-700">No Search found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            shops &&
            shops.map((shop) => <LIstingItem key={shop._id} shop={shop} />)}
        </div>
        {showMore && (
          <button
            className="text-blue-500 hover:underline p-7 w-full"
            onClick={onShowMoreClick}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
