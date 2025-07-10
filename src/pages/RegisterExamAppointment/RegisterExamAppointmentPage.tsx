import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./RegisterExamAppointmentPage.css";

function RegisterExamAppointment() {
    const [formdata, setFormData] = useState({
        name: "",
        facilities: "",
        appointment_time: "",
        address: "",
    });
    const nameOptions = ["Adelinson Andrade", "Caroline Bauer dos Santos", "Eduardo Barbosa Bernardes", "Tiago Bauer de Matos"];
    const facilitiesOptions = ["Unirad", "ClinicaExamed", "VitaChecx", "BemViver Diagnósticos"];
    const appointment_time = "";
    const addressOptions = ["Av Barão do Rio Branco, 654, sala 02", "Rua das Flores, 123, sala 04", "Av. Brasil, 789, sala 01", "Rua do Comércio, 456, sala 03"];

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
                <h2 className="title">Cadastrar Agendamento</h2>
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
                            name="facilities"
                            value={formdata.facilities}
                            onChange={handleChange}
                        >
                            <option value="">Selecione a Instituição</option>
                            {facilitiesOptions.map((facilities, index) => (
                                <option key={index} value={facilities}>
                                    {facilities}
                                </option>
                            ))}
                        </select>

                        <input
                            type="datetime-local"
                            name="appointment_time"
                            value={formdata.appointment_time}
                            onChange={(e) =>
                                setFormData({ ...formdata, appointment_time: e.target.value })
                            }
                        />
                    </div>
                    <select
                        name="address"
                        value={formdata.address}
                        onChange={handleChange}
                    >
                        <option value="">Endereço</option>
                        {addressOptions.map((address, index) => (
                            <option key={index} value={address}>
                                {address}
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
export default RegisterExamAppointment;