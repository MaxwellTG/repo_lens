import { githubService, GitHubRepo, ApiToUse } from './services/GithubService'

const getUserRepos = (username: string) => {
    return githubService.getUserRepositories(username)
}

const getOrgRepos = (org: string) => {
    return githubService.getOrgRepositories(org)
}

const getRepos = (input: string, apiToUse: ApiToUse) => {
    if (apiToUse === 'username') {
        return getUserRepos(input)
    } else if (apiToUse === 'org') {
        return getOrgRepos(input)
    } else {
        throw new Error('Invalid api selection')
    }
}
export const repoInterface = {
    getUserRepos: getUserRepos,
    getOrgRepos: getOrgRepos,
    getRepos: getRepos,
}

export type Repo = GitHubRepo
