import { NavLink, useLocation } from "react-router-dom";
import exameSus from "../../assets/image/exame-sus.png";
import "./Header.css";

function Header() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <header className="container">
      <div className="container-logo">
        <img src={exameSus} alt="Logo SUS" width={270} height={60} />
      </div>

      <nav>
        <ul className="container-nav">
          {!isLoginPage && (
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? "selected" : "")}
              >
                Home
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to={"/produto/home"}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Sabe como funciona a FILA?
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/produtos"}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Histórico de pesquisa
            </NavLink>
          </li>

          {!isLoginPage && (
            <li>
              <NavLink
                to={"/datacep"}
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
