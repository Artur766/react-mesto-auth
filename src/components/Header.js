import React from "react";
import logo from "../images/logo.svg";
import { Link, useNavigate, Route, Routes } from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  return (
    <Routes>
      <Route path="/" element={
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип место" />
          <div className="header__wrapper">
            <p className="header__email">{props.userEmail}</p>
            <Link type="button" onClick={signOut} className="header__link" to="/sign-in">Выйти</Link>
          </div>
        </header>}
      />
      <Route path="/sign-in" element={
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип место" />
          <div className="header__wrapper">
            <Link type="button" onClick={signOut} className="header__link" to="/sign-up">Регистрация</Link>
          </div>
        </header>}
      />
      <Route path="/sign-up" element={
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип место" />
          <div className="header__wrapper">
            <Link type="button" onClick={signOut} className="header__link" to="/sign-in~">Войти</Link>
          </div>
        </header>}
      />

    </Routes>
  )
}

export default Header;