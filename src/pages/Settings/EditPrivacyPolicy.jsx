// import { Button } from "antd";
// import ReactQuill from "react-quill";
// import { useNavigate } from "react-router-dom";
// import "react-quill/dist/quill.snow.css";
// import Quill from "quill";
// import { useState } from "react";
// import { FaAngleLeft } from "react-icons/fa6";

// // Import 'size' style attributor
// const Size = Quill.import("attributors/style/size");
// Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
// Quill.register(Size, true);

// const modules = {
//   toolbar: {
//     container: [
//       [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
//       [{ color: [] }], // Text color dropdown
//       ["bold", "italic", "underline", 'strike'], // Formatting options
//       [{ align: [] }],
//       ["image", "link"],
//       [{ list: 'bullet' }],
//     ],
//     handlers: {
//       align: function (value) {
//         this.quill.format('align', value);
//       },
//     },
//   },
// };

// const formats = [
//   "size", // Custom font sizes
//   "color",
//   "align",
//   "bold",
//   "italic",
//   "underline",
//   "link",
//   "image",
//   "list",
// ];

// const EditPrivacyPolicy = () => {
//   const navigate = useNavigate();
//   const [content, setContent] = useState("");
//   const placeholder = "Enter your update privacy policy...";
//   console.log(content);
//   return (
//     <>
//       <div className="flex items-center gap-2 text-xl text-white">
//         <FaAngleLeft />
//         <h1>Privacy & Policy</h1>
//       </div>
//       <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-[#373737] text-white">
//         <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//           <h3 className="text-2xl text-white mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
//             Privacy & Policy Edit
//           </h3>
//           <div className="w-full px-16">
//             <div className="h-full border border-gray-400 rounded-md">
//               <div className="ql-toolbar-container h-56">
                
//                 <ReactQuill
//                   placeholder="Enter your update terms & conditions..."
//                   theme="snow"
//                   value={content}
//                   onChange={(value) => setContent(value)}
//                   modules={modules}
//                   formats={formats}
//                   className="custom-quill-editor bg-white text-black h-full"
//                 />
//               </div>
//             </div>

//           </div>
//           <div className="flex justify-end pt-8 pr-16">
//             <Button
//               onClick={(e) => navigate(`edit`)}
//               size="large"
//               type="primary"
//               className="px-8 bg-[#62C1BF] text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
//             >
//               Update
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditPrivacyPolicy;
import { Button, message } from "antd";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";        
import { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { usePrivacyPoliciesQuery, useUpdatePrivacyPolicyMutation } from "../../redux/features/privacySlice";
import Loading from "../../Components/Loading";

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

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = usePrivacyPoliciesQuery(undefined);
  const [updatePrivacyPolicy, { isLoading: isUpdating }] = useUpdatePrivacyPolicyMutation();
  const [content, setContent] = useState("");

  // Initialize content with fetched data
  useEffect(() => {
    if (data?.data?.length > 0 && data.data[0]?.content) {
      setContent(data.data[0].content);
    }
  }, [data]);

  const handleUpdate = async () => {
    if (!data?.data?.length || !data.data[0]?.id) {
      message.error("No privacy policy data available to update.");
      return;
    }

    try {
      await updatePrivacyPolicy({
        id: data.data[0].id,
        content,
      }).unwrap();
      message.success("Privacy policy updated successfully!");
      navigate(-1); // Adjust the route as needed
    } catch (err) {
      message.error("Failed to update privacy policy. Please try again.");
    }
  };

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to load privacy policy."}</div>;
  }

  if (!data?.data?.length) {
    return <div>No privacy policy data available.</div>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-xl mb-4 text-white ">
        <FaAngleLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <h1 >Privacy & Policy</h1>
      </div>
      <div className="rounded-lg py-4 border border-gray-200 shadow-lg mt-8 bg-white">
        <div className="space-y-6 min-h-[83vh] rounded-2xl">
          <h3 className="text-2xl text-black mb-4 border-b-2 border-gray-200 pb-3 pl-16">
            Privacy & Policy Edit
          </h3>
          <div className="w-full px-16">
            <div className="border border-gray-400 rounded-md">
              <ReactQuill
                placeholder="Enter your privacy policy..."
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

export default EditPrivacyPolicy;