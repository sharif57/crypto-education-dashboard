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

  }),
});

export const {useUserProfileQuery, useUserListQuery, useUpdateProfileMutation, useAddUserMutation} = userApi;
