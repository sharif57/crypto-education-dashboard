// import { useSearchParams } from 'react-router-dom';
// import { useSingleVideoQuery } from '../../../redux/features/tutorialSlice';

// export default function CategoryRelatedVideo() {

//      const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   console.log(id, "category id");
//   const {data} = useSingleVideoQuery(id);
//   console.log(data, 'signle');
//   return (
//     <div>
//       <h1>Category Related Video {id}</h1>
//     </div>
//   )
// }
import { Link, useSearchParams } from "react-router-dom";
import { useDeleteVideoMutation, useSingleVideoQuery } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";

export default function CategoryRelatedVideo() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id, "category id");
  const { data, isLoading } = useSingleVideoQuery(id);
  console.log(data, "single");
  const [deleteVideo] =useDeleteVideoMutation();

  if (isLoading) {
    return <div><Loading /></div>; 
  }

  const videos = data?.data?.videos || [];

  const handleDelete = async (id) =>{
    try {
        const res = await deleteVideo(id);
        toast.success(res?.data || "Video deleted successfully!");
    } catch (error) {
        toast.error("Failed to delete video. Please try again.");
        console.log(error);

    }
  }

  return (
    <div>
      {/* <h1>Category Related Video {id}</h1> */}
    <Link className="flex justify-end" to={`/video/related-video-add/${id}`}>
              <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
                Add New Video 
              </button>
            </Link>
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
              {/* <p className="text-gray-400">Order: {video.order}</p> */}
            </div>
            <button onClick={() => handleDelete(video.object_id)} className="mt-2 px-4 w-full  mt-3 py-2 bg-[#FF0000] text-white rounded hover:bg-red-700" >Delete</button>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No videos available for this category.</p>
      )}
    </div>
  );
}