import { useEffect, useState } from "react";
import Search from "./icons/Search";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ label }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className="sm:w-96 w-56 ">
      <form
        onSubmit={handleSubmit}
        className=" p-2 border border-blue-500  rounded-full flex items-center"
      >
        <div className="relative  flex w-full">
          <input
            type="text"
            className="bg-transparent pl-2  w-full focus:outline-none text-nowrap   "
            placeholder={label}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer ">
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
