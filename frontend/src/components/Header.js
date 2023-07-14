import logo from '../images/logo.svg';
import { NavLink, useLocation} from 'react-router-dom';

function Header({onSignOut, email}) {
  let location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      {location.pathname === "/sign-up" ? <NavLink to="/sign-in" className="header__link">Войти</NavLink> : ""}
      {location.pathname === "/sign-in" ? <NavLink to="/sign-up" className="header__link">Регистрация</NavLink> : ""}
      {location.pathname === "/" ?
        <div className="header__container">
          <p className="header__email">{email}</p>
          <NavLink to="/sign-in" className="header__link header__link_faded" onClick={onSignOut}>Выйти</NavLink>
        </div> : ""}
    </header>
  )
}

export default Header;
