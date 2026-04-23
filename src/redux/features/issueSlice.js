import baseApi from "../api/baseApi";

export const issueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    issueList: builder.query({
      query: () => ({
        url: "/settings/issues/",
        method: "GET",
      }),
      providesTags: ["Issue"],
    }),
    // /settings/issues/0ce27b4e-9d67-4206-89e1-318b5ca90d6a/status/
    updateIssueStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/settings/issues/${id}/status/`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Issue"],
    }),

  }),
});

export const { useIssueListQuery, useUpdateIssueStatusMutation } = issueApi;


