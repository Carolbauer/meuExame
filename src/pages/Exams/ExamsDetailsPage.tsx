import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import Card from "../../components/Card/Card";
import { FaExclamationTriangle } from "react-icons/fa";
import "../HomePage/HomePage.css";
import ModalConfirmationAttendance from "../../components/Modal/ModalConfirmationAttendance";
import ModalSuccess from "../../components/Modal/ModalSuccess";
import ModalDecline from "../../components/Modal/ModalDecline";
import AlertMessage from "../../components/Card/Alerts/AlertMessage";


function ExamsDetailsPage() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

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

  const handleConfirmPresence = async () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(true);
  }

  const handleDeclinePresence = async () => {
    setShowConfirmationModal(false);
    setShowDeclineModal(true);
  }

  const handleSaveAppointment = () => {
    setShowSuccessModal(false);
  }

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
      showConfirmationButton={true}
      setShowModal={setShowConfirmationModal}
    />

    {showConfirmationModal && (
      <ModalConfirmationAttendance
      onClose={() => setShowConfirmationModal(false)}
      onConfirm={handleConfirmPresence}
      onDecline={handleDeclinePresence}
      />
    )}

    {showSuccessModal && (
      <ModalSuccess
        onClose={() => setShowSuccessModal(false)}
        onSave={handleSaveAppointment}
      />
    )}

    {showDeclineModal && (
      <ModalDecline
        onClose={() => setShowDeclineModal(false)}
      />
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

export default ExamsDetailsPage;