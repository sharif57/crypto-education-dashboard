

import { Link, useSearchParams } from "react-router-dom";
import { useDeleteVideoMutation, useSignleVideoUpdateMutation, useSingleVideoQuery } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CategoryRelatedVideo() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading, error } = useSingleVideoQuery(id);
  const [deleteVideo] = useDeleteVideoMutation();
  const [signleVideoUpdate, { isLoading: isUpdating }] = useSignleVideoUpdateMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error loading videos. Please try again.</div>;
  }

  const videos = data?.data?.videos || [];
  console.log(videos);

  const handleDelete = async (id) => {
    try {
      const res = await deleteVideo(id).unwrap();
      toast.success(res?.message || "Video deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete video. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setDuration(video.duration_seconds || "");
    setSelectedPdf(null); // Reset PDF on edit
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    if (!selectedVideo) return;

    // Validation
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!duration || isNaN(duration) || duration <= 0) {
      toast.error("Please enter a valid duration in seconds.");
      return;
    }
    if (selectedPdf && selectedPdf.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration_seconds", duration);

    // Append video_resource only if a new PDF is selected
    if (selectedPdf) {
      formData.append("video_resource", selectedPdf);
    }

    try {
      const res = await signleVideoUpdate({
        id: selectedVideo.object_id,
        data: formData,
      }).unwrap();
      toast.success(res?.message || "Video updated successfully!");
      setOpenModal(false);
      setSelectedVideo(null);
      setSelectedPdf(null); // Reset PDF after success
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update video. Please try again.");
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedVideo(null);
    setTitle("");
    setDuration("");
    setSelectedPdf(null); // Reset PDF on cancel
  };

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <Link to={`/video/related-video-add/${id}`}>
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF]/80 text-black rounded-full mt-4 transition-colors">
            Add New Video
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {videos.map((video) => (
          <div key={video.object_id} className="p-4 bg-gray-800 rounded-lg">
            <video
              controls
              className="w-full h-40 object-cover rounded-md"
              src={video.video_file}
            >
              Your browser does not support the video tag.
            </video>
            <div className="mt-2 flex flex-col">
              <h3 className="text-lg text-white font-medium">{video.title}</h3>
              <p className="text-[#62C1BF]">Language: {video.language_name}</p>
              <p className="text-gray-400">Duration: {video.duration_seconds ? `${video.duration_seconds} seconds` : "N/A"}</p>
            </div>
            <button
              onClick={() => handleDelete(video.object_id)}
              className="mt-2 px-4 w-full py-2 bg-[#FF0000] text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(video)}
              className="mt-2 px-4 w-full py-2 bg-[#62C1BF] text-white rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Video</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter video title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter duration in seconds"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Video Resource (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedPdf(e.target.files[0])}
                className="mt-1 p-2 w-full border rounded-md"
              />
              {selectedPdf && <p className="text-sm text-gray-500 mt-1">{selectedPdf.name}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="px-4 py-2 bg-[#62C1BF] text-white rounded hover:bg-[#62C1BF]/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {videos.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No videos available for this category.</p>
      )}
    </div>
  );
}