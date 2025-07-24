import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteLiveClassMutation, useLiveClassQuery } from "../../../redux/features/liveClassSlice";
import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";

export default function AllLiveClass() {
  const { data, isLoading, isError } = useLiveClassQuery({
  
    refetchInterval: 500,

  });
  const [deleteLiveClass] =useDeleteLiveClassMutation()
//   const [deleteLiveClass] = useDeleteLiveClassMutation();

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

  // Handle delete action
  const handleDelete = async (id) => {
     {
      try {
        await deleteLiveClass(id).unwrap();
        toast.success("Live class deleted successfully!");
      } catch (error) {
        const errorMessage = error?.data?.message || "Failed to delete live class.";
        toast.error(errorMessage);
        console.error("Delete failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#373737] rounded-lg p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-white text-2xl font-medium">All Live Classes</h1>
        <Link to="/live-class/create">
                <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">Create New Live Class</button>
</Link>
              </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="text-center text-white py-4"><Loading /></div>
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
                  <div className="text-center">
                    <button
                      onClick={() => handleDelete(liveClass.id)}
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
        </div>
      )}
    </div>
  );
}