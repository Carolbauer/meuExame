import React, { ReactNode } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./Modal.css"

interface ModalProps {
    onClose: () => void;
    headerContent: ReactNode;
    bodyContent: ReactNode;
    footerContent?: ReactNode;
}

function Modal({ onClose, headerContent, bodyContent,footerContent }: ModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <div className="modal-header">
                    {headerContent}
                    <button className="close-modal-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {bodyContent}
                </div>
                {footerContent && (
                    <div className="modal-actions">
                        {footerContent}
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default Modal;