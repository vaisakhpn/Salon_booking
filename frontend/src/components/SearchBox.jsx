import Search from "./icons/Search";

const SearchBox = ({ label }) => {
  return (
    <div className="sm:w-96 w-56 ">
      <form className=" p-2 border border-blue-500  rounded-full flex items-center">
        <div className="relative  flex w-full">
          <input
            type="text"
            className="bg-transparent pl-2  focus:outline-none text-nowrap   "
            placeholder={label}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2  cursor-pointer ">
            <Search />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
