import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../tmdb-api";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [params, setParams] = useSearchParams();

  const submitOwnerFilter = (newFilter) => {
    if (!newFilter) {
      return toast("Please enter a text", {
        style: {
          color: "#ffffff",
          backgroundColor: "#FF8C00",
        },
      });
    }
    setParams({ searchMovie: newFilter }); // Оновлення параметрів з використанням нового значення
  };

  useEffect(() => {
    async function startSearch() {
      try {
        setIsLoading(true);
        const searchRequest = params.get("searchMovie");
        if (!searchRequest) {
          // Якщо searchRequest пустий або не визначений, очистити список фільмів
          setMovies([]);
          return;
        }
        const data = await searchMovies(searchRequest);
        if (data.length === 0) {
          return toast("Sorry, nothing found.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#FF8C00",
            },
          });
        }
        setMovies(data);
      } catch (error) {
        setError(true);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }
    startSearch();
  }, [params]); // Зміна params впливає на виклик useEffect

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitOwnerFilter(searchText); // Виклик функції для оновлення параметрів пошуку
          setSearchText(""); // Очистка поля вводу після відправки форми
        }}
        className={css.formContainer}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={css.inputField}
        />
        <button type="submit" className={css.submitButton}>
          Search
        </button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </section>
  );
}
