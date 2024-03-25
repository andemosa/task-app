import { createContext, useContext } from "react";

import { IUser } from "@/interfaces/user";

type AuthContextType = {
  user: IUser | null;
  loginUser: (user: IUser) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      `useAuthContext can only be used inside a AuthContextProvider`
    );
  }

  return context;
};
