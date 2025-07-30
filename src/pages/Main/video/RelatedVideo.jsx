import { Link, useParams } from "react-router-dom";
import { useRelatedVideoDeleteMutation, useSingleCategoryQuery } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RelatedVideo() {

   const { id } = useParams();

  const { data, isLoading } = useSingleCategoryQuery(id); 
  console.log("Related Video Data:", data);
  const [loading, setLoading] = useState(false);
  const [relatedVideoDelete] =useRelatedVideoDeleteMutation();

 const handleDelete = async (id) => {
  try {
    setLoading(true);
    const res = await relatedVideoDelete(id);
    console.log("Response from deleting video:", res);




    if (res?.data?.status === 'success') {
      toast.success("Video deleted successfully!");
    }

    // Optionally refetch data or update state here
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

  return (
    <div>
      <div className="flex justify-end mb-8 items-end">
        <Link to={`/video/related-video-add/${id}`}>
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
            Add New Video {id}
          </button>{" "}
        </Link>
      </div>
      {data?.data.videos?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.data?.videos?.map((video) => (
          <div key={video?.object_id} className="bg-[#373737] rounded-lg p-4 ">
           
            <video
              className="w-full h-[200px] bg-center rounded-lg"
              controls
              autoPlay
              src={video?.video_file}
            ></video>

            <div className="flex justify-between items-center mt-2">
              <h1 className="text-[24px] text-[#F3F3F3] font-medium">
              {video.title}
            </h1>
            <p className="text-[16px] text-[#62C1BF]">{video?.language_name}</p>
            </div>
            <div className="flex justify-between items-center">
              {/* <EllipsisVertical className="text-white" /> */}
              <button onClick={() => handleDelete(video?.object_id)} disabled={loading} className="text-black bg-[#62C1BF] py-2 px-4 w-full mt-5 rounded-md">
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center text-[#F3F3F3] font-medium mt-4">
            No Videos Found
          </h1>
        </div>
      )}
    </div>
  );
}
