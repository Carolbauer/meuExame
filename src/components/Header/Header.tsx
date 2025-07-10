import { NavLink, useLocation } from "react-router-dom";
import exameSus from "../../assets/image/logo_meu_exame.png";
import "./Header.css";
import React from "react";
import { handleSignOut } from "../../utils/handleSignOut";

function Header() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <header className="container">
      <div className="container-logo">
        <img src={exameSus} alt="Logo SUS" className="logo" />
      </div>

      <nav>
        <ul className="container-nav">
          {!isLoginPage && (
            <li>
              <NavLink
                to={"/home"}
                className={({ isActive }) => (isActive ? "selected" : "")}
              >
                Meus Exames
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to={"/priorityInfo"}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Sabe como funciona a FILA?
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/waitingLine"}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Fila de Espera
            </NavLink>
          </li>

          {!isLoginPage && (
            <li>
              <NavLink
                to="/login"
                onClick={() => handleSignOut()}
                className={({ isActive }) => (isActive ? "selected" : "")}
              >
                Sair
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
