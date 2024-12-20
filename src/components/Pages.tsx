import React from "react";
import styled from "styled-components";
import { useRepo } from "../context/RepoContext";

const Pages = () => {
  const { page, selectPage } = useRepo();

  const handleOnFirst = () => {
    // TODO: Implment when handleOnLast is ready
    selectPage(1);
  };
  const handleOnPrevious = () => {
    selectPage(page - 1);
  };
  const handleOnNext = () => {
    selectPage(page + 1);
  };
  const handleOnLast = () => {
    // TODO: Confirm this info is available with a call to the API or from previously fetched data
    selectPage(-1);
  };

  return (
    <PagesContainer>
      <PageButton onClick={() => handleOnPrevious()}>Previous</PageButton>
      <CurrentPage>{page}</CurrentPage>
      <PageButton onClick={() => handleOnNext()}>Next</PageButton>
    </PagesContainer>
  );
};

const PagesContainer = styled.div`
  display: flex;
  gap: 15px;
  max-width: 500px;
  border-radius: 8px;
`;

const PageButton = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: #222;
  background-color: #f0f0f0;
`;

const CurrentPage = styled(PageButton)`
  cursor: default;
`;

export default Pages;
