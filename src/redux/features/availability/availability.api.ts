import { baseApi } from "../../base.api";

const availabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllAvailability: builder.query({
      query: (query: { key: string; value: string }[]) => {
        const params = new URLSearchParams();

        query?.forEach(({ key, value }) => {
          params.append(key, value);
        });

        return {
          url: "/availabilities",
          method: "GET",
          params,
        };
      },
      providesTags: ['availabilities']
    }),
    createAvailability: builder.mutation({
      query: (data) => {
        return {
          url: "/availabilities",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ['availabilities']
    }),
    updateAvailability: builder.mutation({
      query: (data) => {
        return {
          url: "/availabilities",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ['availabilities']
    }),
  }),
});

export const {
  useFetchAllAvailabilityQuery,
  useCreateAvailabilityMutation,
  useUpdateAvailabilityMutation,
} = availabilityApi;
