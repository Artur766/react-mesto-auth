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
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип место" />
      <div className="header__wrapper">
        <Routes>
          <Route path="/" element={
            <>
              <p className="header__email">{props.userEmail}</p>
              <Link type="button" onClick={signOut} className="header__link" to="/sign-in">Выйти</Link>
            </>
          }
          />
          <Route path="/sign-in" element={
            <Link type="button" onClick={signOut} className="header__link" to="/sign-up">Регистрация</Link>
          }
          />
          <Route path="/sign-up" element={
            <Link type="button" onClick={signOut} className="header__link" to="/sign-in">Войти</Link>
          }
          />
        </Routes>
      </div>
    </header >
  )
}

export default Header;