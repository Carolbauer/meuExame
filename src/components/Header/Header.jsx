import { NavLink } from "react-router-dom";
import exameSus from '../../assets/exame-sus.jpeg';
import "./Header.css";

function Header() {
    
  return (
    <header className="container">
      <div className="container-logo"><img src={exameSus} alt="Logo SUS"  width={100} height={100}/></div>

      <nav>
        <ul className="container-nav">
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) => (isActive ? "selected" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/produto/cadastrar"}
              className={({ isActive }) => isActive ? "selected" : ""}
            >
              Metodologias de prioridades
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/produtos"}
              className={({ isActive }) => isActive ? "selected" : ""}
            >
              Histórico de pesquisa
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/datacep"}
              className={({ isActive }) => isActive ? "selected" : ""}
            >
              Sair
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;