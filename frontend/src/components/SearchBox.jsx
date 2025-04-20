import Search from "./icons/Search";

const SearchBox = ({ label }) => {
  return (
    <div>
      <form className="bg-gray-200 p-2 rounded-full flex items-center">
        <div className="flex">
          <input
            type="text"
            className="bg-transparent pl-2 focus:outline-none text-nowrap w-44 sm:w-64 "
            placeholder={label}
          />
          <div className="cursor-pointer">
            <Search />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
