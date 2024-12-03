import React from "react";
import styled from "styled-components";
import {
  useRepo,
  RepoSorts,
  RepoTypes,
  Directions,
} from "../context/RepoContext";
import { OwnerType } from "../api/services/GithubService";

const RepoSearchForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getRepoData,
  } = useRepo();

  const onSubmit = async () => {
    try {
      await getRepoData();
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label>Owner</Label>
        <Input
          placeholder="username or organization"
          {...register("owner", {
            required: "An owner name is required"
          })}
        />
        {errors.owner && <ErrorMessage>{errors.owner.message}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <Label>Owner Type</Label>
        <Select
          {...register("ownerType")}
        >
          {Object.values(OwnerType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        {errors.ownerType && (
          <ErrorMessage>{errors.ownerType.message}</ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label>Repo Type</Label>
        <Select {...register("type")}>
          {Object.values(RepoTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Sort By</Label>
        <Select {...register("sort")}>
          {Object.values(RepoSorts).map((sort) => (
            <option key={sort} value={sort}>
              {sort}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Sort Direction</Label>
        <Select {...register("direction")}>
          {Object.values(Directions).map((direction) => (
            <option key={direction} value={direction}>
              {direction}
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>Repos per Page</Label>
        <Input
          type="number"
          {...register("per_page", {
            min: { value: 1, message: "Minimum 1 repository" },
            max: { value: 100, message: "Maximum 100 repositories" },
          })}
        />
        {errors.per_page && (
          <ErrorMessage>{errors.per_page.message}</ErrorMessage>
        )}
      </InputGroup>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Searching..." : "Search"}
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  padding-left: 0px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: white;
  text-align: left;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

export default RepoSearchForm;
