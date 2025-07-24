import baseApi from "../api/baseApi";

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    privacyPolicies: builder.query({
      query: () => ({
        url: "/settings/privacy_policies/",
        method: "GET",
      }),
      providesTags: ["Privacy"],
    }),

      updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/settings/privacy_policies/",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Privacy"],
    }),

      terms: builder.query({
      query: () => ({
        url: "/settings/terms_conditions/",
        method: "GET",
      }),
      providesTags: ["Privacy"],
    }),

      updateTerms: builder.mutation({
      query: (data) => ({
        url: "/settings/terms_conditions/",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Privacy"],
    }),

  }),
});

export const {usePrivacyPoliciesQuery, useUpdatePrivacyPolicyMutation, useTermsQuery, useUpdateTermsMutation} = privacyApi;
