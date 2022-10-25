import { fetchMoviesReviews } from 'components/servise/API';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviewsId() {
      setLoader(true);
      try {
        const reviewsId = await fetchMoviesReviews(movieId);
        setReviews(reviewsId.results);
      } catch (error) {
        setError({ error });
      } finally {
        setLoader(false);
      }
    }
    fetchReviewsId();
  }, [movieId]);

  if (!reviews) {
    return null;
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Whoops, something went wrong</p>}
      <ul>
        {reviews.length === 0 ? (
          <p>We don't have any reviews for this movie.</p>
        ) : (
          reviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
