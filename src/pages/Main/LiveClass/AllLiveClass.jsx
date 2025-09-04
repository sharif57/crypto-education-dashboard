
import {  Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteLiveClassMutation, useLiveClassQuery, useUpdateLiveClassMutation } from "../../../redux/features/liveClassSlice";
import Loading from "../../../Components/Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllLiveClass() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Open modal and set selected class
  const openModalHandler = (liveClass) => {
    setSelectedClass(liveClass);
    setOpenModal(true);
  };

  const { data, isLoading, isError } = useLiveClassQuery({
    refetchInterval: 500,
  });

  const [updateLiveClass] = useUpdateLiveClassMutation();
  const [deleteLiveClass] =useDeleteLiveClassMutation();

  const handleUpdateLiveClass = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      description: form.description.value,
      link: form.link.value,
      date_time: form.date_time.value,
      duration_minutes: Number(form.duration_minutes.value),
    };

    try {
      const res = await updateLiveClass({
        id: selectedClass.id,
        data: updatedData,
      });
      if (res.error) {
        throw new Error(res.error);
      }
      toast.success("Live Class updated successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating live class:", error);
      toast.error("Failed to update live class. Please try again.");
    }
  };

  // swal alert add
 const handleDeleteLiveClass = async (id) => {
  // Show confirmation dialog
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  // If user confirms, proceed with deletion
  if (result.isConfirmed) {
    try {
      const res = await deleteLiveClass(id);
      if (res.error) {
        throw new Error(res.error);
      }
      // toast.success("Live Class deleted successfully!");
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } catch (error) {
      console.log("Error deleting live class:", error);
      // Optionally show an error message to the user
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the live class.",
        icon: "error"
      });
    }
  }
};

  // Format date and time for display
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#373737] rounded-lg p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-white text-2xl font-medium">All Live Classes</h1>
        <Link to="/live-class/create">
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF]/90 text-black rounded-full mt-4 transition-colors">
            Create New Live Class
          </button>
        </Link>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="text-center text-white py-4">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="text-center text-red-500 py-4">
          Error loading live classes. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <div className="w-full overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#62C1BF] px-6 py-4 grid grid-cols-6 gap-4 text-white font-medium text-sm">
            <div>#ID</div>
            <div>Title</div>
            <div>Description</div>
            <div>Date & Time</div>
            <div>Duration (min)</div>
            <div className="text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-600">
            {data?.data?.length > 0 ? (
              data.data.map((liveClass) => (
                <div
                  key={liveClass.id}
                  className="px-6 py-4 grid grid-cols-6 gap-4 text-gray-300 text-sm hover:bg-gray-600 transition-colors"
                >
                  <div>#{liveClass.id}</div>
                  <div>{liveClass.title}</div>
                  <div>{liveClass.description}</div>
                  <div>{formatDateTime(liveClass.date_time)}</div>
                  <div>{liveClass.duration_minutes}</div>
                  <div className="text-center  space-x-6">
                    <button
                      onClick={() => openModalHandler(liveClass)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteLiveClass(liveClass.id)}
                      className="text-red-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-300 py-4">
                No live classes found.
              </div>
            )}
          </div>

          {/* Modal for Editing Live Class */}
          {openModal && selectedClass && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl">
                <h2 className="text-white text-lg font-medium mb-4">
                  Edit Live Class
                </h2>
                <form onSubmit={handleUpdateLiveClass} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="text-gray-400">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={selectedClass.title}
                      placeholder="Title"
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-gray-400">
                      Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      defaultValue={selectedClass.description}
                      placeholder="Description"
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      
                    />
                  </div>
                  <div>
                    <label htmlFor="link" className="text-gray-400">
                      Link
                    </label>
                    <input
                      id="link"
                      name="link"
                      type="text"
                      defaultValue={selectedClass.link}
                      placeholder="Link"
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="date_time" className="text-gray-400">
                      Date & Time
                    </label>
                    <input
                      id="date_time"
                      name="date_time"
                      type="datetime-local"
                      defaultValue={
                        selectedClass.date_time
                          ? new Date(selectedClass.date_time)
                              .toISOString()
                              .slice(0, 16)
                          : ""
                      }
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="duration_minutes" className="text-gray-400">
                      Duration (min)
                    </label>
                    <input
                      id="duration_minutes"
                      name="duration_minutes"
                      type="number"
                      defaultValue={selectedClass.duration_minutes}
                      placeholder="Duration (min)"
                      className="w-full p-2 bg-gray-700 rounded-lg text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#62C1BF] text-black rounded-lg mr-2 hover:bg-[#62C1BF]/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}