import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./HomePage.css"
import { FaExclamationTriangle } from "react-icons/fa";
import React from "react";

function HomePage() {
  const navigation = useNavigate();

  function navegar() {
    navigation("/home");
  }

  return (
    <div className="container-page">
      <h2 className="title">Informações do Exame</h2>
      <p className="text-page">Ola "Nome do Paciente", seu número de CPF é "0000000000"</p>

      <div>
        <Card
          examName={"Radiografia"}
          status={"Na fila de espera"}
          priority={"Não Urgente"}
          avgWaitTime={"60 dias"}
          timeInQueue={"01 dias"}
          position={"7"} 
          date={undefined} 
          time={undefined} 
          location={undefined} 
          address={undefined} />
      </div>

      <div>
        <Card
          examName={"Ecografia Abdominal Total"}
          status={"Na fila de espera"}
          priority={"Urgente"}
          avgWaitTime={"30 dias"}
          timeInQueue={"10 dias"}
          position={"2°"} 
          date={undefined} 
          time={undefined} 
          location={undefined} 
          address={undefined} />
      </div>
      <div className="alerts">
        <div className="alert">
          <div className="alert-content">
            <FaExclamationTriangle className="alert-icon" />
            <span>Em caso de dúvidas entre em contato com sua unidade de saúde</span>
          </div>

        </div>
        <div className="alert">
          <div className="alert-content">
            <FaExclamationTriangle className="alert-icon" />
            <span>A posição na fila e a previsão de atendimento são estimativas e poderão mudar de acordo com a gravidade do paciente(Metodologia Prioridades) ou por decisão judicial</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default HomePage;
