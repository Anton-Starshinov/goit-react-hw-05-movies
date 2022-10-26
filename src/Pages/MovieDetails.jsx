import { fetchMoviesDetails } from 'components/servise/API';
import { Loader } from 'components/Loader/Loader';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  MovieContainer,
  GanresContainer,
} from './PagesStyled/MovieDetailsStyled';

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [filmId, setFilmId] = useState(null);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const link = location.state?.from ?? '/';

  useEffect(() => {
    async function fetchMoviesId() {
      setLoader(true);
      try {
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
      {loading && <Loader />}
      {error && <p>Whoops, something went wrong</p>}
      <section>
        <NavLink to={link}>Go back</NavLink>
      </section>
      <MovieContainer>
        <div>
          <img src={`${posterURL}${poster_path}`} alt={title} width="300" />
        </div>

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
      </MovieContainer>
      <section>
        <h2>Additional Information</h2>
        <ul>
          <li>
            <Link to="Cast" state={{ from: link }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="Reviews" state={{ from: link }}>
              Reviews
            </Link>
          </li>
        </ul>
      </section>
      <Outlet />
    </div>
  );
};
