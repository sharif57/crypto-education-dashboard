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

        singleCategory: builder.query({
            query: (id) => ({
                url: `/tutorials/category_videos/${id}/`,
                method: "GET",
            }),
            providesTags: ["Video"],
        }),

        categoryRelatedVideosAdd: builder.mutation({
            query: ({ data }) => ({
                url: `/tutorials/videos/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),
        relatedVideoDelete: builder.mutation({
            query: (id) => ({
                url: `/tutorials/videos/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Video"],
        }),

        updateCategory: builder.mutation({
            query: ({data, id}) => ({
                url: `/tutorials/categories/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Video"],
        })


    }),
});

export const { useAllCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useSingleCategoryQuery , useCategoryRelatedVideosAddMutation, useRelatedVideoDeleteMutation, useUpdateCategoryMutation} = tutorialApi;
