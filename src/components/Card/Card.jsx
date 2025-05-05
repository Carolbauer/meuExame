import { FaInfoCircle } from "react-icons/fa";
import "./Card.css"
function getPriorityClass(priority) {
    switch (priority) {
      case "Urgente":
        return "priority-red";
      case "Pouco Urgente":
        return "priority-yellow";
      case "Não Urgente":
        return "priority-green";
      default:
        return "";
    }
  }
function Card({ examName, status, priority, avgWaitTime, timeInQueue, position, date, time, location, address }) {
    return (
        <div className="card">
            <div className="card-header">
                <h2 className="examName">{examName}</h2>
                <div className="status">
                    <FaInfoCircle className="info-icon" />
                    <span className="font-info">{status}</span>
                </div>
            </div>
            <div className="card-body">
                {priority && (
                    <div className="info-line">
                        <strong>Prioridade de Atendimento:</strong>
                        <span className={`value priority ${getPriorityClass(priority)}`}> {priority} </span>
                    </div>
                )}
                {avgWaitTime && (
                    <div className="info-line">
                        <strong>Tempo médio de espera:</strong>
                        <span className="value">{avgWaitTime}</span>
                    </div>
                )}
                {timeInQueue && (
                    <div className="info-line">
                        <strong>Tempo que voçê esta na fila de espera</strong>
                        <span className="value">{timeInQueue}</span>
                    </div>
                )}
                {position && (
                    <div className="info-line">
                        <strong>Sua posição é:</strong>
                        <span className="value">{position}</span>
                    </div>
                )}
                {date && (
                    <div className="info-line">
                        <strong>DATA: </strong>
                        <span className="value">{date}</span>
                    </div>
                )}
                {time && (
                    <div className="info-line">
                        <strong>HORA: </strong>
                        <span className="value">{time}</span>
                    </div>
                )}
                {location && (
                    <div className="info-line">
                        <strong>LOCAL: </strong>
                        <span className="value">{location}</span>
                    </div>
                )}
                {address && (
                    <div className="info-line">
                        <strong>ENDEREÇO: </strong>
                        <span className="value">{address}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card