import React from "react";
import exameSus from "../../assets/image/logo_meu_exame.png";
import { NavLink } from "react-router-dom";
import { handleSignOut } from "../../utils/handleSignOut";
import "./Header.css";

function HeaderAdmin() {
    return (
        <header className="container">
            <div className="container-logo">
                <img src={exameSus} alt="Logo SUS" className="logo" />
            </div>
            <nav>
                <ul className="container-nav">
                    <li>
                        <NavLink
                            to="/login"
                            onClick={() => handleSignOut()}
                            className={({ isActive }) => (isActive ? "selected" : "")}
                        >
                            Sair
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>);
}
export default HeaderAdmin;