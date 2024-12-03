import { RepoContextProvider } from "./context/RepoContext";
// import RepoSearchForm from "./components/Form";
import RepoSearchForm from "./components/Form";
import Table from "./components/Table";
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <RepoContextProvider>
      <Container>
        <RepoSearchForm />
        <Table />
      </Container>
    </RepoContextProvider>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default App;
