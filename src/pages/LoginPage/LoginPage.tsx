import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/loginValidation";
import govbr from "../../assets/image/govbr.webp";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigation = useNavigate();

  const [cpf, setCpf] = useState("");
  const [password, setCodigo] = useState("");
  const [errors, setErrors] = useState({ cpf: "", code: "", auth: "" });

  const handleLogin = async () => {
    const { valid, errors: validationErrors } = validateLogin(cpf, password);

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("CPF ou código de acesso incorretos.");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", data.userData.email);
      } else {
        throw new Error("Token não encontrado na resposta.");
      }

      navigation("/home");
    } catch (error: any) {
      setErrors({
        ...validationErrors,
        auth: error.message || "Erro ao fazer login. Tente novamente.",
      });
    }
  };

  return (
    <div className="container-login">
      <div className="login-layout">
        <main className="login-box">
          <h1 className="login-title">Login</h1>
          <form className="login-form">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite seu CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            {errors.cpf && <p className="error-msg">{errors.cpf}</p>}

            <label htmlFor="codigo">CÓDIGO DE ACESSO</label>
            <input
              type="password"
              id="codigo"
              placeholder="Digite seu código de acesso"
              value={password}
              onChange={(e) => setCodigo(e.target.value)}
            />
            {errors.code && <p className="error-msg">{errors.code}</p>}

            {errors.auth && <p className="error-msg">{errors.auth}</p>}

            <button
              type="button"
              className="btn-primary"
              onClick={handleLogin}
            >
              Continuar
            </button>
            <button type="button" className="btn-secondary">
              Continuar com a conta <img src={govbr} alt="logo gov" className="image-gov" />
            </button>
          </form>
        </main>

        <div className="alert-side">
          ❗<strong>Não sabe onde localizar o código de acesso?</strong> <br />
          O código de acesso está no seu comprovante de solicitação de exame.
        </div>
      </div>

      <div className="info-box">
        <strong>Atenção!</strong>
        <br />
        A <strong>posição na fila</strong> e a <strong>previsão</strong> de atendimento são estimativas e poderão mudar de acordo com a gravidade do paciente (
        <a href="/priorityInfo" className="queue-link">
          Sabe como funciona a FILA? ℹ️
        </a>
        ) ou por decisão judicial
      </div>
    </div>
  );
};

export default LoginPage;
