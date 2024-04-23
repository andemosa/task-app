// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { IUser } from "@/interfaces/user";
import { RootState } from "@/store";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (error as any).message === "string"
  );
}

const FORM_METHODS = {
  POST: "POST",
  GET: "GET",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

interface UserResponse {
  user: IUser;
}

interface Request {
  url: string;
  method: keyof typeof FORM_METHODS;
}

interface AuthRequest extends Request {
  body: {
    email?: string;
    password?: string;
    name?: string;
  };
}

interface TaskRequest extends Request {
  body: {
    title?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    reminderTime?: number;
    completed?: boolean;
  };
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.user?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (
      (result.error && result.error.status === 401) ||
      result.error?.status === 403
    ) {
      if (window.localStorage.getItem("persist:root")) {
        const userObj = JSON.parse(
          JSON.parse(window.localStorage.getItem("persist:root")!)?.auth
        );
        if (userObj && userObj.user) {
          window.localStorage.removeItem("persist:root");
          location.reload();
        }
      }
    }
    return result;
  };

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth(baseQuery),
  reducerPath: "api",
  tagTypes: ["GetTasks"],
  endpoints: (build) => ({
    auth: build.mutation<UserResponse, AuthRequest>({
      query: (data) => ({
        url: data.url,
        method: data.method,
        body: data.body,
      }),
      invalidatesTags: ["GetTasks"],
    }),
    getTasks: build.query({
      query: ({ date, page }) =>
        `/tasks?date=${date?.getFullYear()}-${String(
          date && date?.getMonth() + 1
        ).padStart(2, "0")}-${String(date?.getDate()).padStart(
          2,
          "0"
        )}&page=${page}`,
      // `providesTags` determines which 'tag' is attached to the
      // cached data returned by the query.
      providesTags: ["GetTasks"],
    }),
    tasks: build.mutation<UserResponse, TaskRequest>({
      query: (data) => ({
        url: data.url,
        method: data.method,
        body: data.body,
      }),
      invalidatesTags: ["GetTasks"],
    }),
  }),
});

// Hooks are auto-generated by RTK-Query
// Same as `apiSlice.endpoints.getQuotes.useQuery`
export const { useAuthMutation, useGetTasksQuery, useTasksMutation } = apiSlice;
