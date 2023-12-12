import headerLogo from "../images/logo.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <img src={headerLogo} alt="логотип место" className="header__logo" />
      <nav className="header__nav">
        <p className="header__text">{props.mail}</p>
        <Link className="header__link" to={props.route} onClick={props.onClick}>{props.title}</Link>
      </nav>
    </header>
  );
};

export default Header;