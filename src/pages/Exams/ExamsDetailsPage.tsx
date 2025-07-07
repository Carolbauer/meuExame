import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointmentById, updateSchedulingStatus } from "../../backend/services/AppointmentService";
import ModalConfirmationAttendance from "../../components/Modal/ModalConfirmationAttendance";
import ModalSuccess from "../../components/Modal/ModalSuccess";
import ModalDecline from "../../components/Modal/ModalDecline";
import AlertMessage from "../../components/Card/Alerts/AlertMessage";
import Card from "../../components/Card/Card";
import "../HomePage/HomePage.css";

function ExamsDetailsPage() {
  const { id = "" } = useParams();
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAppointmentById(id);
        setAppointment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleConfirmPresence = async () => {
    try {
      await updateSchedulingStatus(appointment.schedulingqueue.id, 3);
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      alert("Erro ao confirmar presença.");
    }
  };

  const handleDeclinePresence = async () => {
    try {
      await updateSchedulingStatus(appointment.schedulingqueue.id, 5);
      setShowConfirmationModal(false);
      setShowDeclineModal(true);
    } catch (error) {
      alert("Erro ao recusar presença.");
    }
  };

  if (loading) return <p className="text-page">Carregando...</p>;
  if (!appointment) throw new Error("Agendamento não encontrado");

  const { schedulingqueue, appointment_time, facility } = appointment;
  const user = schedulingqueue.user;
  const exam = schedulingqueue.exam;
  const dateObj = new Date(appointment_time);
  const date = dateObj.toLocaleDateString("pt-BR");
  const time = dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="container-page">
      <h2 className="title">Informações do Exame</h2>
      <p className="text-page">
        Olá <strong>{user?.name || user?.email}</strong>, seu número de CPF é{" "}
        <strong>{user?.cpf}</strong>
      </p>

      <Card
        examId={exam.id}
        examName={exam.name}
        status={schedulingqueue.scheduling_status?.description ?? "Indefinido"}
        priority={schedulingqueue.prioritylevel?.description ?? "Não definida"}
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
          onClose={() => {
            setShowSuccessModal(false);
            window.location.reload();
          }}
          onSave={() => setShowSuccessModal(false)}
        />
      )}

      {showDeclineModal && (
        <ModalDecline
          onClose={() => {
            setShowDeclineModal(false);
            window.location.reload();
          }}
        />
      )}

      <AlertMessage message="Em caso de dúvidas entre em contato com sua unidade de saúde" />
      <AlertMessage
        message={
          <>
            <strong>A posição na fila e a previsão</strong> são estimativas e podem variar.
          </>
        }
      />
    </div>
  );
}

export default ExamsDetailsPage;
