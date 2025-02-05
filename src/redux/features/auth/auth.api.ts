import { baseApi } from "../../base.api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAvailableTeachers: builder.query({
      query: (query: { key: string; value: string }[]) => {
        const params = new URLSearchParams();

        query?.forEach(({ key, value }) => {
          params.append(key, value);
        });

        return {
          url: "/auth/available-teachers",
          method: "GET",
          params,
        };
      },
    }),
    logIn: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    updateProfile: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/auth/update-profile/${id}`,
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
  useFetchAvailableTeachersQuery,
} = authApi;
