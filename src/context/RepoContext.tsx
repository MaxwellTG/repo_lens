import { createContext, useContext, useState, useEffect } from "react";
import { repoInterface, Repo } from "../api/repositoryInterface";
import { OwnerType } from "../api/services/GithubService";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";

type Props = {
  children: React.ReactNode;
};

export enum RepoTypes {
  ALL = "all",
  PUBLIC = "public",
  PRIVATE = "private",
  FORKS = "forks",
  SOURCES = "sources",
  MEMBER = "member",
}

export enum RepoSorts {
  CREATED = "created",
  UPDATED = "updated",
  PUSHED = "pushed",
  FULL_NAME = "full_name",
}

export enum Directions {
  ASC = "asc",
  DESC = "desc",
}

export interface FormData {
  ownerType: OwnerType;
  owner: string;
  type: RepoTypes;
  sort: RepoSorts;
  direction: Directions;
  per_page: number;
}

interface RepoContextType extends UseFormReturn<FormData> {
  page: number;
  selectPage: (input: number) => void;
  repoData: Repo[];
  getRepoData: () => void;
  setToDefault: () => void;
}

const RepoContext = createContext<RepoContextType | null>(null);

export const RepoContextProvider = ({ children }: Props) => {
  const [repoData, setRepoData] = useState<Repo[]>([]);
  const [page, setPage] = useState(1);

  // Form method with default values
  const formData = useForm<FormData>({
    defaultValues: {
      ownerType: OwnerType.USERNAME,
      owner: "",
      type: RepoTypes.ALL,
      sort: RepoSorts.CREATED,
      direction: Directions.DESC,
      per_page: 30,
    },
  });

  // TODO: Update sorting? Possible product question
  // Github's REST API states that the default direction for sorting by 'full_name' is 'asc' and the default direction for all others is 'desc'
//   const currentSortType = formData.watch("sort");
//   if (currentSortType !== RepoSorts.FULL_NAME)
//     formData.setValue("direction", Directions.DESC);

    useEffect(() => {
        getRepoData();
    }, [page])

  // Functions
  const setToDefault = () => {
    console.log("set to default");
  };

  const selectPage = (page: number) => {
    setPage(page);
  };

  const getRepoData = () => {
    const owner = formData.getValues("owner");
    if (!owner) {
      console.warn("No user input");
      return;
    }

    const ownerType = formData.getValues("ownerType");
    repoInterface
      .getRepos(owner, ownerType, {type: formData.getValues("type"), sort: formData.getValues("sort"), direction: formData.getValues("direction"), per_page: formData.getValues("per_page"), page: page})
      .then((data) => {
        console.log("data: ", data);
        setRepoData(data);
      })
      // TODO: UI error handling
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <RepoContext.Provider
      value={{
        ...formData,
        page,
        selectPage,
        repoData,
        getRepoData,
        setToDefault,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => {
  const context = useContext(RepoContext);

  if (!context)
    throw new Error(
      "RepoContext must be called from within the RepoContextProvider",
    );

  return context;
};
