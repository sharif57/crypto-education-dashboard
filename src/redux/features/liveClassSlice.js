import baseApi from "../api/baseApi";


export const liveClassApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        liveClass: builder.query({
            query: () => ({
                url: "/tutorials/live_classes/",
                method: "GET",
               
            }),

            providesTags: ["LiveClass"],
        }),

        deleteLiveClass: builder.mutation({
            query: (id) => ({
                url: `/tutorials/live_classes/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["LiveClass"],
        }),
        createLiveClass: builder.mutation({
            query: (data) => ({
                url: "/tutorials/live_classes/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["LiveClass"],
        }),

        updateLiveClass: builder.mutation({
            query: ( data ) => ({
                url: `/tutorials/live_classes_update`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["LiveClass"],
        }),


    }),
});

export const { useLiveClassQuery, useDeleteLiveClassMutation, useCreateLiveClassMutation, useUpdateLiveClassMutation } = liveClassApi;
