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
   
  }),
});

export const { usePdfUploadMutation } = pdfApi;
