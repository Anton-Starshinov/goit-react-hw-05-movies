import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'Pages/Home';
import { Movies } from 'Pages/Movies';
import { NotFound } from 'Pages/NotFound';
import { MovieDetails } from 'Pages/MovieDetails';
import { SharedLayout } from './SharedLayout';

const Cast = lazy(() => import('../Pages/Cast'));
const Reviews = lazy(() => import('../Pages/Reviews'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
