

import { useRef, useState } from "react";
import { useCreateCategoryMutation } from "../../../redux/features/tutorialSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateCategory() {

   const [searchParams] = useSearchParams();
  const id = searchParams.get("id");    
  console.log(id,'query')      // "1" for ?id=1

  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setImagePreview] = useState(null);
  const [isDraggingOver, setIsDragging] = useState(false);
  const fileRefInput = useRef(null);
  const navigate = useNavigate();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleFileSelect = (file) => {
    if (
      file &&
      ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    ) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result || null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image (JPEG, PNG, JPG)");
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDraggingOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDraggingLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDropping = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelection = () => {
    fileRefInput.current?.click();
  };

  const handleSaving = async () => {
    if (!category.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!selectedImage) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", category);
      formData.append("thumbnail", selectedImage);
      // formData.append("course", id);

      const res = await createCategory({data: formData, id}).unwrap();
      toast.success(res.message || "Category created successfully");
      
      // Reset form
      setCategory("");
      setSelectedImage(null);
      setImagePreview(null);

      // Navigate back
      navigate(-1);
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to create category";
      toast.error(errorMessage);
      console.error("Category creation failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-[#373737] rounded-lg w-full max-w-5xl mx-auto">
        {/* Heading */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-white text-lg font-semibold">Create New Category</h2>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Input for Category Name */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Category Name
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Crypto"
              className="w-full px-4 py-3 bg-[#373737] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Area for Image Upload */}
          <div>
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDraggingOver
                  ? "border-teal-400 bg-teal-400/10"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onDragOver={handleDraggingOver}
              onDragLeave={handleDraggingLeave}
              onDrop={handleDropping}
            >
              {previewImage ? (
                <div className="space-y-4">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                  />
                  <div className="text-white text-sm">{selectedImage?.name}</div>
                  <button
                    onClick={handleFileSelection}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <svg
                      width="110"
                      height="80"
                      viewBox="0 0 110 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M85.9351 80H62.3462V56.164H70.1417C72.1187 56.164 73.2869 53.9174 72.1187 52.2999L56.9544 31.317C55.9884 29.9691 53.989 29.9691 53.023 31.317L37.8587 52.2999C36.6905 53.9174 37.8362 56.164 39.8356 56.164H47.6312V80H21.2117C9.41723 79.3485 0.0266113 68.3179 0.0266113 56.3662C0.0266113 48.1213 4.49727 40.9323 11.1246 37.0458C10.518 35.4058 10.2035 33.6535 10.2035 31.8113C10.2035 23.3867 17.0106 16.5796 25.4352 16.5796C27.2549 16.5796 29.0072 16.8941 30.6472 17.5007C35.5223 7.16653 46.0362 0 58.2574 0C74.0732 0.0224656 87.1033 12.1314 88.586 27.5653C100.74 29.6546 109.973 40.9099 109.973 53.6479C109.973 67.262 99.3695 79.0564 85.9351 80Z"
                        fill="#62C1BF"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white text-lg font-medium mb-2">
                      Upload Image
                    </div>
                    <button
                      onClick={handleFileSelection}
                      className="px-6 py-2 bg-white text-black hover:bg-gray-600 hover:text-white rounded-lg text-sm transition-colors"
                    >
                      Select File
                    </button>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Supported formats: JPEG, PNG, JPG (mobile phone photos)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleSaving}
            disabled={!category.trim() || !selectedImage || isLoading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Hidden Input for File */}
        <input
          ref={fileRefInput}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}