import { FieldValues, useForm } from "react-hook-form";
import { useRepo, RepoTypes, RepoSorts } from "../context/RepoContext";

// This breaks the pattern of service abstraction behind the repoInterface
import { ApiToUse } from "../api/services/GithubService";

const useFormProps = {
  defaultValues: {
    owner: "",
    apiToUse: "username",
    type: "all",
    sort: "created",
  },
};

function Form() {
  const { register, handleSubmit } = useForm(useFormProps);
  const {
    ownerSetter,
    getRepoData,
    apiToUse,
    apiToUseSetter,
    type,
    selectTypeFilter,
    sort,
    selectSort,
    repoData,
  } = useRepo();

  const onSubmit = (data: FieldValues) => {
    console.log("onSubmit: ", data.owner);
    getRepoData();
  };

  const onError = (errors: FieldValues) => {
    console.warn("[Form] onError", errors);
  };

  const handleOnOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    ownerSetter(e.target.value);
  };

  const handleOnApiToUse = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiToUseSetter(e.target.value as ApiToUse);
  };

  const handleOnTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectTypeFilter(e.target.value as RepoTypes);
  };

  const handleOnSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectSort(e.target.value as RepoSorts);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input
        {...register("owner", {
          required: true,
          onChange: (e) => handleOnOwner(e),
        })}
        placeholder=""
      />
      <select
        {...register("apiToUse", { onChange: (e) => handleOnApiToUse(e) })}
      >
        <option value="username">User</option>
        <option value="org">Organization</option>
      </select>
      <select {...register("type", { onChange: (e) => handleOnTypeChange(e) })}>
        <option value="all">All Repos</option>
        <option value="public">Public Repos</option>
        <option value="private">Private Repos</option>
        <option value="forks">Forks</option>
        <option value="sources">Sources</option>
        <option value="member">Members</option>
      </select>
      <select {...register("sort", { onChange: (e) => handleOnSort(e) })}>
        <option value="created">Created</option>
        <option value="updated">Updated</option>
        <option value="pushed">Pushed</option>
        <option value="full_name">Full Name</option>
      </select>
      <select
        {...register("direction", { onChange: (e) => handleOnDirection(e) })}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <select {...register("per_page", { onChange: (e) => handlePer_page(e) })}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
      {/* {repoData && (<select {...register('page', {onChange: (e) => handlePage(e)})}>
            </select>)} */}
      <button type="submit">Find Repos</button>
    </form>
  );
}

export default Form;
