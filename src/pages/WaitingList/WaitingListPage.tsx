import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import "./WaitingListPage.css";
import AlertMessage from "../../components/Card/Alerts/AlertMessage";

function maskName(fullName: string) {
  if (!fullName) return "";
  const parts = fullName.trim().split(" ");
  return parts.map(p => p[0] + "*".repeat(p.length - 1)).join(" ");
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
}

function WaitingListPage() {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const email = localStorage.getItem("userData");
      let currentUser = null;

      if (email) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (!userError) {
          currentUser = userData;
          setUser(userData);
        }
      }

      const { data, error } = await supabase
        .from("schedulingqueue")
        .select(`
          id,
          created_at,
          exam_id,
          priority_level_id,
          user_id,
          exams(name),
          users(id, name),
          prioritylevels(description)
        `)
        .order("exam_id", { ascending: true })
        .order("priority_level_id", { ascending: true })
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao buscar agendamentos:", error);
        return;
      }

      const formattedData = data.map((item: any) => {
        const isCurrentUser = currentUser && item.users.id === currentUser.id;

        return {
          examName: item.exams.name,
          patientName: isCurrentUser ? item.users.name : maskName(item.users.name),
          priority: item.prioritylevels.description,
          position: data.filter((i: any) => i.exam_id === item.exam_id).indexOf(item) + 1,
          createdAt: formatDate(item.created_at),
        };
      });

      setAppointments(formattedData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-page">Carregando exames...</p>;
  }

  return (
    <div className="container-page">
      <h2 className="title">Fila de Espera</h2>

      {appointments.length === 0 ? (
        <p className="text-page">Nenhum exame agendado encontrado.</p>
      ) : (
        <table className="table-agendados">
          <thead>
            <tr>
              <th>Exame</th>
              <th>Posição</th>
              <th>Paciente</th>
              <th>Prioridade</th>
              <th>Data do Agendamento</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((item, idx) => (
              <tr key={idx}>
                <td>{item.examName}</td>
                <td>{item.position}º</td>
                <td>{item.patientName}</td>
                <td>{item.priority}</td>
                <td>{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
}

export default WaitingListPage;
