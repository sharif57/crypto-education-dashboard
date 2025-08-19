
// import { Link, useParams } from "react-router-dom";
// import { useDeleteCategoryMutation, useSingleCategoryQuery, useUpdateCategoryMutation } from "../../../redux/features/tutorialSlice";
// import Loading from "../../../Components/Loading";
// import toast from "react-hot-toast";
// import { useState } from "react";

// export default function RelatedVideo() {
//   const { id } = useParams();
//   const { data, isLoading } = useSingleCategoryQuery(id);
//   console.log(data,'cateksdlfk')
//   const [loading, setLoading] = useState(false);
//   // const [relatedVideoDelete] = useRelatedVideoDeleteMutation();
//   const [deleteCategory] =useDeleteCategoryMutation();

//   const [updateCategory] =useUpdateCategoryMutation();

//   const handleDelete = async (videoId) => {
//     try {
//       setLoading(true);
//       const res = await deleteCategory(videoId);
//       if (res?.data?.status === "success") {
//         toast.success(res?.data ||"category deleted successfully!");
//       }
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       toast.error("Failed to delete video. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isLoading) {
//     return <Loading />;
//   }

//   // Find the category with the matching id
//   const category = data?.data

//   return (
//     <div>
//       <div className="flex justify-end mb-8 items-end">
//         <Link to={`/video/related-video-add/${id}`}>
//           <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
//             Add New Video {id}
//           </button>
//         </Link>
//       </div>
//       {category?.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {category.map((video) => (
//             <div key={video.id} className="p-4 bg-gray-800 rounded-lg">
//               <img className="w-full h-40 object-cover" src={video.thumbnail} alt="" />
//             <div className="mt-2 flex flex-col">
//                 <h3 className="text-lg text-white font-medium">{video.name}</h3>
//               <p className="text-[#62C1BF]">total videos: {video.total_videos}</p>
//             </div>
//              <div className="flex flex-col">
//                <button
//                 onClick={() => handleDelete(video.id)}
//                 disabled={loading}
//                 className="mt-2 px-4 py-2 bg-[#FF0000] text-white rounded hover:bg-red-700"
//               >
//                 {loading ? "Deleting..." : "Delete Video"}
//               </button>
//               <button className="mt-2 px-4 py-2 bg-[#62C1BF] text-white rounded">Edit Category</button>
//              </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div>
//           <h1 className="text-2xl text-center text-[#F3F3F3] font-medium mt-4">
//             No Videos Found for {category?.name || "Category"}
//           </h1>
//         </div>
//       )}
//     </div>
//   );
// }

import { Link, useParams } from "react-router-dom";
import { useDeleteCategoryMutation, useSingleCategoryQuery, useUpdateCategoryMutation } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function RelatedVideo() {
  const { id } = useParams();
  const { data, isLoading } = useSingleCategoryQuery(id);
  console.log(data, 'cateksdlfk');
  const [loading, setLoading] = useState(false);
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [editModal, setEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleDelete = async (videoId) => {
    try {
      setLoading(true);
      const res = await deleteCategory(videoId);
      if (res?.data?.status === "success") {
        toast.success(res?.data || "category deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const nameInput = document.getElementById("editCategoryName");
    const thumbnailInput = document.getElementById("editCategoryImageUpload");
    const descriptionInput = document.getElementById("editCategoryDescription");

    formData.append("name", nameInput.value || selectedVideo?.name);
    if (thumbnailInput.files[0]) {
      formData.append("thumbnail", thumbnailInput.files[0]);
    }
    formData.append("description", descriptionInput.value || selectedVideo?.description);

    try {
      setLoading(true);
      const res = await updateCategory({ data: formData, id: selectedVideo.id });
      if (res?.data?.status === "success") {
        toast.success("Category updated successfully!");
        setEditModal(false);
        setSelectedVideo(null);
      } else {
        toast.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const category = data?.data;

  return (
    <div>
      <div className="flex justify-end mb-8 items-end">
        {/* <Link to={`/video/related-video-add/${id}`}>
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
            Add New Video {id}
          </button>
        </Link> */}

         <Link to={`/video/create-category?id=${id}`}>
                  <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF]/90 text-black rounded-full mt-4 transition-colors">
                    Create New Category 
                  </button>
                </Link>
      </div>
      {category?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.map((video) => (
            <div key={video.id} className="p-4 bg-gray-800 rounded-lg">
            <Link to={`/video/category-related-video/?id=${video.id}/?catId=${id}`}>
                <img className="w-full h-40 object-cover" src={video.thumbnail} alt="" />
              <div className="mt-2 flex flex-col">
                <h3 className="text-lg text-white font-medium">{video.name}</h3>
                <p className="text-[#62C1BF]">total videos: {video.total_videos}</p>
              </div>
            </Link>
              <div className="flex flex-col">
                <button
                  onClick={() => handleDelete(video.id)}
                  disabled={loading}
                  className="mt-2 px-4 py-2 bg-[#FF0000] text-white rounded hover:bg-red-700"
                >
                  {loading ? "Deleting..." : "Delete Category"}
                </button>
                <button
                  onClick={() => handleEdit(video)}
                  className="mt-2 px-4 py-2 bg-[#62C1BF] text-white rounded"
                >
                  Edit Category
                </button>
              </div>
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

      {editModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Category</h2>
              <IoClose
                className="text-black text-2xl cursor-pointer"
                onClick={() => {
                  setEditModal(false);
                  setSelectedVideo(null);
                }}
              />
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="editCategoryName">
                  Category Name
                </label>
                <input
                  type="text"
                  id="editCategoryName"
                  defaultValue={selectedVideo?.name}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="editCategoryImageUpload">
                  Upload Category Image
                </label>
                <input
                  type="file"
                  id="editCategoryImageUpload"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="editCategoryDescription">
                  Description
                </label>
                <input
                  type="text"
                  id="editCategoryDescription"
                  defaultValue={selectedVideo?.description}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#62C1BF] text-white px-4 py-2 rounded"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}