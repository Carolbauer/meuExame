import React from "react";
import "./PriorityInfoPage.css";
import AlertMessage from "../../components/Card/Alerts/AlertMessage";

const PriorityInfoPage = () => {
  return (
    <div className="priority-container">
      <h2>Posição na Fila e Prioridade</h2>

      <div className="info-box gray">
        <strong>Importante:</strong> A posição na fila e a previsão de atendimento são estimativas, podendo ser alteradas conforme a gravidade do caso, necessidade clínica ou por decisão judicial.
      </div>

      <div className="priority-level red">
        <div className="label">URGÊNCIA</div>
        <div className="description">
          <strong>(Prioridade Máxima)</strong><br />
          Destinado a pacientes com risco iminente de vida ou complicações graves. Casos que exigem atendimento imediato ou em curtíssimo prazo.
        </div>
      </div>

      <div className="priority-level yellow">
        <div className="label">POUCO URGENTE</div>
        <div className="description">
          <strong>(Prioridade Média)</strong><br />
          Pacientes com quadros clínicos moderados, que não apresentam risco imediato, mas necessitam de avaliação em tempo oportuno.
        </div>
      </div>

      <div className="priority-level green">
        <div className="label">NÃO URGENTE</div>
        <div className="description">
          <strong>(Prioridade Baixa)</strong><br />
          Casos leves, estáveis ou de rotina. Exames que podem aguardar um prazo maior sem prejuízo à saúde do paciente.
        </div>
      </div>

      <AlertMessage message="Em caso de dúvidas entre em contato com sua unidade de saúde" />

      <AlertMessage
        message={
          <>
            <strong>A posição na fila e a previsão</strong> de atendimento são estimativas e poderão mudar de acordo com a gravidade do paciente (Metodologia Prioridades) ou por decisão judicial
          </>
        }
      />
    </div>
  );
};

export default PriorityInfoPage;