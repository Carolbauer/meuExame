import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utils/loginValidation";
import { supabase } from "../../utils/supabaseClient";
import govbr from "../../assets/image/govbr.webp";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigation = useNavigate();

  const [cpf, setCpf] = useState("");
  const [code, setCodigo] = useState("");
  const [errors, setErrors] = useState({ cpf: "", code: "", auth: "" });

  const handleLogin = async () => {
    const { valid, errors: validationErrors } = validateLogin({ cpf, code });

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cpf,
      password: code,
    });

    if (error) {
      setErrors({
        ...validationErrors,
        auth: "CPF ou código de acesso incorretos. Verifique e tente novamente.",
      });
      return;
    }
    
    navigation("/home");
  };

  const handleLoginGov = async () => {
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@examesus.com",
      password: "1q2w3e4r5t",
    });

    navigation("/home");
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
              value={code}
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
            <button type="button" className="btn-secondary" onClick={handleLoginGov}>
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
        A <strong>posição na fila</strong> e a <strong>previsão</strong> de atendimento são estimativas e poderão mudar de acordo com a gravidade do paciente (Sabe como funciona a FILA?) ou por decisão judicial
      </div>
    </div>
  );
};

export default LoginPage;
