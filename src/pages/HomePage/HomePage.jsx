import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigation = useNavigate();

  function navegar() {
    navigation("/home");
  }

  return <h1>Seja bem vindo a página Home</h1>;
}

export default HomePage;
