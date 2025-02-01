import { baseApi } from "../../base.api";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { useLogInMutation, useRegisterMutation, useUpdateProfileMutation } = authApi;
