import { useEffect, useState } from "react";

const FilterGenre = ({ genres, params, setParams }) => {
  const [selectedGenres, setSelectedGenres] = useState("");

  const handleCheckboxChange = (e) => {
    console.log(e.target);

    const { value, checked } = e.target;

    if (checked) {
      setSelectedGenres((prev) => (prev ? `${prev},${value}` : value));
    } else {
      setSelectedGenres((prev) =>
        prev
          .split(",")
          .filter((genre) => genre !== value)
          .join(",")
      );
    }
  };

  useEffect(() => {
    setParams((prev) => ({ ...prev, genre: selectedGenres }));
  }, [selectedGenres, setParams]);

  return (
    <div className="flex flex-col gap-y-4 px-4 md:px-8">
      <h1 className="text-2xl font-bold">Select Movie Genres</h1>
      <form>
        <div className="flex gap-x-5">
          {genres &&
            genres?.map((genre, index) => (
              <div key={index} className="flex gap-x-1.5">
                <input
                  type="checkbox"
                  id={genre}
                  value={genre}
                  className="accent-black"
                  onChange={handleCheckboxChange}
                />
                <label className="text-sm font-semibold" htmlFor={genre}>
                  {genre}
                </label>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
};

export default FilterGenre;
