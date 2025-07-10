import React, { useEffect, useState } from "react";
import { FaFileAlt, FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./patientList.css";

function PatientList() {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState<any[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    useEffect(() => {
        const mockPatients = [
            {
                id: 1,
                name: "Adelinson Andrade",
                exam: "Radiografia do Ombro",
                priority_level: "Alta",
                status: "Aguardando",
            },
            {
                id: 2,
                name: "Caroline Bauer dos Santos",
                exam: "Ultrassom Abdominal",
                priority_level: "Média",
                status: "Aguardando",
            },
            {
                id: 3,
                name: "Eduardo Barbosa Bernardes",
                exam: "Ressonância Magnética",
                priority_level: "Baixa",
                status: "Aguardando",
            },
            {
                id: 4,
                name: "Tiago Bauer de Matos",
                exam: "Tomografia do Tórax",
                priority_level: "Alta",
                status: "Aguardando",
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
                    <h2 className="title">Pacientes cadastrados na lista de espera</h2>

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
                        <div className="table-header">
                            <span>Nome</span>
                            <span>Exame</span>
                            <span>Classificação de Risco</span>
                            <span>Status</span>
                            <span>Ações</span>
                        </div>

                        {filteredPatients.map((patient) => (
                            <div className="table-row" key={patient.id}>
                                <span>{patient.name}</span>
                                <span>{patient.exam}</span>
                                <span>{patient.priority_level}</span>
                                <span>{patient.status}</span>
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
export default PatientList;