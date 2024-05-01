import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getMovieReviews } from "../../tmdb-api";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleClickReviews() {
      try {
        setLoading(true);
        const data = await getMovieReviews(movieId);
        if (!data.results.length) {
          return setError(true);
        }
        setReviews((prevReview) => {
          return reviews.length > 0
            ? [...prevReview, ...data.results]
            : data.results;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    handleClickReviews();
  }, [movieId]);
  return (
    <div>
      {loading && <Loader />}
      {reviews.length > 0 && (
        <ul className={css.reviewsList}>
          {reviews.map((item) => (
            <li className={css.reviewItem} key={item.id}>
              <h3 className={css.authorReviewName}>{item.author}</h3>
              <p className={css.textReview}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p className={css.error}>Sorry, there is no data</p>}
    </div>
  );
}
