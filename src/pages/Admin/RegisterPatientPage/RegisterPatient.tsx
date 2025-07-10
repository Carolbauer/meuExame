import React, { useEffect, useState } from "react";
import { FaFileAlt, FaPlus, FaSearch, FaUserPlus } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./registerPatient.css";

function RegisterPatient() {
    const [search, setSearch] = useState('');
    const [patients, setPatients] = useState<any[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    useEffect(() => {
        const mockPatients = [
            {
                id: 1,
                name: "Adelinson Andrade",
                cpf: "00000000000",
                birthDate: "00/00/0000",
                sus: "111111111111111",
                address: "Rua Jaguariúto do Banhado",
                phone: "51 999999999",
            },
            {
                id: 2,
                name: "Caroline Bauer dos Santos",
                cpf: "11111111111",
                birthDate: "00/00/0000",
                sus: "222222222222222",
                address: "Rua Getúlio Vargas",
                phone: "51 999999999",
            },
            {
                id: 3,
                name: "Eduardo Barbosa Bernardes",
                cpf: "22222222222",
                birthDate: "00/00/0000",
                sus: "333333333333333",
                address: "Rua Osvalido aranha, 230",
                phone: "51 999999999",
            },
            {
                id: 4,
                name: "Tiago Bauer de Matos",
                cpf: "33333333333",
                birthDate: "00/00/0000",
                sus: "444444444444444",
                address: "Rua Santa Rita",
                phone: "51 999999999",
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
                    <h2 className="title">Pacientes</h2>

                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar paciente"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                        <button type="button" className="btn-register" onClick={() => setSearch('')}>
                            <FaPlus/>
                            Novo cadastro
                        </button>
                    </div>

                    <div className="table-container">
                        <div className="table-headerP">
                            <span>Nome</span>
                            <span>Cpf</span>
                            <span>Data de Nascimento</span>
                            <span>SUS</span>
                            <span>Endereço</span>
                            <span>Telefone</span>
                            <span>Ações</span>
                        </div>

                        {filteredPatients.map((patient) => (
                            <div className="table-rowP" key={patient.id}>
                                <span>{patient.name}</span>
                                <span>{patient.cpf}</span>
                                <span>{patient.birthDate}</span>
                                <span>{patient.sus}</span>
                                <span>{patient.address}</span>
                                <span>{patient.phone}</span>
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
export default RegisterPatient;