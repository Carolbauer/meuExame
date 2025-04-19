import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../validations/loginValidation";
import "./LoginPage.css";

function LoginPage() {
  const navigation = useNavigate();

  const [cpf, setCpf] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errors, setErrors] = useState({ cpf: "", codigo: "", auth: "" });

  const handleLogin = () => {
    const { valid, errors: validationErrors } = validateLogin({ cpf, codigo });

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    if (cpf === "12345678900" && codigo === "abc123") {
      navigation("/home");
    } else {
      setErrors({
        ...validationErrors,
        auth: "CPF ou código de acesso incorretos. Verifique e tente novamente.",
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
              type="text"
              id="codigo"
              placeholder="Digite seu código de acesso"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            {errors.codigo && <p className="error-msg">{errors.codigo}</p>}

            {errors.auth && <p className="error-msg">{errors.auth}</p>}

            <button
              type="button"
              className="btn-primary"
              onClick={handleLogin}
            >
              Continuar
            </button>
            <button type="button" className="btn-secondary">
              Continuar com a conta gov.br
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
        A <strong>posição na fila</strong> e a <strong>previsão</strong> de
        atendimento são estimativas e poderão mudar de acordo com a gravidade do
        paciente (Sabe como funciona a FILA?) ou por decisão judicial
      </div>
    </div>
  );
}

export default LoginPage;
