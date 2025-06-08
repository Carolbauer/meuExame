import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Modal from "./Modal";
import "./Modal.css"

interface ModalConfirmationProps {
    onClose: () => void;
    onConfirm: () => void;
    onDecline: () => void;
}

function ModalConfirmationAttendance({ onClose, onConfirm, onDecline} : ModalConfirmationProps) {
    const header = (
        <>
            <FaExclamationTriangle className="icon-warnig" />
            <span className="modal-title">Confirmação de Agendamento</span>
        </>
    );

    const body = (
        <>
            <p>Você precisa confirmar sua presença na data agendada do exame.</p>
            <p><strong>Se você NÃO confirmar</strong>, perderá o agendamento do seu exame.</p>
        </>
    );

    const footer = (
        <>
            <button className="btn-red" onClick={onDecline}>
                Não poderei comparecer
            </button>
            <button className="btn-green" onClick={onConfirm}>
                SIM! Confirmar Presença
            </button>
        </>
    );

    return (
        <Modal
            onClose={onClose}
            headerContent={header}
            bodyContent={body}
            footerContent={footer}
        />
    )
}

export default ModalConfirmationAttendance;