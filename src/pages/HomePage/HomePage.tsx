import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Card from "../../components/Card/Card";
import "./HomePage.css";
import { FaExclamationTriangle } from "react-icons/fa";

function HomePage() {
  const navigation = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUserAndExams() {
      const email =  localStorage.getItem('userData');

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      setUser(userData);

      const { data: queueData, error } = await supabase
        .from("schedulingqueue")
        .select(
          `
          id,
          created_at,
          exam_id,
          exams(name),
          prioritylevels(id, description, color)
        `
        )
        .eq("user_id", userData.id);

      if(error) throw new Error("Erro ao processar informações.");

      const enrichedExams = await Promise.all(
        queueData.map(async (item) => {
          const diff = Date.now() - new Date(item.created_at).getTime();
          const daysInQueue = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));

          const { data: allInQueue, error } = await supabase
            .from("schedulingqueue")
            .select(
              `
              id,
              created_at,
              prioritylevels(id)
            `
            )
            .eq("exam_id", item.exam_id);

            if(error) throw new Error("Erro ao processar informações.");

          allInQueue.sort((a, b) => {
            const prioA = a.prioritylevels?.id ?? 99;
            const prioB = b.prioritylevels?.id ?? 99;
            if (prioA !== prioB) return prioA - prioB;
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          });

          const position = allInQueue.findIndex((q) => q.id === item.id) + 1;

          const { data: appointment } = await supabase
            .from("appointments")
            .select("id,appointment_time")
            .eq("scheduling_queue_id", item.id)
            .single();

          const isScheduled = Boolean(appointment?.appointment_time);

          return {
            exam_id: item.exam_id,
            name: item.exams.name,
            priority: item.prioritylevels.description,
            color: item.prioritylevels.color,
            avgWaitTime: "60 dias",
            timeInQueue: `${daysInQueue} dias`,
            position,
            isScheduled,
            status: isScheduled ? "Aguardando confirmação" : "Na fila de espera",
            appointmentId:appointment?.id
          };

        })
      );

      setExams(enrichedExams);
    }

    fetchUserAndExams();
  }, [navigation]);

  return (
    <div className="container-page">
      <h2 className="title">Bem-vindo à plataforma Meu Exame!</h2>

      {user ? (
        <p className="text-page">
          Olá <strong>{user.name || user.email}</strong>, seu número de CPF é{" "}
          <strong>{user.cpf}</strong>
        </p>
      ) : (
        <p className="text-page">Carregando informações do paciente...</p>
      )}

      {exams.length === 0 ? (
        <div className="no-exams">
          <p className="no-exams-text">
            Tudo certo por aqui! Nenhum exame foi solicitado para você até
            agora. Assim que um exame for agendado, ele aparecerá nesta tela.
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
            priority={exam.priority}
            avgWaitTime={exam.avgWaitTime}
            timeInQueue={exam.timeInQueue}
            position={`${exam.position}º`}
            isScheduled={exam.isScheduled}
            appointmentId={exam.appointmentId}
          />
        ))
      )}
      

      <div className="alerts">
        <div className="alert">
          <div className="alert-content">
            <FaExclamationTriangle className="alert-icon" />
            <span>
              Em caso de dúvidas entre em contato com sua unidade de saúde
            </span>
          </div>
        </div>
        <div className="alert">
          <div className="alert-content">
            <FaExclamationTriangle className="alert-icon" />
            <span>
              A posição na fila e a previsão de atendimento são estimativas e
              poderão mudar de acordo com a gravidade do paciente(
              <NavLink
                to={"/comofuncionaafila"}
                style={{
                  color: "#007bff",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Sabe como funciona a FILA?
              </NavLink>
              ) ou por decisão judicial
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;