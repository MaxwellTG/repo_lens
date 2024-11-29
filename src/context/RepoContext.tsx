import { createContext, useContext, useState, useEffect } from 'react'
import { repoInterface, Repo } from '../api/repositoryInterface'
import { ApiToUse } from '../api/services/GithubService'

type Props = {
    children: React.ReactNode
}

type RepoContextType = {
    setToDefault: () => void
    type: RepoTypes
    selectTypeFilter: (input: RepoTypes) => void
    sort: RepoSorts
    selectSort: (input: RepoSorts) => void
    direction: RepoDirections
    selectDirection: (input: RepoDirections) => void
    per_page: number // default 30, max 100
    selectPer_page: (input: number) => void
    page: number
    selectPage: (input: number) => void
    incrementPage: () => void
    decrementPage: () => void
    repoData: Repo[]
    getRepoData: (input: string) => void
}

type RepoTypes = 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member'
type RepoSorts = 'created' | 'updated' | 'pushed' | 'full_name'
type RepoDirections = 'asc' | 'desc'

const RepoContext = createContext<RepoContextType | null>(null)

export const RepoContextProvider = ({ children }: Props) => {
    const [apiToUse, apiToUseSetter] = useState<ApiToUse>('username')
    const [userInput, userInputSetter] = useState<string | null>(null)

    const [type, typeSetter] = useState<RepoTypes>('all')
    const [sort, sortSetter] = useState<RepoSorts>('created')
    const [direction, directionSetter] = useState<RepoDirections>('asc')
    const [per_page, per_pageSetter] = useState(30)
    const [page, pageSetter] = useState(1)
    const [repoData, repoDataSetter] = useState<Repo[]>([])

    useEffect(() => {
        // Github's REST API states that the default direction for sorting by 'full_name' is 'asc' and the default direction for all others is 'desc'
        if (sort !== 'full_name') directionSetter('desc')
    }, [sort])

    const setToDefault = () => {
        apiToUseSetter('username')
        userInputSetter(null)
        typeSetter('all')
        sortSetter('created')
        directionSetter('asc')
        per_pageSetter(30)
        pageSetter(1)
        repoDataSetter([])
    }
    const selectTypeFilter = (input: RepoTypes) => typeSetter(input)
    const selectSort = (input: RepoSorts) => sortSetter(input)
    const selectDirection = (input: RepoDirections) => directionSetter(input)

    const selectPer_page = (input: number) => {
        per_pageSetter(input)
    }

    const selectPage = (input: number) => {
        // TODO: add a check to make sure the page exists in repoData
        pageSetter(input)
    }

    const incrementPage = () => {
        // TODO: add a check to make sure page is not greater than the last page
        pageSetter(page + 1)
    }

    const decrementPage = () => {
        // TODO: add a check to make sure page is not less than 1
        pageSetter(page - 1)
    }

    const getRepoData = () => {
        if (!userInput) return

        repoInterface
            .getRepos(userInput, apiToUse)
            .then((data) => {
                repoDataSetter(data)
                // TODO: UI error handling
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    return (
        <RepoContext.Provider
            value={{
                setToDefault,
                type,
                selectTypeFilter,
                sort,
                selectSort,
                direction,
                selectDirection,
                per_page,
                selectPer_page,
                page,
                selectPage,
                incrementPage,
                decrementPage,
                repoData,
                getRepoData,
            }}
        >
            {children}
        </RepoContext.Provider>
    )
}

export const useRepo = () => {
    const context = useContext(RepoContext)

    if (!context)
        throw new Error(
            'RepoContext must be called from within the RepoContextProvider'
        )

    return context
}
