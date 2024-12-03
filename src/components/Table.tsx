import { useRepo } from "../context/RepoContext";
import styled from "styled-components";
import Pages from "./Pages";

const Table = () => {
  const { repoData } = useRepo();

  if (repoData.length === 0) {
    return <div></div>;
  }

  return (
    <Container>
      <table>
        <StyledTHead>
          <tr>
            <th>Repository Name</th>
            <th>Owner</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Open Issues</th>
            <th>Watchers</th>
            {/* <th>Pushed At</th> */}
          </tr>
        </StyledTHead>
        <StyledTBody>
          {repoData.map((repo) => (
            <tr key={repo.id}>
              <td>{repo.name}</td>
              <td>{repo.owner.login}</td>
              <td>{repo.stargazers_count}</td>
              <td>{repo.forks_count}</td>
              <td>{repo.open_issues_count}</td>
              <td>{repo.watchers_count}</td>
              {/* <td>{repo.pushed_at}</td> */}
            </tr>
          ))}
        </StyledTBody>
      </table>
      <Pages />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`;

const StyledTHead = styled.thead`
  text-align: left;
  text-decoration: underline;
`;

const StyledTBody = styled.tbody`
  text-align: left;
`;

export default Table;
