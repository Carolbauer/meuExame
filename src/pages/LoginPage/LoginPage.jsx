import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigation = useNavigate();

  return (
    <div className="container-login">
      <div className="login-layout">
        <main className="login-box">
          <h1 className="login-title">Login</h1>
          <form className="login-form">
            <label htmlFor="cpf">CPF</label>
            <input type="text" id="cpf" placeholder="Digite seu CPF" />

            <label htmlFor="codigo">CÓDIGO DE ACESSO</label>
            <input
              type="text"
              id="codigo"
              placeholder="Digite seu código de acesso"
            />
            <button type="button" className="btn-primary">
              Continuar
            </button>
            <button type="button" className="btn-secondary">
              Continuar com a conta gov.br
            </button>
          </form>
        </main>

        <div className="alert-side">
          ❗<strong>Não sabe onde localizar o código de acesso?</strong> <br />O
          código de acesso está no seu comprovante de solicitação de exame.
        </div>
      </div>

      <div className="info-box">
        <strong>Atenção!</strong>
        <br />A <strong>posição na fila</strong> e a <strong>previsão</strong>{" "}
        de atendimento são estimativas e poderão mudar de acordo com a gravidade
        do paciente(Sabe como funciona a FILA?) ou por decisão judicial
      </div>
    </div>
  );
}

export default LoginPage;
