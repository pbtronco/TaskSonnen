import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState }  from "react";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [voos, setVoos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getVoos = async () =>{
    try{
      const res = await axios.get("http://localhost:8800");
      setVoos(res.data.sort((a, b) => (a.cia_aerea > b.cia_aerea ? 1 : -1 )));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getVoos();
  }, [setVoos]);

  return (
    <>
      <Container>
          <Title>VOOS</Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getVoos={getVoos} />
          <Grid voos={voos} setVoos={setVoos} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;