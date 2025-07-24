
import { useState } from "react";
import { useCreateLiveClassMutation } from "../../../redux/features/liveClassSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LiveClass() {
  const router = useNavigate();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [createLiveClass] =useCreateLiveClassMutation();

  const handleSubmit = (e) => {
    try {
      const res = createLiveClass({ title, link });
      console.log("Live class created:", res);
      toast.success("Live class created successfully!");
      router(-1)
    } catch (error) {
      console.error("Error creating live class:", error);
      toast.error("Failed to create live class. Please try again.");
    }
    e.preventDefault();
    console.log("Form submitted:", { title, link });
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="w-full  bg-[#373737] rounded-lg p-6">
        <h1 className="text-white text-lg font-medium mb-6">Live Class</h1>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
          <div>
            <label
              htmlFor="title"
              className="block text-white text-sm font-medium mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-[#373737] border-2 border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="link"
              className="block text-white text-sm font-medium mb-2"
            >
              Link
            </label>
            <input
              id="link"
              type="url"
              placeholder="Paste your link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-4 py-3 bg-[#373737] border-2 border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-1/3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 mt-6"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
