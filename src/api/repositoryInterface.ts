import { githubService, GitHubRepo, OwnerType } from "./services/GithubService";
import { RequestParameters } from "@octokit/types";

const getUserRepos = (username: string, options: RequestParameters) => {
  return githubService.getUserRepositories(username, options);
};

const getOrgRepos = (org: string, options: RequestParameters) => {
  return githubService.getOrgRepositories(org, options);
};

const getRepos = async (owner: string, ownerType: OwnerType, options: RequestParameters) => {
  console.log("getting repos: ", owner, ownerType, options);
  if (ownerType === "username") {
    return getUserRepos(owner, options);
  } else if (ownerType === "org") {
    return getOrgRepos(owner, options);
  } else {
    throw new Error("Invalid api selection");
  }
};
export const repoInterface = {
  getUserRepos: getUserRepos,
  getOrgRepos: getOrgRepos,
  getRepos: getRepos,
};

export type Repo = GitHubRepo;
