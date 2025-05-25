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
      const { data: sessionData } = await supabase.auth.getUser();
      const email = sessionData.user.email;

      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      setUser(userData);

      const { data: queueData } = await supabase
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

      const enrichedExams = await Promise.all(
        queueData.map(async (item) => {
          const daysInQueue = Math.floor(
            (Date.now() - new Date(item.created_at).getTime()) /
              (1000 * 60 * 60 * 24)
          );

          const { data: allInQueue } = await supabase
            .from("schedulingqueue")
            .select(
              `
              id,
              created_at,
              prioritylevels(id)
            `
            )
            .eq("exam_id", item.exam_id);

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
            .select("appointment_time")
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
          };
        })
      );

      setExams(enrichedExams);
    }

    fetchUserAndExams();
  }, [navigation]);

  return (
    <div className="container-page">
      <h2 className="title">Informações do Exame</h2>

      {user ? (
        <p className="text-page">
          Olá <strong>{user.name || user.email}</strong>, seu número de CPF é{" "}
          <strong>{user.cpf}</strong>
        </p>
      ) : (
        <p className="text-page">Carregando informações do paciente...</p>
      )}

      {exams.map((exam, idx) => (
        <Card
          key={idx}
          examId={exam.exam_id}
          examName={exam.name}
          status={"Na fila de espera"}
          priority={exam.priority}
          avgWaitTime={exam.avgWaitTime}
          timeInQueue={exam.timeInQueue}
          position={`${exam.position}º`}
          isScheduled={exam.isScheduled}
        />
      ))}

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
              <NavLink to={"/comofuncionaafila"} style={{ color: "#007bff", textDecoration: "underline", fontWeight: "bold" }}>
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
