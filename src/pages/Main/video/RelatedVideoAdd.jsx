
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryRelatedVideosAddMutation } from "../../../redux/features/tutorialSlice";
import toast from "react-hot-toast";

export default function RelatedVideoAdd() {
  const { id } = useParams();
  const router = useNavigate()
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewVideo, setVideoPreview] = useState(null);
  const [isDraggingOver, setIsDragging] = useState(false);
  const fileRefInput = useRef(null);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [selectLanguage, setSelectLanguage] = useState(''); // Assuming you might want to use this later

const [categoryRelatedVideosAdd] =useCategoryRelatedVideosAddMutation();
  // Handle video file selection and preview
  const handleFileSelect = (file) => {
    if (
      file &&
      (file.type === 'video/mp4' ||
        file.type === 'video/webm' ||
        file.type === 'video/avi')
    ) {
      setSelectedVideo(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoPreview(e.target?.result || null);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid video file (MP4, WebM, AVI).');
    }
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag-over event
  const handleDraggingOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag-leave event
  const handleDraggingLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle drop event
  const handleDropping = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Trigger file input click
  const handleFileSelection = () => {
    fileRefInput.current?.click();
  };

  // Handle form submission
  const handleSaving = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('duration', duration);
      formData.append('language', selectLanguage);
      formData.append('course', id);
      // formData.append('video_file', selectedVideo);
      formData.append('category', id); // Assuming 'id' is the category ID
      if (selectedVideo){
        formData.append('video_file', selectedVideo);
      }

      // Call the mutation to save the video
   const res =  await categoryRelatedVideosAdd({  data: formData });
   console.log("Response from saving video:", res);
      toast.success("Video saved successfully!");
      router(-1)
      // Reset state after saving
      setCategory('');
      setSelectedVideo(null);
      setVideoPreview(null);
    } catch (error) {
      console.error("Error saving video:", error);
      toast.error("Failed to save video. Please try again.");
      return;
      
    } finally {
      setLoading(false);
    }

    if (category.trim() && selectedVideo) {
      // Perform save action (e.g., API call to upload video)
      console.log('Saving video:', { category, selectedVideo });
      // Reset form
      setCategory('');
      setSelectedVideo(null);
      setVideoPreview(null);
    }
  };

  return (
    <div className=" flex items-center justify-center p-4">
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
              placeholder="Enter video duration"
              className="w-full px-4 py-3 bg-[#373737] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* select language */}
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
                isDraggingOver
                  ? 'border-teal-400 bg-teal-400/10'
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={handleDraggingOver}
              onDragLeave={handleDraggingLeave}
              onDrop={handleDropping}
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
                    onClick={handleFileSelection}
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
                      onClick={handleFileSelection}
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
        </div>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleSaving}
            disabled={loading || !title || !selectedVideo}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loading ? 'Saving...' : 'Save Video'}
          </button>
        </div>

        {/* Hidden Input for File */}
        <input
          ref={fileRefInput}
          type="file"
          accept="video/mp4,video/webm,video/avi"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}