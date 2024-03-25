import { SWRConfig } from "swr";

import { axiosInstance } from "@/services/axios";
import { useAuthContext } from "./useAuthContext";

type PageProps = {
  children: React.ReactElement;
};

const CustomSWR = ({ children }: PageProps) => {
  const { logOut } = useAuthContext();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        onError: (error) => {
          if (
            error.message &&
            (error.message === "You are not authenticated!" ||
              error.message === "You are not authorized!")
          ) {
            logOut();
          }
        },
        fetcher: ([url, queryParams = ""]) =>
          axiosInstance.get(`${url}${queryParams}`).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default CustomSWR;
