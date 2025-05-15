import { useParams } from "react-router-dom";


function ExamsDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes do Exame</h1>
    </div>
  );
}
export default ExamsDetailsPage;