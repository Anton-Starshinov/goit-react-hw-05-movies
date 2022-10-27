import { Outlet } from 'react-router-dom';
import { HeaderStyled, NavStyled, Conteiner } from './AppStyled';

export const SharedLayout = () => {
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
      <Outlet />
    </Conteiner>
  );
};
