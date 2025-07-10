import React from "react";
import { FaCalendarAlt, FaUserInjured } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <nav>
                <NavLink to="/RegisterPatient" className="sidebar-link">
                <FaUserInjured className="sidebar-icon" />
                    Cadastrar Paciente
                </NavLink>
                <NavLink to="/RegisterPatientToList" className="sidebar-link">
                    <FaUserInjured className="sidebar-icon" />
                    Cadastrar paciente na lista de espera
                </NavLink>
                <NavLink to="/RegisterExam" className="sidebar-link">
                    <FaCalendarAlt className="sidebar-icon" />
                    Agendar Exame
                </NavLink>
            </nav>
        </div>
    );
}
export default Sidebar;