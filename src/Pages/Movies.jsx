import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { fethchMoviesQuery } from 'components/servise/API';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import {
  FormStyled,
  InputStyled,
  ButtonStyled,
} from './PagesStyled/MoviesStayled';

export const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams({});
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  const [queryFilms, setQueryFilms] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = evt => {
    setSearchQuery(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    setSearchParams({ query: searchQuery });
    setSearchQuery('');
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchQueryFilms() {
      try {
        setLoader(true);
        const queryMovies = await fethchMoviesQuery(query);
        setQueryFilms(queryMovies.results);
      } catch (error) {
        setError({ error });
      } finally {
        setLoader(false);
      }
    }
    fetchQueryFilms();
  }, [query]);

  return (
    <div>
      <FormStyled onSubmit={handleSubmit}>
        <InputStyled
          type="text"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          onChange={handleChange}
        />
        <ButtonStyled type="submit">Search</ButtonStyled>
      </FormStyled>
      {loading && <Loader />}
      {error && <p>Whoops, something went wrong</p>}
      <div>
        {queryFilms.length !== 0 && (
          <ul>
            {queryFilms.map(({ id, title }) => (
              <li key={id}>
                <Link to={`/Movies/${id}`} state={{ from: location }}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Outlet />
    </div>
  );
};
