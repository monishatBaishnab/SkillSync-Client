import { baseApi } from "../../base.api";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllSkill: builder.query({
      query: (query: { key: string; value: string }[]) => {
        const params = new URLSearchParams();

        query?.forEach(({ key, value }) => {
          params.append(key, value);
        });

        return {
          url: "/skills",
          method: "GET",
          params: params,
        };
      },
    }),
    createSkill: builder.mutation({
      query: (data) => {
        return {
          url: "/skills",
          method: "POST",
          body: data,
        };
      },
    }),
    updateSkill: builder.mutation({
      query: (data) => {
        return {
          url: "/skills",
          method: "PUT",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useFetchAllSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
} = sessionApi;
