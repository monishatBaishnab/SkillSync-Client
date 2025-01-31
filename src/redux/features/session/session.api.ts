import { baseApi } from "../../base.api";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllSessions: builder.query({
      query: (query: { key: string; value: string }[]) => {
        const params = new URLSearchParams();

        query?.forEach(({ key, value }) => {
          params.append(key, value);
        });

        return {
          url: "/sessions",
          method: "GET",
          params,
        };
      },
      providesTags: ["sessions"],
    }),
    createSession: builder.mutation({
      query: (data) => {
        return {
          url: "/session",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["sessions", "availabilities"],
    }),
    updateSession: builder.mutation({
      query: (data) => {
        return {
          url: "/session",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["session"],
    }),
  }),
});

export const {
  useFetchAllSessionsQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
} = sessionApi;
