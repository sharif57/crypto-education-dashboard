
import { ArrowLeft, Upload, X } from "lucide-react";
import { useState } from "react";
import { useAllPdfQuery, useDeletePdfMutation, usePdfUploadMutation } from "../../../redux/features/pdfSlice";
import toast from "react-hot-toast";

export default function TrainAI() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pdfUpload, { isLoading }] = usePdfUploadMutation();
  const [deletePdf] =useDeletePdfMutation();

  const {data, refetch} =useAllPdfQuery();


  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await pdfUpload(formData).unwrap();

      console.log(response);
      
      // Update pdfFiles state with new uploads
      const newFiles = selectedFiles.map((file, index) => ({
        id: pdfFiles.length + index + 1,
        name: file.name,
      }));
      
      setPdfFiles([...pdfFiles, ...newFiles]);
      setSelectedFiles([]);
      setIsModalOpen(false);
      toast.success("PDF uploaded successfully");
      await refetch(); // Refetch to get the latest data
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error (e.g., show error message)
    }
  };

  //  deletePdf: builder.mutation({
  //     query: (id) => ({
  //       url: `/ai/delete_global_pdf/${id}/`,
  //       method: "DELETE",
  //     }),
  //     invalidatesTags: ["Pdf"],
  //   }),

  const handleDelete = async (id) => {
    try {
   const response =   await deletePdf(id).unwrap();
      console.log("Delete response:", response);
      toast.success("PDF deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete PDF");
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="bg-[#373737] min-h-screen">
      {/* Header */}
      <div className="bg-gray-700 px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => window.history.back()}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white text-base font-medium">Uploaded PDF</span>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload PDF
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 ">
          {data?.data?.map((file) => (
            <div
              key={file.id}
              className="bg-[#676767] rounded-lg p-4 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-3">
                <div className="relative">
                  <div className="w-8 h-10 bg-white rounded-sm relative">
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-sm leading-none">
                      PDF
                    </div>
                    <div className="absolute top-3 left-1 right-1 space-y-1">
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-white text-sm text-center">
                {file?.pdf_filename}
              </span>
              <button onClick={() => handleDelete(file?.object_id)} className="text-white text-sm mt-4 bg-red w-full px-2 py-1 rounded">delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (           
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#373737] rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-medium">Upload PDF Files</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-white text-sm mb-2">Selected Files:</p>
                <ul className="text-white text-sm space-y-1 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={isLoading || selectedFiles.length === 0}
                className={`px-4 py-2 text-white rounded-md flex items-center gap-2 ${
                  isLoading || selectedFiles.length === 0
                    ? "bg-teal-300 cursor-not-allowed"
                    : "bg-teal-500 hover:bg-teal-600"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}