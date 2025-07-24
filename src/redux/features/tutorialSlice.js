import baseApi from "../api/baseApi";


export const tutorialApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        allCategories: builder.query({
            query: () => ({
                url: "/tutorials/categories/",
                method: "GET",
               
            }),

            providesTags: ["Video"],
        }),

        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/tutorials/categories/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Video"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/tutorials/categories/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),


    }),
});

export const { useAllCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation } = tutorialApi;
