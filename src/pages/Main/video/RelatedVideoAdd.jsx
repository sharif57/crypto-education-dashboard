

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCategoryRelatedVideosAddMutation } from "../../../redux/features/tutorialSlice";
import toast from "react-hot-toast";
import { CirclePlus, Trash2 } from "lucide-react";

export default function RelatedVideoAdd() {
  const { id } = useParams(); // Category ID, e.g., "20"
  const [searchParams] = useSearchParams();
  const catId = searchParams.get("catId"); // Course ID from query param
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setVideoPreview] = useState(null);
  const [isDraggingOverVideo, setIsDraggingVideo] = useState(false);
  const videoFileRefInput = useRef(null);
  const resourceFilesRefInput = useRef(null);
  const [title, setTitle] = useState("");
  const [selectLanguage, setSelectLanguage] = useState("");
  
  // Resource Links State
  const [resourceLinks, setResourceLinks] = useState([""]);
  
  // Resource Files State
  const [resourceFiles, setResourceFiles] = useState([]);
  const [isDraggingOverFiles, setIsDraggingOverFiles] = useState(false);

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
      reader.onload = () => {
        setVideoPreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid video file (MP4, WebM, AVI).");
    }
  };

  // Handle Resource Files (PDF, DOCX, PPTX, XLSX) selection
  const handleResourceFileSelect = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    
    if (file && validTypes.includes(file.type)) {
      setResourceFiles([...resourceFiles, file]);
      toast.success(`${file.name} added successfully!`);
    } else {
      toast.error("Please select a valid file (PDF, DOCX, PPTX, or XLSX).");
    }
  };

  // Handle file input change for video
  const handleVideoInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleVideoFileSelect(file);
    }
  };

  // Handle file input change for resource files
  const handleResourceFilesInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        handleResourceFileSelect(file);
      });
    }
  };

  // Handle Resource Link change
  const handleResourceLinkChange = (index, value) => {
    const updatedLinks = [...resourceLinks];
    updatedLinks[index] = value;
    setResourceLinks(updatedLinks);
  };

  // Add new Resource Link input
  const handleAddResourceLink = () => {
    setResourceLinks([...resourceLinks, ""]);
  };

  // Remove Resource Link input
  const handleRemoveResourceLink = (index) => {
    const updatedLinks = resourceLinks.filter((_, i) => i !== index);
    setResourceLinks(updatedLinks);
  };

  // Remove Resource File
  const handleRemoveResourceFile = (index) => {
    const updatedFiles = resourceFiles.filter((_, i) => i !== index);
    setResourceFiles(updatedFiles);
    toast.success("File removed successfully!");
  };

  // Clear All Resource Files
  const handleClearAllResourceFiles = () => {
    setResourceFiles([]);
    toast.success("All files cleared!");
  };

  // Trigger file input click for resource files
  const handleResourceFilesSelection = () => {
    resourceFilesRefInput.current?.click();
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

  // Trigger file input click for video
  const handleVideoFileSelection = () => {
    videoFileRefInput.current?.click();
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
      formData.append("language", selectLanguage);
      formData.append("course", catId);
      formData.append("category", id);
      
      if (selectedVideo) {
        formData.append("video_file_url", selectedVideo);
      }

      // Append Resource Links (non-empty values only)
      const validLinks = resourceLinks.filter(link => link.trim());
      validLinks.forEach((link) => {
        formData.append("resource_links", link);
      });

      // Append Resource Files
      resourceFiles.forEach((file) => {
        formData.append("resource_files", file);
      });

      const res = await categoryRelatedVideosAdd({ data: formData });
      toast.success("Video and resources saved successfully!" || res?.message);
      navigate(-1); // Navigate back

    } catch (error) {
      console.error("Error saving video:", error);
      toast.error(error.message || "Failed to save video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

//   resource_files['', '', '',]
 
// resource_links['', '', '']
 

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

          {/* Input for Resource Links */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Resource Links
            </label>
            <div className="space-y-3">
              {resourceLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => handleResourceLinkChange(index, e.target.value)}
                    placeholder="Enter resource link (optional)"
                    className="flex-1 px-4 py-3 bg-[#373737] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {resourceLinks.length > 1 && (
                    <button
                      onClick={() => handleRemoveResourceLink(index)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      title="Remove this link"
                    >
                      <Trash2 className="text-red-500" size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddResourceLink}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm transition-colors"
              >
                <CirclePlus size={18} />
                Add Resource Link
              </button>
            </div>

            {/* Display Resource Links in List Format */}
            {resourceLinks.filter(link => link.trim()).length > 0 && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <div className="text-white text-sm font-medium mb-3">
                  📋 Resource Links List ({resourceLinks.filter(link => link.trim()).length})
                </div>
                <div className="space-y-2">
                  {resourceLinks
                    .map((link, index) => ({ link, index }))
                    .filter(({ link }) => link.trim())
                    .map(({ link, index }) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-teal-400 text-sm font-bold">
                          {index + 1}.
                        </span>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-300 hover:text-teal-200 text-sm truncate flex-1 hover:underline"
                          title={link}
                        >
                          {link}
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            )}
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

          {/* Area for Resource Files Upload */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Resource Files
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingOverFiles
                  ? "border-teal-400 bg-teal-400/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOverFiles(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingOverFiles(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOverFiles(false);
                const files = e.dataTransfer.files;
                if (files) {
                  Array.from(files).forEach((file) => {
                    handleResourceFileSelect(file);
                  });
                }
              }}
            >
              {resourceFiles.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-white text-sm font-medium mb-4">
                    {resourceFiles.length} file(s) selected
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {resourceFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-sm">📄</span>
                          <div className="flex-1">
                            <span className="text-white text-sm truncate block">
                              {file.name}
                            </span>
                            <span className="text-gray-400 text-xs">
                              {(file.size / 1024).toFixed(2)} KB
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveResourceFile(index)}
                          className="p-1 hover:bg-gray-700 rounded transition-colors"
                          title="Remove this file"
                        >
                          <Trash2 className="text-red-500" size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResourceFilesSelection}
                      className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                    >
                      Add More Files
                    </button>
                    <button
                      onClick={handleClearAllResourceFiles}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                      title="Clear all files"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Display Resource Files in List Format */}
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <div className="text-white text-sm font-medium mb-3">
                      📁 Files to Upload ({resourceFiles.length})
                    </div>
                    <div className="space-y-2">
                      {resourceFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                        >
                          <span className="text-teal-400 text-sm font-bold min-w-fit">
                            {index + 1}.
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm truncate">
                              {file.name}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {(file.size / 1024).toFixed(2)} KB • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                      Upload Resource Files
                    </div>
                    <button
                      onClick={handleResourceFilesSelection}
                      className="px-6 py-2 bg-white text-black hover:bg-gray-600 hover:text-white rounded-lg text-sm transition-colors"
                    >
                      Select Files
                    </button>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Supported formats: PDF, DOCX, PPTX, XLSX (optional)
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
          ref={resourceFilesRefInput}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.pptx,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleResourceFilesInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}