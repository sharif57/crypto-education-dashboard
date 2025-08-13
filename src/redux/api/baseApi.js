import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://194.59.165.181:8080/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");

      // console.log("Current token:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // console.log("Prepared headers:", headers);
      return headers;
    },
  }),
  tagTypes: [
    "User",
    'LiveClass',
    'Video',
    "Privacy",
  ], // Added all necessary tags
  endpoints: () => ({}),
});

export default baseApi;
