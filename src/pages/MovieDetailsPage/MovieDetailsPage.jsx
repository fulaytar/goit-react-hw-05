import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailsMovie } from "../../tmdb-api";
import Loader from "../../components/Loader/Loader";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [release, setRelease] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
  const movie = getDetailsMovie(movieId);
  console.log(movie);

  useEffect(() => {
    async function handleClickMovie() {
      try {
        setLoading(true);
        const data = await getDetailsMovie(movieId);
        setMovies(data);
        setGenres(data.genres);
        setRelease(data.release_date.slice(0, 4));
        setRating(Math.round(data.vote_average * 10));
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickMovie();
  }, [movieId]);

  return (
    <section>
      {loading && <Loader />}
      {error && <NotFoundPage />}
      {!error && (
        <div className={css.container}>
          <img
            src={
              movies.poster_path
                ? `https://image.tmdb.org/t/p/w500${movies.poster_path}`
                : defaultImg
            }
            alt={movies.title}
            width={"300px"}
          />
          <div>
            <h2 className={css.title}>
              {movies.title} {`(${release})`}
            </h2>
            <p className={css.text}>User score: {rating}%</p>
            <h3 className={css.title}>Overview</h3>
            <p className={css.text}>{movies.overview}</p>
            <h3 className={css.title}>Genres</h3>
            <p className={css.text}>
              {genres.map((genr) => genr.name).join(" ")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
