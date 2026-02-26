import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../../Components/Loading";
import {
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useGetResourcesQuery,
  useUpdateResourceMutation,
} from "../../../redux/features/resourceSlice";

export default function Resources() {
  const [resourceLink, setResourceLink] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [editLink, setEditLink] = useState("");
  const [editFile, setEditFile] = useState(null);

  const { data, isLoading: isFetching, isError } = useGetResourcesQuery();
  const [createResource, { isLoading: isCreating }] = useCreateResourceMutation();
  const [updateResource, { isLoading: isUpdating }] = useUpdateResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();

  const resources = data?.data || [];

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "-";
    const parts = url.split("/");
    return decodeURIComponent(parts[parts.length - 1] || "-");
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();

    if (!resourceLink.trim() && !resourceFile) {
      toast.error("Please provide a link or select a file.");
      return;
    }

    const formData = new FormData();
    if (resourceLink.trim()) {
      formData.append("link", resourceLink.trim());
    }
    if (resourceFile) {
      formData.append("file", resourceFile);
    }

    try {
      const res = await createResource(formData);
      if (res?.error) {
        throw new Error(res.error?.data?.detail || "Create failed");
      }

      toast.success("Resource created successfully!");
      setResourceLink("");
      setResourceFile(null);
      e.target.reset();
    } catch (error) {
      toast.error(error.message || "Failed to create resource.");
    }
  };

  const openEditModal = (resource) => {
    setSelectedResource(resource);
    setEditLink(resource?.link || "");
    setEditFile(null);
    setOpenModal(true);
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();

    if (!selectedResource?.object_id) {
      toast.error("Invalid resource selected.");
      return;
    }

    if (!editLink.trim() && !editFile && !selectedResource.file) {
      toast.error("Please provide a link or file.");
      return;
    }

    const formData = new FormData();
    formData.append("link", editLink.trim());
    if (editFile) {
      formData.append("file", editFile);
    }

    try {
      const res = await updateResource({
        id: selectedResource.object_id,
        data: formData,
      });

      if (res?.error) {
        throw new Error(res.error?.data?.detail || "Update failed");
      }

      toast.success("Resource updated successfully!");
      setOpenModal(false);
      setSelectedResource(null);
      setEditFile(null);
    } catch (error) {
      toast.error(error.message || "Failed to update resource.");
    }
  };

  const handleDeleteResource = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteResource(id);
      if (res?.error) {
        throw new Error(res.error?.data?.detail || "Delete failed");
      }

      Swal.fire({
        title: "Deleted!",
        text: "Resource has been deleted.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete the resource.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#373737] rounded-lg p-6">
      <h1 className="text-white text-2xl font-medium mb-6">Resources</h1>

      <div className="bg-[#2f2f2f] rounded-lg p-5 mb-6">
        <h2 className="text-white text-lg font-medium mb-4">Add New Resource</h2>
        <form onSubmit={handleCreateResource} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-gray-300 text-sm block mb-2">Resource Link</label>
            <input
              type="url"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              placeholder="https://example.com/resource"
              className="w-full p-3 bg-[#373737] border border-gray-600 rounded-lg text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm block mb-2">Upload File</label>
            <input
              type="file"
              onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
              className="w-full p-2.5 bg-[#373737] border border-gray-600 rounded-lg text-white file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 file:bg-[#62C1BF] file:text-black"
            />
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-2.5 bg-[#62C1BF] text-black rounded-lg font-medium hover:bg-[#62C1BF]/90 transition-colors disabled:opacity-60"
            >
              {isCreating ? "Creating..." : "Create Resource"}
            </button>
          </div>
        </form>
      </div>

      {isFetching && (
        <div className="py-8">
          <Loading />
        </div>
      )}

      {isError && (
        <div className="text-center text-red-400 py-4">Failed to load resources.</div>
      )}

      {!isFetching && !isError && (
        <div className="w-full overflow-hidden rounded-lg border border-gray-700">
          <div className="bg-[#62C1BF] px-6 py-4 grid grid-cols-12 gap-4 text-black font-medium text-sm">
            <div className="col-span-3">File</div>
            <div className="col-span-4">Link</div>
            <div className="col-span-3">Created At</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="divide-y divide-gray-700">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <div
                  key={resource.object_id}
                  className="px-6 py-4 grid grid-cols-12 gap-4 text-gray-200 text-sm hover:bg-[#3f3f3f] transition-colors"
                >
                  <div className="col-span-3">
                    {resource.file ? (
                      <a
                        href={resource.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#62C1BF] hover:underline break-all"
                      >
                        {getFileNameFromUrl(resource.file)}
                      </a>
                    ) : (
                      <span className="text-gray-400">No file</span>
                    )}
                  </div>

                  <div className="col-span-4 break-all">
                    {resource.link ? (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#62C1BF] hover:underline"
                      >
                        {resource.link}
                      </a>
                    ) : (
                      <span className="text-gray-400">No link</span>
                    )}
                  </div>

                  <div className="col-span-3">{formatDateTime(resource.created_at)}</div>

                  <div className="col-span-2 flex items-center justify-center gap-5">
                    <button
                      onClick={() => openEditModal(resource)}
                      className="text-[#62C1BF] hover:text-[#62C1BF]/80"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResource(resource.object_id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-300 py-6">No resources found.</div>
            )}
          </div>
        </div>
      )}

      {openModal && selectedResource && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#2f2f2f] rounded-lg w-full max-w-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">Edit Resource</h2>

            <form onSubmit={handleUpdateResource} className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm block mb-2">Resource Link</label>
                <input
                  type="url"
                  value={editLink}
                  onChange={(e) => setEditLink(e.target.value)}
                  placeholder="https://example.com/resource"
                  className="w-full p-3 bg-[#373737] border border-gray-600 rounded-lg text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm block mb-2">Replace File (optional)</label>
                <input
                  type="file"
                  onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                  className="w-full p-2.5 bg-[#373737] border border-gray-600 rounded-lg text-white file:mr-3 file:px-3 file:py-1 file:rounded file:border-0 file:bg-[#62C1BF] file:text-black"
                />
                {selectedResource.file && (
                  <a
                    href={selectedResource.file}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-[#62C1BF] text-sm hover:underline break-all"
                  >
                    Current: {getFileNameFromUrl(selectedResource.file)}
                  </a>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpenModal(false);
                    setSelectedResource(null);
                    setEditFile(null);
                  }}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 bg-[#62C1BF] text-black rounded-lg hover:bg-[#62C1BF]/90 disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
