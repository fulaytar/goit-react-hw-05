import { useParams } from "react-router-dom";
import { useState } from "react";
import { getMovieCast } from "../../tmdb-api";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

export default function MovieCast() {
  const { movieId } = useParams();

  const defaultImg =
    "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true);
        const data = await getMovieCast(movieId);
        console.log(data);
        if (!data.cast.length) {
          toast(
            "На жаль, ми зараз не маємо даних про акторів цього фільму. Будь ласка спробуйте пізніше",
            {
              style: {
                color: "#ffffff",
                backgroundColor: "#FF8C00",
              },
            }
          );
          return;
        }
        // Відбір із масиву учасників фільму тільки акторів
        const onlyActors = data.cast.filter(
          (actor) => actor.known_for_department === "Acting"
        );
        setActors((prevActors) => {
          return actors.length > 0
            ? [...prevActors, ...onlyActors]
            : onlyActors;
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {actors.length > 0 && !error && (
        <ul className={css.list}>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
                width="191px"
                height="285px"
              />
              <div>
                <p className={css.actorName}>{actor.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className={css.error}>На жаль, сталася помилка! Спробуйте перезавантажити цю сторінку!</p>
      )}
      <Toaster position="top-right" containerStyle={{ zIndex: 99999999 }} />
    </div>
  );
}
