import { useState, useMemo } from "react";
import { Search, Info, X, Download } from "lucide-react";
import { useUserListQuery } from "../redux/features/useSlice";
import Loading from "./Loading";

export default function DashboardHomeTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError } = useUserListQuery();

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle search filtering
  const filteredUsers = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Handle action button click
  const handleActionClick = (user) => {
    setSelectedUser({
      userId: user.user_id,
      fullName: user.full_name,
      email: user.email,
      date: formatDate(user.date_joined),
      role: user.role,
      subscription: user.subscription,
      isActive: user.is_active ? "Active" : "Inactive",
      lastLogin: user.last_login ? formatDate(user.last_login) : "N/A",
    });
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle download (example implementation)
  const handleDownload = () => {
    if (selectedUser) {
      const userData = JSON.stringify(selectedUser, null, 2);
      const blob = new Blob([userData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user_${selectedUser.userId}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#373737] rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-6 py-4">
        <h1 className="text-white text-2xl font-medium">Recent Users</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by User Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-md pr-10 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div ><Loading /></div>
      )}
      {isError && (
        <div className="text-center text-red-500 py-4">
          Error loading users. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <div className="w-full overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#62C1BF] px-6 py-4 grid grid-cols-5 gap-4 text-white font-medium text-sm">
            <div>#SL</div>
            <div>User Name</div>
            <div>Email</div>
            <div>Date</div>
            <div className="text-center">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-600">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div
                  key={user.user_id}
                  className="px-6 py-4 grid grid-cols-5 gap-4 text-gray-300 text-sm hover:bg-gray-600 transition-colors"
                >
                  <div>#{index + 1}</div>
                  <div>{user.full_name}</div>
                  <div>{user.email}</div>
                  <div>{formatDate(user.date_joined)}</div>
                  <div className="text-center">
                    <button
                      onClick={() => handleActionClick(user)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-300 py-4">
                No users found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-medium">User Details</h2>
              <button
                onClick={closeModal}
                className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">User ID</span>
                <span className="text-white">{selectedUser.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Full Name</span>
                <span className="text-white">{selectedUser.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Email</span>
                <span className="text-white">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Date Joined</span>
                <span className="text-white">{selectedUser.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Role</span>
                <span className="text-white">{selectedUser.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Subscription</span>
                <span className="text-white">{selectedUser.subscription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Status</span>
                <span className="text-white">{selectedUser.isActive}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Last Login</span>
                <span className="text-white">{selectedUser.lastLogin}</span>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}