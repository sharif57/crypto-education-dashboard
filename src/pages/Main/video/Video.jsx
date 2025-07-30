

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { useAllCategoriesQuery, useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";

export default function Video() {

  const [editModel, setEditModel] = useState(false);

  const {data, isLoading} = useAllCategoriesQuery();
  console.log(data?.data, "data from video categories");

  const [updateCategory] =useUpdateCategoryMutation();
  
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Introduction Season",
      count: "1 Document",
      type: "document",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 4,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 5,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 6,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 7,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 8,
      title: "Crypto Basics",
      count: "27 Videos",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
  ]);
const [deleteCategory] =useDeleteCategoryMutation();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdownId &&
        !Object.values(dropdownRef.current).some(
          (ref) => ref && ref.contains(event.target)
        )
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = async(id) => {

    try {
      const res = await deleteCategory(id);
      toast.success(res?.data?.data || "Category deleted successfully");
      console.log(res, "delete category response");
      if (res.error) {
        console.error("Failed to delete category:", res.error);
        return;
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }

    setVideos(videos.filter((video) => video.id !== id));
    setOpenDropdownId(null);
  };

  const handleEdit = (id) => {
    // Placeholder for edit navigation or action

    setEditModel(true);
    try {
      const fromData = new FormData();
    fromData.append("name", document.getElementById("categoryName").value);
    if(document.getElementById("categoryImageUpload").files[0]) {
      fromData.append("thumbnail", document.getElementById("categoryImageUpload").files[0]);
    }

    const res = updateCategory({data: fromData, id});
    console.log(res, "update category response")
    } catch (error) {
      console.log("Error updating category:", error);
    }


    console.log(`Navigate to edit page for video ID: ${id}`);
    setOpenDropdownId(null);
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="w-full p-6   rounded-lg">
      <div className="flex justify-end mb-8 items-end">
        <Link to="/video/create-category">
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF]/90 text-black rounded-full mt-4 transition-colors">
            Create New Category
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.map((video) => (
          <div key={video.id} className="relative">
            <Link
              to={`/video/related-video/${video.id}`}
              className="bg-[#373737] rounded-lg  p-4 block"
            >
              <img
                className="bg-center w-full h-[200px]  object-cover rounded-md"
                src={video?.thumbnail ||"/image.png"}
                alt={video?.name}
              />
              <h1 className="text-[24px] w-full text-[#F3F3F3] font-medium mt-2">
                {video?.name}
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-[#62C1BF] text-xl">{video?.total_videos} Videos</p>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    toggleDropdown(video.id);
                  }}
                  className="text-white hover:text-gray-300"
                >
                  <EllipsisVertical className="w-5 h-5" />
                </button>
              </div>
            </Link>
            {openDropdownId === video.id && (
              <div
                ref={(el) => (dropdownRef.current[video.id] = el)}
                className="absolute right-2 top-36 bg-[#4A4A4A] rounded-md shadow-lg z-10 w-32"
              >
                <button
                  onClick={() => handleEdit(video.id)}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#62C1BF] rounded-t-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video.id)}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-b-md"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* edit modal  name and image */}

{editModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
            <form onSubmit={handleEdit  }>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="categoryName">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  // value={editFormData.name}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
           
              {/* upload image */}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="categoryImageUpload">
                  Upload Category Image
                </label>
                <input
                  type="file"
                  id="categoryImageUpload"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#62C1BF] text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
