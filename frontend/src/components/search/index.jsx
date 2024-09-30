const Search = ({ setParams, params }) => {
  return (
    <div className="flex mt-7 justify-center">
      <input
        placeholder="Search movies..."
        onChange={(e) =>
          setParams({ ...params, search: e.target.value, page: 1 })
        }
        type="search"
        className="px-6 w-40 md:w-64  bg-gray-100 rounded-full focus:outline-none py-2 shadow-md shadow-gray-200"
      />
    </div>
  );
};

export default Search;
