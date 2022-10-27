import { fetchMoviesCast } from 'servise/API';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const posterURL = 'https://image.tmdb.org/t/p/w200';
  const noImg =
    'https://png.pngtree.com/png-clipart/20190611/original/pngtree-sorry-fail-to-pay-material-free-download-png-image_2082191.jpg';

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

  return (
    <div>
      {loading && <Loader />}
      {error && <p>Whoops, something went wrong</p>}
      <ul>
        {actors.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            {profile_path ? (
              <img src={`${posterURL}${profile_path}`} alt={name} />
            ) : (
              <img src={`${noImg}`} alt={name} width="200" />
            )}
            <p>{name}</p>
            <p>{character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
