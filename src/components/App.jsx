import { Routes, Route } from 'react-router-dom';
import { HeaderStyled, NavStyled, Conteiner } from './AppStyled';
import { Home } from 'Pages/Home';
import { Movies } from 'Pages/Movies';
import { NotFound } from 'Pages/NotFound';

export const App = () => {
  return (
    <Conteiner>
      <HeaderStyled>
        <nav>
          <NavStyled to="/" end>
            Home
          </NavStyled>
          <NavStyled to="/Movies">Movies</NavStyled>
        </nav>
      </HeaderStyled>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<Movies />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Conteiner>
  );
};
