import baseApi from "../api/baseApi";

export const pdfApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    pdfUpload: builder.mutation({
      query: (data) => ({
        url: "/ai/upload_global_pdf/",
        method: "POST",
        body: data,
      }),
    }),

    AllPdf: builder.query({
      query: () => ({
        url: "/ai/all_global_pdf/",
        method: "GET",
      }),
      providesTags: ["Pdf"],
    }),

    deletePdf: builder.mutation({
      query: (id) => ({
        url: `/ai/delete_global_pdf/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pdf"],
    }),
   
  }),
});

export const { usePdfUploadMutation , useAllPdfQuery , useDeletePdfMutation} = pdfApi;
