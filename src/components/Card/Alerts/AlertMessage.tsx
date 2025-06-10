import React from "react";
import "./AlertMessage.css";

interface AlertMessageProps {
  message: React.ReactNode;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <div className="alert-message">
      <span className="alert-icon">⚠️</span>
      <span className="alert-text">{message}</span>
    </div>
  );
};

export default AlertMessage;