import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.theclue.io/api/v1',
    // baseUrl: 'http://10.10.12.49:8009/api/v1',
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
    'Resource',
  ], // Added all necessary tags
  endpoints: () => ({}),
});

export default baseApi;
