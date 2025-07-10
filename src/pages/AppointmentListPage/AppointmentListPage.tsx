import React, { useEffect, useState } from "react";
import { FaFileAlt, FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./AppointmentListPage.css";

function AppointmentList() {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState<any[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    useEffect(() => {
        const mockPatients = [
            {
                id: 1,
                name: "Adelinson Andrade",
                facilities: "Unirad",
                appointment_time: "__/__/____ __:__",
                address: "Av Barão do Rio Branco, 654, sala 02",
            },
            {
                id: 2,
                name: "Caroline Bauer dos Santos",
                facilities: "ClinicaExamed",
                appointment_time: "__/__/____ __:__",
                address: "Rua das Flores, 123, sala 04",
            },
            {
                id: 3,
                name: "Eduardo Barbosa Bernardes",
                facilities: "VitaChecx",
                appointment_time: "__/__/____ __:__",
                address: "Av. Brasil, 789, sala 01",
            },
            {
                id: 4,
                name: "Tiago Bauer de Matos",
                facilities: "BemViver Diagnósticos",
                appointment_time: "__/__/____ __:__",
                address: "Rua do Comércio, 456, sala 03",
            },
        ];

        setPatients(mockPatients);
        setFilteredPatients(mockPatients);
    }, []);

    useEffect(() => {
        const results = patients.filter(patient =>
            patient.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPatients(results);
    }, [search, patients]);

    return (
        <div className="layout">
            <Sidebar />

            <div className="main-content">

                <div className="container-page">
                    <h2 className="title">Pacientes com exames agendados</h2>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar paciente"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                        <button type="button" className="btn-register" onClick={() => setSearch('')}>
                            <FaPlus />
                            Novo cadastro
                        </button>
                    </div>

                    <div className="table-container">
                        <div className="table-headerA">
                            <span>Nome</span>
                            <span>Estabelecimento</span>
                            <span>Data e Hora</span>
                            <span>Endereço</span>
                            <span>Ações</span>
                        </div>

                        {filteredPatients.map((patient) => (
                            <div className="table-rowA" key={patient.id}>
                                <span>{patient.name}</span>
                                <span>{patient.facilities}</span>
                                <span>{patient.appointment_time}</span>
                                <span>{patient.address}</span>
                                <span>
                                    <button className="action-btn">
                                        <FaFileAlt />
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="btn-register-container">

                    </div>
                </div>
            </div>
        </div>

    );
}
export default AppointmentList;