import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        const trendingMovies = await getTrendingMovies();
        setTrendingMovies(trendingMovies);
      } catch (error) {
        setTrendingMovies([]);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovies();
  }, []);

  return (
    <section className={css.container}>
      <h1 className={css.title}>Trending Today</h1>
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
    </section>
  );
}
