import { RepoContextProvider } from "./context/RepoContext";
import RepoSearchForm from "./components/Form";
import Table from "./components/Table";
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <Container>
        <RepoContextProvider>
            <RepoSearchForm />
            <Table />
        </RepoContextProvider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default App;
