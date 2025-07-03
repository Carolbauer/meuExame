import React from "react";
import { FaCheckCircle, FaCheckSquare, FaExclamationTriangle, FaFileDownload } from "react-icons/fa";
import Modal from "./Modal";
import "./Modal.css"
import { generateExamesPDF } from "../../utils/generateFileinPDF";
import { supabase } from "../../utils/supabaseClient";
import { useParams } from "react-router-dom";
import { AppointmentConfirmation } from "../../backend/dtos/AppointmentConfirmationDto";
import { SupabaseController } from "../../backend/controllers/SupabaseController";

interface ModalSuccessProps {
    onClose: () => void;
    onSave?: () => void;
}

function ModalSuccess({ onClose, onSave }: ModalSuccessProps) {
    const { id } = useParams();
    
    
   

    const handleExport = async () => {
        const response = await fetch(`http://localhost:3001/api/informationByExam/${id}`);
        const {examInformation} = await response.json();

        if (examInformation) {
            const scheduling = examInformation.schedulingqueue
            const facilityData = examInformation.facility;
            const priorityLevel = scheduling.prioritylevel
            const exam = scheduling.exam
            const user = scheduling.user
         
            const parsedData = {
                id: examInformation.id,
                appointment_time: String(examInformation.appointment_time),
                facility: {
                    id: facilityData.id,
                    name: facilityData.name,
                    address: facilityData.address,
                    cnpj: facilityData.cnpj,
                    phone: facilityData.phone,
                },
                schedulingqueue: {
                    id: scheduling.id,
                    created_at: scheduling.created_at,
                    prioritylevel: {
                        id: priorityLevel.id,
                        description: priorityLevel.description,
                        color: priorityLevel.color,
                    },
                    exam: {
                        id: exam.id,
                        name: exam.name,
                        exam_type_id: exam.exam_type_id,
                    },
                    user: {
                        id: user.id,
                        name: user.name,
                        cpf: user.cpf,
                        address: user.address,
                        phone: user.phone,
                        code: user.code,
                        email: user.email,
                    },
                },
            };

            await generateExamesPDF(parsedData);
        } else {
            alert("Nenhum exame encontrado.");
        }
    };

    const header = (
        <>
            <FaCheckCircle className="icon-success" />
            <span className="modal-title">Confirmação de Agendamento</span>
        </>
    );

    const body = (
        <>
            <p>
                Seu exame foi agendado com sucesso. <strong>Compareça na data e local agendado.</strong>
            </p>
            <p>
                Salve seu agendamento para possível consulta em caso de dúvida.
            </p>
        </>
    );

    const footer = (
        <button className="btn-green" onClick={handleExport}>
            <FaFileDownload />
            <span>Salvar Agendamento</span>
        </button>
    );

    return (
        <Modal
            onClose={onClose}
            headerContent={header}
            bodyContent={body}
            footerContent={footer}
        />
    );
}

export default ModalSuccess;