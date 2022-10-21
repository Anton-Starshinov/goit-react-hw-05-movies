import { fetchTrendingMovies } from 'components/servise/API';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

export const Home = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    async function fetchDataMovies() {
      try {
        setLoader(true);
        const movies = await fetchTrendingMovies();
        setFilms(movies.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
    fetchDataMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <Loader />}
      <ul>
        {films.map(({ id, title }) => (
          <li key={id}>
            <NavLink>{title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
