import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./registerPatientForm.css";

function RegisterPatientForms() {
    const [formdata, setFormData] = useState({
        name: "",
        cpf: "",
        address: "",
        phone: "",
        email: "",
    });

    return (
        <div className="form-page">
            <Sidebar />
            <div className="form-container">
                <h2 className="title">Cadastrar Paciente no Sistema</h2>
                <form action="">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome Completo"
                        value=""
                    />
                    <div className="form-row">
                        <input
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            value=""
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Telefone"
                            value=""
                        />
                    </div>
                    <input
                        type="text"
                        name="address"
                        placeholder="Endereço"
                        value=""
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value=""
                    />
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">Cadastrar</button>
                        <button type="button" className="btn-cancel">Cancelar</button>
                    </div>
                </form>
            </div >
        </div >
    );
}
export default RegisterPatientForms;