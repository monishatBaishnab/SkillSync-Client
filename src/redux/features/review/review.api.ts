import { baseApi } from "../../base.api";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllReviews: builder.query({
      query: () => {
        return {
          url: "/review",
          method: "GET",
        };
      },
      providesTags: ["reviews"],
    }),
    createReview: builder.mutation({
      query: (data) => {
        return {
          url: "/review",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const { useFetchAllReviewsQuery, useCreateReviewMutation } = reviewApi;
