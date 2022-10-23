import { fetchMoviesDetails } from 'components/servise/API';
import { Loader } from 'components/Loader/Loader';
import { Outlet, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MovieContainer,
  GanresContainer,
} from './PagesStyled/MovieDetailsStyled';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [filmId, setFilmId] = useState(null);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMoviesId() {
      try {
        setLoader(true);
        const films = await fetchMoviesDetails(movieId);
        setFilmId(films);
      } catch (error) {
        setError({ error });
      } finally {
        setLoader(false);
      }
    }
    fetchMoviesId();
  }, [movieId]);

  if (!filmId) {
    return null;
  }

  const { poster_path, title, overview, genres, release_date, vote_average } =
    filmId;
  const posterURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div>
      <MovieContainer>
        <div>
          <img src={`${posterURL}${poster_path}`} alt={title} width="300" />
        </div>
        {loading && <Loader />}
        <div>
          <h1>
            {title} ({release_date.slice(0, 4)})
          </h1>
          <p>User score {Math.round(vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <GanresContainer>
            {genres.map(({ name, id }) => (
              <p key={id}>{name}</p>
            ))}
          </GanresContainer>
        </div>
        {error && <p>Whoops, something went wrong</p>}
      </MovieContainer>
      <section>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <Link to="Cast">Cast</Link>
          </li>
          <li>
            <Link to="Reviews">Reviews</Link>
          </li>
        </ul>
      </section>
      <Outlet />
    </div>
  );
};
