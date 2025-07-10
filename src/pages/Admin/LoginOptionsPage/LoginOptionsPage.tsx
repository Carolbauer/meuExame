import React, { useState } from "react";

import styles from "./LoginOptionsPage.module.css";
import { FaBed, FaUserMd } from "react-icons/fa";
import { OptionCard } from "../../../components/Card/OptionsCard/OptionCard";
import { useNavigate } from "react-router-dom";

export const LoginOptionsPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"paciente" | "admin" | null>(null);
  const navigation = useNavigate();

  const handleSelect = (role: "paciente" | "admin") => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "admin") {
      navigation("/admin/registerPatient");
    } else {
        navigation("/home");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Bem Vindo (a)</h2>
      <p>Selecione uma opção abaixo</p>
      <div className={styles.options}>
        <OptionCard
          label="Paciente"
          icon={<FaBed />}
          selected={selectedRole === "paciente"}
          onSelect={() => handleSelect("paciente")}
        />
        <OptionCard
          label="Administrador"
          icon={<FaUserMd />}
          selected={selectedRole === "admin"}
          onSelect={() => handleSelect("admin")}
        />
      </div>
      <button
        className={styles.button}
        disabled={!selectedRole}
        onClick={handleContinue}
      >
        continuar
      </button>
    </div>
  );
};
