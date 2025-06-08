import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "./Modal";
import "./Modal.css"

interface ModalDeclineProps {
    onClose: () => void;
}

function ModalDecline ({ onClose }: ModalDeclineProps) {
    const header = (
        <>
            <FaInfoCircle className="icon-info" />
            <span className="modal-title">Desistência Registrada</span>
        </>
    );

    const body = (
        <>
            <p>
                Você desistiu do exame, realize uma nova consulta médica se deseja reagendar o exame.
            </p>
        </>
    );

    return (
        <Modal
            onClose={onClose}
            headerContent = {header}
            bodyContent = {body}
        />
    );
}
export default ModalDecline;