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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {useUserProfileQuery, useUserListQuery, useUpdateProfileMutation} = userApi;
