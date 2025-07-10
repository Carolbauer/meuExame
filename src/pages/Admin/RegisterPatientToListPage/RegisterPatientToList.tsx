import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./registerPatientToList.css";

function RegisterPatientToList() {
    const [formdata, setFormData] = useState({
        name: "",
        exam: "",
        priority_level: "",
        staus: "",
    });
    const nameOptions = ["Adelinson Andrade", "Caroline Bauer dos Santos", "Eduardo Barbosa Bernardes", "Tiago Bauer de Matos"];
    const examOptions = ["Radiografia", "Ultrassom", "Tomografia", "Ressonância"];
    const priorityOptions = ["Urgente", "Pouco Urgente", "Não Urgente"];
    const statusOptions = ["Aguardando"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="form-page">
            <Sidebar />
            <div className="form-container">
                <h2 className="title">Cadastrar Paciente na Lista de Espera</h2>
                <form>
                    <select
                            name="name"
                            value={formdata.name}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o paciente</option>
                            {nameOptions.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    <div className="form-row">
                         <select
                            name="exam"
                            value={formdata.exam}
                            onChange={handleChange}
                        >
                            <option value="">Selecione o exame</option>
                            {examOptions.map((exam, index) => (
                                <option key={index} value={exam}>
                                    {exam}
                                </option>
                            ))}
                        </select>

                        <select
                            name="priority_level"
                            value={formdata.priority_level}
                            onChange={handleChange}
                        >
                            <option value="">Classificação de Risco</option>
                            {priorityOptions.map((priority, index) => (
                                <option key={index} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </div>
                    <select
                        name="status"
                        value={formdata.staus}
                        onChange={handleChange}
                    >
                        <option value="">Status</option>
                        {statusOptions.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div className="form-buttons">
                        <button type="submit" className="btn-submit">Cadastrar</button>
                        <button type="button" className="btn-cancel">Cancelar</button>
                    </div>
                </form>
            </div >
        </div >
    );
}
export default RegisterPatientToList;