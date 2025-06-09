import React from "react";
import { FaCheckCircle, FaCheckSquare, FaExclamationTriangle, FaFileDownload } from "react-icons/fa";
import Modal from "./Modal";
import "./Modal.css"

interface ModalSuccessProps {
    onClose: () => void;
    onSave?: () => void;
}

function ModalSuccess ({ onClose, onSave}: ModalSuccessProps) {
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
        <>
            <button className="btn-green">
                <FaFileDownload />
                <span>
                    Salvar Agendamento
                </span>
            </button>
        </>
    );

    return (
        <Modal
            onClose={onClose}
            headerContent = {header}
            bodyContent = {body}
            footerContent = {footer}
        />
    );
}
export default ModalSuccess;