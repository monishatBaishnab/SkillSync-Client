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
      providesTags: ["skills"],
    }),
    createSkill: builder.mutation({
      query: (data) => {
        return {
          url: "/skills",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["skills"],
    }),
    updateSkill: builder.mutation({
      query: (data) => {
        return {
          url: `/skills/${data?.id}`,
          method: `PUT`,
          body: data?.data,
        };
      },
      invalidatesTags: ["skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => {
        return {
          url: `/skills/${id}`,
          method: `DELETE`,
        };
      },
      invalidatesTags: ["skills"],
    }),
  }),
});

export const {
  useFetchAllSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = sessionApi;
