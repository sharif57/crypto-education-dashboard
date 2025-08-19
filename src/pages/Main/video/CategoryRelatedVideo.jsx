// // import { useSearchParams } from 'react-router-dom';
// // import { useSingleVideoQuery } from '../../../redux/features/tutorialSlice';

// // export default function CategoryRelatedVideo() {

// //      const [searchParams] = useSearchParams();
// //   const id = searchParams.get("id");
// //   console.log(id, "category id");
// //   const {data} = useSingleVideoQuery(id);
// //   console.log(data, 'signle');
// //   return (
// //     <div>
// //       <h1>Category Related Video {id}</h1>
// //     </div>
// //   )
// // }
// import { Link, useSearchParams } from "react-router-dom";
// import { useDeleteVideoMutation, useSignleVideoUpdateMutation, useSingleVideoQuery } from "../../../redux/features/tutorialSlice";
// import Loading from "../../../Components/Loading";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export default function CategoryRelatedVideo() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   console.log(id, "category id");
//   const { data, isLoading } = useSingleVideoQuery(id);
//   console.log(data, "single");
//   const [deleteVideo] =useDeleteVideoMutation();

//   const [signleVideoUpdate] = useSignleVideoUpdateMutation();

//   const [openModal, setOpenModal] = useState(false);

//   if (isLoading) {
//     return <div><Loading /></div>; 
//   }

//   const videos = data?.data?.videos || [];

//   const handleDelete = async (id) =>{
//     try {
//         const res = await deleteVideo(id);
//         toast.success(res?.data || "Video deleted successfully!");
//     } catch (error) {
//         toast.error("Failed to delete video. Please try again.");
//         console.log(error);

//     }
//   }

//   const handleEdit = (id) => {

//     // Navigate to the edit page with the video ID
//     window.location.href = `/video/related-video-add/${id}`;
//   }

//   return (
//     <div>
//       {/* <h1>Category Related Video {id}</h1> */}
//     <Link className="flex justify-end" to={`/video/related-video-add/${id}`}>
//               <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
//                 Add New Video 
//               </button>
//             </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//         {videos.map((video) => (
//           <div key={video.object_id} className="p-4 bg-gray-800 rounded-lg">
//             <video
//               controls
//               className="w-full h-40 object-cover rounded-md"
//               src={video.video_file}
//             >
//               Your browser does not support the video tag.
//             </video>
//             <div className="mt-2 flex flex-col">
//               <h3 className="text-lg text-white font-medium">{video.title}</h3>
//               <p className="text-[#62C1BF]">Language: {video.language_name}</p>
//               <p className="text-gray-400">Duration: {video.duration_seconds ? `${video.duration_seconds} seconds` : "N/A"}</p>
//               {/* <p className="text-gray-400">Order: {video.order}</p> */}
//             </div>
          
//             <button onClick={() => handleDelete(video.object_id)} className="mt-2 px-4 w-full  py-2 bg-[#FF0000] text-white rounded hover:bg-red-700" >Delete</button>
//             <button  onClick={openModal} className="mt-2 px-4 w-full py-2 bg-[#62C1BF] text-white rounded">Edit</button>
//           </div>
//         ))}
//       </div>

// {
//       openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold mb-4">Edit Video</h2>
//             <button onClick={() => setOpenModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
//               Close
//             </button>
//           </div>
//         </div>
//       )
// }

//       {videos.length === 0 && (
//         <p className="text-center text-gray-400 mt-4">No videos available for this category.</p>
//       )}
//     </div>
//   );
// }

import { Link, useSearchParams } from "react-router-dom";
import { useDeleteVideoMutation, useSignleVideoUpdateMutation, useSingleVideoQuery } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CategoryRelatedVideo() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { data, isLoading } = useSingleVideoQuery(id);
  const [deleteVideo] = useDeleteVideoMutation();
  const [signleVideoUpdate] = useSignleVideoUpdateMutation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  if (isLoading) {
    return <div><Loading /></div>;
  }

  const videos = data?.data?.videos || [];

  const handleDelete = async (id) => {
    try {
      const res = await deleteVideo(id);
      toast.success(res?.data?.message || "Video deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video. Please try again.");
      console.log(error);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setDuration(video.duration_seconds || "");
    setOpenModal(true);
  };

  const handleUpdate = async () => {
    try {
      if (!selectedVideo) return;
      
      const updatedData = {
        id: selectedVideo.object_id,
       data:{
         title,
        duration_seconds: parseInt(duration) ,
       }
      };

      const res = await signleVideoUpdate(updatedData);
      toast.success(res?.data?.message || "Video updated successfully!");
      setOpenModal(false);
      setSelectedVideo(null);
    } catch (error) {
      toast.error("Failed to update video. Please try again.");
      console.log(error);
    }
  };

  return (
    <div>
      <div  className="flex justify-end">
        <Link to={`/video/related-video-add/${id}`}>
        <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
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
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setOpenModal(false);
                  setSelectedVideo(null);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-[#62C1BF] text-white rounded hover:bg-[#62C1BF]/80"
              >
                Save
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