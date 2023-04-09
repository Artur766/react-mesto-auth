import React from "react";
import logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <div className="header__wrapper">
        <p className="header__email">{props.userEmail}</p>
        <Link type="button" onClick={signOut} className="header__link" to={props.route}>{props.textLink}</Link>
      </div>
    </header>
  )
}

export default Header;