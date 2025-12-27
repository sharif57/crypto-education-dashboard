
import { useState, useMemo } from "react";
import { Search, Info, X, Download, Plus, EyeOff, Eye } from "lucide-react";
import { useAddUserMutation, useUserListQuery } from "../redux/features/useSlice";
import Loading from "./Loading";

export default function DashboardHomeTable() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Add User Form State
 const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  password: "",
  subscription: "free",
  billing: "monthly",
  showPassword: false, // <-- Add this
});

  const { data, isLoading, isError, refetch } = useUserListQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  // Handle details modal
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
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  // Handle download
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

  // Add User Modal Handlers
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setFormData({
      full_name: "",
      email: "",
      password: "",
      subscription: "free",
      billing: "monthly",
    });
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData).unwrap();
      closeAddModal();
      refetch(); // Refresh the user list
      // Optional: show success toast
    } catch (err) {
      console.error("Failed to add user:", err);
      // Optional: show error toast
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
          <button
            onClick={openAddModal}
            className="bg-[#62c1bf] text-black px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#5ab0ae] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      )}
      {isError && (
        <div className="text-center text-red-500 py-4">
          Error loading users. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <div className="w-full overflow-hidden">
          <div className="bg-[#62C1BF] px-6 py-4 grid grid-cols-5 gap-4 text-white font-medium text-sm">
            <div>#SL</div>
            <div>User Name</div>
            <div>Email</div>
            <div>Date</div>
            <div className="text-center">Action</div>
          </div>

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
              <div className="text-center text-gray-300 py-8 col-span-5">
                No users found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {isDetailsModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-medium">User Details</h2>
              <button
                onClick={closeDetailsModal}
                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between"><span className="text-gray-300">User ID</span><span className="text-white">{selectedUser.userId}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Full Name</span><span className="text-white">{selectedUser.fullName}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Email</span><span className="text-white">{selectedUser.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Date Joined</span><span className="text-white">{selectedUser.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Role</span><span className="text-white">{selectedUser.role || "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Subscription</span><span className="text-white">{selectedUser.subscription}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Status</span><span className="text-white">{selectedUser.isActive}</span></div>
              <div className="flex justify-between"><span className="text-gray-300">Last Login</span><span className="text-white">{selectedUser.lastLogin}</span></div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download User Data
            </button>
          </div>
        </div>
      )}

     {/* Add User Modal */}
{isAddModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-medium">Add New User</h2>
        <button
          onClick={closeAddModal}
          className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleAddUser} className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Password Field with Toggle */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">Password</label>
          <div className="relative">
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="4"
              className="w-full bg-gray-800 text-white px-4 py-2 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {formData.showPassword ? (
                <EyeOff className="w-5 h-5" />  // Hidden
              ) : (
                <Eye className="w-5 h-5" />      // Visible
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Subscription</label>
          <select
            name="subscription"
            value={formData.subscription}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">Billing Cycle</label>
          <select
            name="billing"
            value={formData.billing}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="lifetime">Lifetime</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="w-full bg-[#62c1bf] hover:bg-[#5ab0ae] text-black font-medium py-3 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adding User..." : "Add User"}
        </button>
      </form>
    </div>
  </div>
)}
    </div>
  );
}