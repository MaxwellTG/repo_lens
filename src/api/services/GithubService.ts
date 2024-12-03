import { Octokit } from "@octokit/core";
import { components } from "@octokit/openapi-types";
import { RequestParameters } from "@octokit/types";

export enum OwnerType {
  USERNAME = "username",
  ORG = "org",
}

class GitHubRepositoryService {
  public static instance: GitHubRepositoryService;
  public octokit: Octokit;

  private constructor() {
    // TODO: Add auth
    // this.octokit = new Octokit({
    //   auth: process.env.GITHUB_TOKEN,
    // });
    this.octokit = new Octokit();
  }

  public static getInstance(): GitHubRepositoryService {
    if (!GitHubRepositoryService.instance) {
      GitHubRepositoryService.instance = new GitHubRepositoryService();
    }
    return GitHubRepositoryService.instance;
  }

  public async getOrgRepositories(
    org: string,
    options: RequestParameters,
  ): Promise<GitHubRepo[]> {
    try {
      const response = await this.octokit.request(`GET /orgs/${org}/repos`, {
        org: org,
        ...options,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      console.log("successfully retrieved org repos");
      return response.data;
    } catch (error) {
      console.error(
        `[GithubInterface] Error fetching repositories for org: ${org}:`,
        error,
      );
      throw error;
    }
  }

  public async getUserRepositories(
    username: string,
    options: RequestParameters,
  ): Promise<GitHubRepo[]> {
    try {
      const response = await this.octokit.request(
        `GET /users/${username}/repos`,
        {
          username: username,
          ...options,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      console.log("successfully retrieved user repos");
      return response.data;
    } catch (error) {
      console.error(
        `[GithubInterface] Error fetching repositories for username: ${username}:`,
        error,
      );
      throw error;
    }
  }
}

export type GitHubRepo = components["schemas"]["full-repository"];
export const githubService = GitHubRepositoryService.getInstance();
export default GitHubRepositoryService;
