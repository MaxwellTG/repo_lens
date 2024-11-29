import { githubService, GitHubRepo, ApiToUse } from './services/GithubService'

const getUserRepos = (username: string) => {
    return githubService.getUserRepositories(username)
}

const getOrgRepos = (org: string) => {
    return githubService.getOrgRepositories(org)
}

const getRepos = async (owner: string, apiToUse: ApiToUse) => {
    console.log('getting repos...');
    if (apiToUse === 'username') {
        return getUserRepos(owner)
    } else if (apiToUse === 'org') {
        return getOrgRepos(owner)
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
