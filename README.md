# repo_lens
- About:
Repo Lens allows user to search, filter, and view repository data utlizing GitHub's REST API.

State is housed in a context provider. When a user interacts with the form, their changes are stored in state awaiting submission. When submitting, the state is passed along to an interface abstraction which routes to a specified service. Currently, only the GitHub API is being accessed, but this interface will make it easier to add more (e.g. GitLab) in the future. The GitHubSerivce is a singleton responsible for directly interacting with GitHub's API via their octokit library. Once data is recieved, the context state is updated and all consumers are updated. 

- Stack:
    * TS - Even for small applications, TS provides enough value with static typing and IDE support, this compounds as the project scales in time, complexity, and dev count
    * React - Continues to be the most popular JS frontend framework, this means more support and a larger talent pool to draw from.
    * Vite - Super fast compilation and HMR. As projects scale and reloads become slower, the increased time between each feedback loop and hinder developer progress, choosing a performant build/bundler is critical for DevX
    * Styled Components - Inherently scoped styles eliminates spaghetti style sheet problems. Though unused for now, dynamic styles are much easier to develop.

- Steps to run:
 1. Clone this repo
 2. run `npm install && npm run dev` in the directory `repo_lens`

- Future development:
    * Add GitLab support
    * Support auth
    * More/better data display (currently only displaying a subset of data about each repo), this is probably the most important
    * Add more functionality to pagination (first, last, and i-3 -> i+3)
    * Better inflight request UI
