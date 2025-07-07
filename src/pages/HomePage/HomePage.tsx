import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserByEmail, getExamsForUser } from "../../backend/services/ExamService";
import Card from "../../components/Card/Card";
import AlertMessage from "../../components/Card/Alerts/AlertMessage";
import "./HomePage.css";

function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const hideFieldsStatus = ["Desmarcado", "Concluído"];

  useEffect(() => {
    async function loadData() {
      try {
        const email = localStorage.getItem("userData");
        if (!email) throw new Error("Email não encontrado no localStorage");

        const userData = await getUserByEmail(email);
        const examData = await getExamsForUser(userData.id);

        setUser(userData);
        setExams(examData);
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do usuário.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container-page">
      <h2 className="title">Bem-vindo à plataforma Meu Exame!</h2>

      {loading ? (
        <p className="text-page">Carregando...</p>
      ) : user ? (
        <p className="text-page">
          Olá <strong>{user.name || user.email}</strong>, seu número de CPF é{" "}
          <strong>{user.cpf}</strong>
        </p>
      ) : (
        <p className="text-page">Usuário não encontrado.</p>
      )}

      {exams.length === 0 ? (
        <div className="no-exams">
          <p className="no-exams-text">
            Tudo certo por aqui! Nenhum exame foi solicitado para você até agora. Assim que um exame for agendado, ele aparecerá nesta tela.
          </p>
          <NavLink to="/produtos" className="no-exams-btn">
            Solicitar Exame
          </NavLink>
        </div>
      ) : (
        exams.map((exam, idx) => (
          <Card
            key={idx}
            examId={exam.exam_id}
            examName={exam.name}
            status={exam.status}
            priority={hideFieldsStatus.includes(exam.status) ? null : exam.priority}
            avgWaitTime={hideFieldsStatus.includes(exam.status) ? null : exam.avgWaitTime}
            timeInQueue={hideFieldsStatus.includes(exam.status) ? null : exam.timeInQueue}
            position={
              hideFieldsStatus.includes(exam.status) || exam.position === 0
                ? null
                : `${exam.position}º`
            }
            isScheduled={exam.isScheduled}
            appointmentId={exam.appointmentId}
          />
        ))
      )}

      <AlertMessage message="Em caso de dúvidas entre em contato com sua unidade de saúde" />

      <AlertMessage
        message={
          <>
            <strong>A posição na fila e a previsão</strong> de atendimento são estimativas e poderão mudar de acordo com a gravidade do paciente ou por decisão judicial.
          </>
        }
      />
    </div>
  );
}

export default HomePage;
