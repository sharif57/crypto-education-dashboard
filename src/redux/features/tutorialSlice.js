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
            query: ({data, id}) => ({
                url: `/tutorials/categories/courses/${id}/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),



        singleCategory: builder.query({
            query: (id) => ({
                url: `/tutorials/categories/courses/${id}/`,
                method: "GET",
            }),
            providesTags: ["Video"],
        }),

        //   categoryVideo: builder.query({
        //     query: (id) => ({
        //         url: `/tutorials/categories/courses/${id}/`,
        //         method: "GET",
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        //         },
        //     }),

        //     providesTags: ["Category"],
        // }),

        categoryRelatedVideosAdd: builder.mutation({
            query: ({ data }) => ({
                url: `/tutorials/videos/`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),
        singleVideo: builder.query({
            query: (id) => ({
                url: `/tutorials/categories/${id}/`,
                method: "GET",
            }),
            providesTags: ["Video"],
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
        }),

        allCourse: builder.query({
            query: () => ({
                url: "/tutorials/courses/",
                method: "GET",
            }),
            providesTags: ["Video"],
        }),
        addCourse: builder.mutation({
            query: (data) => ({
                url: "/tutorials/courses/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),

             updateCourse: builder.mutation({
            query: ({data, id}) => ({
                url: `/tutorials/courses/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Video"],
        }),

        courseDelete: builder.mutation({
            query: (id) => ({
                url: `/tutorials/courses/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Video"],
        }),

        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/tutorials/videos/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Video"],
        }),



    }),
});

export const { useAllCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useSingleCategoryQuery , useCategoryRelatedVideosAddMutation, useRelatedVideoDeleteMutation, useUpdateCategoryMutation , useAllCourseQuery , useAddCourseMutation , useUpdateCourseMutation , useCourseDeleteMutation , useSingleVideoQuery, useDeleteVideoMutation } = tutorialApi;
