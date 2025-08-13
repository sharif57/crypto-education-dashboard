// import { Link, useParams } from "react-router-dom";
// import { useRelatedVideoDeleteMutation, useSingleCategoryQuery } from "../../../redux/features/tutorialSlice";
// import Loading from "../../../Components/Loading";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export default function RelatedVideo() {

//    const { id } = useParams();


//   const { data, isLoading } = useSingleCategoryQuery(id); 
//   console.log("Related Video Data:s", data?.data);
//   const [loading, setLoading] = useState(false);
//   const [relatedVideoDelete] =useRelatedVideoDeleteMutation();

//  const handleDelete = async (id) => {
//   try {
//     setLoading(true);
//     const res = await relatedVideoDelete(id);
//     console.log("Response from deleting video:", res);




//     if (res?.data?.status === 'success') {
//       toast.success("Video deleted successfully!");
//     }

//     // Optionally refetch data or update state here
//   } catch (error) {
//     console.error("Error deleting video:", error);
//     toast.error("Failed to delete video. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };


//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <div className="flex justify-end mb-8 items-end">
//         <Link to={`/video/related-video-add/${id}`}>
//           <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
//             Add New Video {id}
//           </button>{" "}
//         </Link>
//       </div>
//       {data?.data.videos?.length > 0 ? (
//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//    {
//     data?.data?.map((item) => (
//       <div key={item._id}>
        
//       </div>
//     ))
//    }
//       </div>
//       ) : (
//         <div>
//           <h1 className="text-2xl text-center text-[#F3F3F3] font-medium mt-4">
//             No Videos Found
//           </h1>
//         </div>
//       )}
//     </div>
//   );
// }
import { Link, useParams } from "react-router-dom";
import { useRelatedVideoDeleteMutation, useSingleCategoryQuery } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RelatedVideo() {
  const { id } = useParams();
  const { data, isLoading } = useSingleCategoryQuery(id);
  const [loading, setLoading] = useState(false);
  const [relatedVideoDelete] = useRelatedVideoDeleteMutation();

  const handleDelete = async (videoId) => {
    try {
      setLoading(true);
      const res = await relatedVideoDelete(videoId);
      if (res?.data?.status === "success") {
        toast.success("Video deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  // Find the category with the matching id
  const category = data?.data

  return (
    <div>
      <div className="flex justify-end mb-8 items-end">
        <Link to={`/video/related-video-add/${id}`}>
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
            Add New Video {id}
          </button>
        </Link>
      </div>
      {category?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.map((video) => (
            <div key={video.id} className="p-4 bg-gray-800 rounded-lg">
              <img src={video.thumbnail} alt="" />
              <h3 className="text-lg text-white font-medium">{video.name}</h3>
              <p className="text-sm text-gray-400">Language: {video.language_name}</p>
              <p>total videos: {video.total_videos}</p>
              <button
                onClick={() => handleDelete(video.video_id)}
                disabled={loading}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete Video"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center text-[#F3F3F3] font-medium mt-4">
            No Videos Found for {category?.name || "Category"}
          </h1>
        </div>
      )}
    </div>
  );
}