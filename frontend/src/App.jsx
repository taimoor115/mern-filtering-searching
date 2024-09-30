import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterGenre from "./components/FilterGenre/index.jsx";
import ListTable from "./components/ListTable";
import Search from "./components/Search";
import { headers } from "./lib/utils/constant.jsx";
import { getAllMovies } from "./store/features/movies/movies.service.js";

const App = () => {
  const { movies, genres } = useSelector((state) => {
    return state?.movies;
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    genre: "",
    sort: "",
    search: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllMovies({
        params,
      })
    );
  }, [params, dispatch]);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl capitalize mt-3">
        Movie app
      </h1>

      <Search params={params} setParams={setParams} />

      <FilterGenre params={params} setParams={setParams} genres={genres} />

      <ListTable competitorData={movies} headers={headers} />
    </div>
  );
};

export default App;
