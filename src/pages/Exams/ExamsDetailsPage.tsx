import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Card from "../../components/Card/Card";
import { FaExclamationTriangle } from "react-icons/fa";
import "../HomePage/HomePage.css";

function ExamsDetailsPage() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
      .from('appointments')
      .select(`
        id,
        appointment_time,
        facility: facilities (
          id,
          name,
          address,
          cnpj,
          phone
        ),
        schedulingqueue (
          id,
          created_at,
          prioritylevel: prioritylevels (
            id,
            description,
            color
          ),
          exam: exams (
            id,
            name,
            exam_type_id
          ),
          user: users (
            id,
            name,
            cpf,
            address,
            phone,
            code,
            email
          )
        )
      `)
      .eq('id', id) 
      .single();

      setAppointment(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

if (loading) {
  return <p className="text-page">Carregando...</p>;
}

  if (!appointment) throw new Error("Appointment not found");;

  const { schedulingqueue, appointment_time, facility } = appointment;
  const user = schedulingqueue.user;
  const exam = schedulingqueue.exam;
  const priority = schedulingqueue.prioritylevel?.description ?? "Não definida";

  const dateObj = new Date(appointment_time);
  const date = dateObj.toLocaleDateString("pt-BR");
  const time = dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

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

    <Card
      examId={exam.id}
      examName={exam.name}
      status={"AGUARDANDO CONFIRMAÇÃO"}
      priority={priority}
      avgWaitTime=""
      timeInQueue=""
      position=""
      date={date}
      time={time}
      location={facility.name}
      address={facility.address}
      isScheduled={false}
      instructions="Comparecer com 15 minutos de antecedência e levar documento com foto"
    />

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
              poderão mudar de acordo com a gravidade do paciente(Metodologia
              Prioridades) ou por decisão judicial
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamsDetailsPage;