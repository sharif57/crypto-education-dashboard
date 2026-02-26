import baseApi from "../api/baseApi";

export const resourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
//    /tutorials/additional-resources/
    createResource: builder.mutation({
      query: (data) => ({
        url: "/tutorials/additional-resources/",
        method: "POST",
        body: data,
      }),
        invalidatesTags: ["Resource"],
    }),

    getResources: builder.query({
        query: () => ({
          url: `/tutorials/additional-resources/`,
          method: "GET",
        }),
         providesTags: ["Resource"],
    }),
    updateResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tutorials/additional-resources/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Resource"],
    }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/tutorials/additional-resources/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
    }),
   
  }),
});

export const {
    useCreateResourceMutation,
    useGetResourcesQuery,
    useUpdateResourceMutation,
    useDeleteResourceMutation,
 } = resourceApi;
