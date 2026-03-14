
// export default EditTermsConditions;
import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import Quill from "quill";
import { useAboutUsQuery,  useUpdateAboutUsMutation } from "../../redux/features/privacySlice";

// Register custom font sizes
const Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"];
Quill.register(Size, true);

const modules = {
  toolbar: {
    container: [
      [{ size: ["14px", "16px", "18px"] }],
      [{ color: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      ["image", "link"],
      [{ list: "bullet" }],
    ],
    handlers: {
      align: function (value) {
        this.quill.format("align", value);
      },
    },
  },
};

const formats = [
  "size",
  "color",
  "align",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "list",
];

const EditAboutUs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useAboutUsQuery(undefined);
  const [updateAboutUs, { isLoading: isUpdating }] = useUpdateAboutUsMutation();
  const [content, setContent] = useState("");

  // Initialize content with fetched data
  useEffect(() => {
    if (data?.data?.length > 0 && data.data[0]?.content) {
      setContent(data.data[0].content);
    }
  }, [data]);

  const handleUpdate = async () => {
    if (!data?.data?.length || !data.data[0]?.id) {
      message.error("No about us data available to update.");
      return;
    }

    try {
      await updateAboutUs({
        id: data.data[0].id,
        content,
      }).unwrap();
      message.success("About Us updated successfully!");
      navigate(-1); // Adjust the route as needed
    } catch (err) {
      message.error("Failed to update about us. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error?.data?.message || "Failed to load about us."}</div>;
  }

  if (!data?.data?.length) {
    return <div className="p-4 text-center">No about us data available.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-xl mb-4">
        <FaAngleLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1>About Us</h1>
      </div>
      <div className="rounded-lg py-4 border border-gray-200 shadow-lg mt-8 bg-white">
        <div className="space-y-6 min-h-[83vh]">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-gray-200 pb-3 pl-16">
            About Us Edit
          </h3>
          <div className="w-full px-16">
            <div className="border border-gray-400 rounded-md">
              <ReactQuill
                placeholder="Enter your about us content..."
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="custom-quill-editor"
              />
            </div>
          </div>
          <div className="flex justify-end pt-8 pr-16">
            <Button
              onClick={handleUpdate}
              size="large"
              type="primary"
              loading={isUpdating}
              className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAboutUs;