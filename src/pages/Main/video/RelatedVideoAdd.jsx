

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCategoryRelatedVideosAddMutation } from "../../../redux/features/tutorialSlice";
import toast from "react-hot-toast";

export default function RelatedVideoAdd() {
  const { id } = useParams(); // Category ID, e.g., "20"
  const [searchParams] = useSearchParams();
  const catId = searchParams.get("catId"); // Course ID from query param
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setVideoPreview] = useState(null);
  const [isDraggingOverVideo, setIsDraggingVideo] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isDraggingOverPdf, setIsDraggingPdf] = useState(false);
  const videoFileRefInput = useRef(null);
  const pdfFileRefInput = useRef(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");

  const [categoryRelatedVideosAdd] = useCategoryRelatedVideosAddMutation();

  useEffect(() => {
    return () => {
      if (previewVideo) {
        URL.revokeObjectURL(previewVideo);
      }
    };
  }, [previewVideo]);

  // Handle video file selection and preview
  const handleVideoFileSelect = (file) => {
    if (
      file &&
      ["video/mp4", "video/webm", "video/avi"].includes(file.type)
    ) {
     

      setSelectedVideo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid video file (MP4, WebM, AVI).");
    }
  };

  // Handle PDF, DOCX, DOC file selection
  const handlePdfFileSelect = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file && validTypes.includes(file.type)) {
      setSelectedPdf(file);
    } else {
      alert("Please select a valid file (PDF, DOCX, or DOC).");
    }
  };

  // Handle file input change for video
  const handleVideoInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleVideoFileSelect(file);
    }
  };

  const handlePdfInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfFileSelect(file);
    }
  };

  const handleVideoDraggingOver = (e) => {
    e.preventDefault();
    setIsDraggingVideo(true);
  };

  const handleVideoDraggingLeave = (e) => {
    e.preventDefault();
    setIsDraggingVideo(false);
  };

  const handleVideoDropping = (e) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleVideoFileSelect(file);
    }
  };

  const handlePdfDraggingOver = (e) => {
    e.preventDefault();
    setIsDraggingPdf(true);
  };

  const handlePdfDraggingLeave = (e) => {
    e.preventDefault();
    setIsDraggingPdf(false);
  };

  const handlePdfDropping = (e) => {
    e.preventDefault();
    setIsDraggingPdf(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handlePdfFileSelect(file);
    }
  };

  // Trigger file input click for video
  const handleVideoFileSelection = () => {
    videoFileRefInput.current?.click();
  };

  // Trigger file input click for PDF/DOCX/DOC
  const handlePdfFileSelection = () => {
    pdfFileRefInput.current?.click();
  };

  // Handle form submission
  const handleSaving = async () => {
    if (!title || !selectedVideo) {
      toast.error("Please provide a title and select a video.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("duration_seconds", duration);
      formData.append("language", selectLanguage);
      formData.append("course", catId);
      formData.append("category", id);
      if (selectedVideo) {
        formData.append("video_file", selectedVideo);
      }
      if (selectedPdf) {
        formData.append("video_resource", selectedPdf);
      }

      const res = await categoryRelatedVideosAdd({ data: formData });
      toast.success("Video and resource saved successfully!" || res?.message);
      navigate(-1); // Navigate back

    } catch (error) {
      console.error("Error saving video:", error);
      toast.error(error.message || "Failed to save video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-[#373737] rounded-lg w-full max-w-5xl mx-auto">
        {/* Heading */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Upload New Video</h2>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Input for Video Title */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full px-4 py-3 bg-[#373737] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Input for Video Duration */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Video Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter video duration (e.g., 120 for 120 seconds)"
              className="w-full px-4 py-3 bg-[#373737] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Select Language */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Select Language
            </label>
            <select
              value={selectLanguage}
              onChange={(e) => setSelectLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-[#373737] border cursor-pointer border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Language</option>
              <option value="1">English</option>
              <option value="2">German</option>
              {/* Add more languages as needed */}
            </select>
          </div>

          {/* Area for Video Upload */}
          <div>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingOverVideo
                  ? "border-teal-400 bg-teal-400/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragOver={handleVideoDraggingOver}
              onDragLeave={handleVideoDraggingLeave}
              onDrop={handleVideoDropping}
            >
              {previewVideo ? (
                <div className="space-y-4">
                  <video
                    src={previewVideo}
                    controls
                    className="w-64 h-36 object-cover rounded-lg mx-auto"
                  />
                  <div className="text-white text-sm">{selectedVideo?.name}</div>
                  <button
                    onClick={handleVideoFileSelection}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Change Video
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg
                      width="110"
                      height="80"
                      viewBox="0 0 110 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M85.9351 80H62.3462V56.164H70.1417C72.1187 56.164 73.2869 53.9174 72.1187 52.2999L56.9544 31.317C55.9884 29.9691 53.989 29.9691 53.023 31.317L37.8587 52.2999C36.6905 53.9174 37.8362 56.164 39.8356 56.164H47.6312V80H21.2117C9.41723 79.3485 0.0266113 68.3179 0.0266113 56.3662C0.0266113 48.1213 4.49727 40.9323 11.1246 37.0458C10.518 35.4058 10.2035 33.6535 10.2035 31.8113C10.2035 23.3867 17.0106 16.5796 25.4352 16.5796C27.2549 16.5796 29.0072 16.8941 30.6472 17.5007C35.5223 7.16653 46.0362 0 58.2574 0C74.0732 0.0224656 87.1033 12.1314 88.586 27.5653C100.74 29.6546 109.973 40.9099 109.973 53.6479C109.973 67.262 99.3695 79.0564 85.9351 80Z"
                        fill="#62C1BF"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-lg font-medium mb-2">
                      Upload Video
                    </div>
                    <button
                      onClick={handleVideoFileSelection}
                      className="px-6 py-2 bg-white text-black hover:bg-gray-600 hover:text-white rounded-lg text-sm transition-colors"
                    >
                      Select File
                    </button>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Supported formats: MP4, WebM, AVI
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Area for PDF/DOCX/DOC Upload */}
          <div>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingOverPdf
                  ? "border-teal-400 bg-teal-400/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragOver={handlePdfDraggingOver}
              onDragLeave={handlePdfDraggingLeave}
              onDrop={handlePdfDropping}
            >
              {selectedPdf ? (
                <div className="space-y-4">
                  <div className="text-white text-sm">{selectedPdf.name}</div>
                  <button
                    onClick={handlePdfFileSelection}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg
                      width="110"
                      height="80"
                      viewBox="0 0 110 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M85.9351 80H62.3462V56.164H70.1417C72.1187 56.164 73.2869 53.9174 72.1187 52.2999L56.9544 31.317C55.9884 29.9691 53.989 29.9691 53.023 31.317L37.8587 52.2999C36.6905 53.9174 37.8362 56.164 39.8356 56.164H47.6312V80H21.2117C9.41723 79.3485 0.0266113 68.3179 0.0266113 56.3662C0.0266113 48.1213 4.49727 40.9323 11.1246 37.0458C10.518 35.4058 10.2035 33.6535 10.2035 31.8113C10.2035 23.3867 17.0106 16.5796 25.4352 16.5796C27.2549 16.5796 29.0072 16.8941 30.6472 17.5007C35.5223 7.16653 46.0362 0 58.2574 0C74.0732 0.0224656 87.1033 12.1314 88.586 27.5653C100.74 29.6546 109.973 40.9099 109.973 53.6479C109.973 67.262 99.3695 79.0564 85.9351 80Z"
                        fill="#62C1BF"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-lg font-medium mb-2">
                      Upload Resource
                    </div>
                    <button
                      onClick={handlePdfFileSelection}
                      className="px-6 py-2 bg-white text-black hover:bg-gray-600 hover:text-white rounded-lg text-sm transition-colors"
                    >
                      Select File
                    </button>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Supported formats: PDF, DOCX, DOC
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleSaving}
            disabled={loading || !title || !selectedVideo}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loading ? "Saving..." : "Save Video"}
          </button>
        </div>

        {/* Hidden Inputs for Files */}
        <input
          ref={videoFileRefInput}
          type="file"
          accept="video/mp4,video/webm,video/avi"
          onChange={handleVideoInputChange}
          className="hidden"
        />
        <input
          ref={pdfFileRefInput}
          type="file"
          accept=".pdf,.docx,.doc,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handlePdfInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}