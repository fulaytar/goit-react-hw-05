import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const fetchTrendingMovies = async () => {
    try {
      const trendingMovies = await getTrendingMovies();
      return trendingMovies;
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  };

  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then((movies) => setTrendingMovies(movies));
  }, []);

  return (
    <>
      <h1 className={css.title}>Trending Today</h1>
      <MovieList movies={trendingMovies} />
    </>
  );
}
