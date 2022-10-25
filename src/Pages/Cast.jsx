import { fetchMoviesCast } from 'components/servise/API';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

export const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchActorsId() {
      setLoader(true);
      try {
        const actorsCast = await fetchMoviesCast(movieId);
        setActors(actorsCast.cast);
      } catch (error) {
        setError({ error });
      } finally {
        setLoader(false);
      }
    }
    fetchActorsId();
  }, [movieId]);

  if (!actors) {
    return null;
  }

  const posterURL = 'https://image.tmdb.org/t/p/w200';

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Whoops, something went wrong</p>}
      <ul>
        {actors.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <img src={`${posterURL}${profile_path}`} alt={name} />
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
