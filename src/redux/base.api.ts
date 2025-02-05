// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "./store";

export const tagTypes = [
  "availabilities",
  "skills",
  "reviews",
  "sessions",
  "teachers",
];

const baseQuery = fetchBaseQuery({
  baseUrl: "https://skill-sync-server-xi.vercel.app/api/v1",
  // baseUrl: "http://localhost:8000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }

    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "skill-sync-api",
  tagTypes,
  baseQuery,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
});
