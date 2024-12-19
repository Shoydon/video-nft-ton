import { Dispatch } from "react";

export type User = {
    name: String
    bio : String
    techStack: String[],
    github : String,
    linkedin : String,
    role : string,
}

export type GlobalContextType = {
  user: User | null;
  setUser: Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};