import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <button onClick={() => navigate("/home")}>Voltar para a Home</button>
    </div>
  );
};

export default NotFoundPage;