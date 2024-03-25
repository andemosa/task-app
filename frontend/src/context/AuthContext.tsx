import { useState, useMemo, useEffect } from "react";

import { AuthContext } from "./useAuthContext";
import { clearUserFromLS, getUserFromLS, setUserToLS } from "@/services/axios";
import { IUser } from "@/interfaces/user";

type PageProps = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: PageProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (getUserFromLS()) {
      setUser(getUserFromLS());
    }
  }, []);

  const loginUser = (user: IUser) => {
    setUserToLS(user);
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    clearUserFromLS();
  };

  const value = useMemo(
    () => ({
      user,
      loginUser,
      logOut,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
