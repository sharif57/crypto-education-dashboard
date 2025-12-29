import baseApi from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/user_profile/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    userList: builder.query({
      query: () => ({
        url: "/auth/user_details/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/user_profile/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // /auth/add_user/
    addUser: builder.mutation({
      query: (data) => ({
        url: "/auth/add_user/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // /referral/withdrawal_manager/
    withdrawalManager: builder.query({
      query: () => ({
        url: "/referral/withdrawal_manager/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // /referral/withdrawal_manager/12/
   // In your API slice (useSlice.js or similar)
withdrawApproved: builder.mutation({
  query: ({ id, status }) => ({
    url: `/referral/withdrawal_manager/${id}/`,
    method: "PATCH",
    body: { status },               
  }),
  invalidatesTags: ["Withdrawal"], 
}),

  }),
});

export const {useUserProfileQuery, useUserListQuery, useUpdateProfileMutation, useAddUserMutation , useWithdrawalManagerQuery , useWithdrawApprovedMutation} = userApi;
