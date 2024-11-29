import { Octokit } from '@octokit/core'
import { components } from '@octokit/openapi-types'
import { RequestParameters } from '@octokit/types'

export type ApiToUse = 'username' | 'org'

class GitHubRepositoryService {
    private static instance: GitHubRepositoryService
    private octokit: Octokit

    private constructor() {
        // this.octokit = new Octokit({
        //   auth: token || process.env.GITHUB_TOKEN,
        //   userAgent: 'GitHub Repository Fetcher v1.0',
        // });
        this.octokit = new Octokit()
    }

    public static getInstance(): GitHubRepositoryService {
        if (!GitHubRepositoryService.instance) {
            GitHubRepositoryService.instance = new GitHubRepositoryService()
        }
        return GitHubRepositoryService.instance
    }

    public async getOrgRepositories(
        org: string,
        options?: RequestParameters
    ): Promise<GitHubRepo[]> {
        try {
            const response = await this.octokit.request(
                `GET /orgs/${org}/repos`,
                {
                    org: org,
                    request: { ...options },
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                    },
                }
            )

            return response.data
        } catch (error) {
            console.error(
                `[GithubInterface] Error fetching repositories for org: ${org}:`,
                error
            )
            throw error
        }
    }

    public async getUserRepositories(
        username: string,
        options?: RequestParameters
    ): Promise<GitHubRepo[]> {
        try {
            const response = await this.octokit.request(
                `GET /users/${username}/repos`,
                {
                    username: username,
                    request: { ...options },
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                    },
                }
            )

            return response.data
        } catch (error) {
            console.error(
                `[GithubInterface] Error fetching repositories for username: ${username}:`,
                error
            )
            throw error
        }
    }
}

export type GitHubRepo = components['schemas']['full-repository']
export const githubService = GitHubRepositoryService.getInstance()
export default GitHubRepositoryService
