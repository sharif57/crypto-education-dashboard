/* eslint-disable react/prop-types */


// import { Link, useSearchParams } from "react-router-dom";
// import { useDeleteVideoMutation, useSignleVideoUpdateMutation, useSingleVideoQuery } from "../../../redux/features/tutorialSlice";
// import Loading from "../../../Components/Loading";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";

// export default function CategoryRelatedVideo() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");
//   const { data, isLoading, error } = useSingleVideoQuery(id);
//   const [deleteVideo] = useDeleteVideoMutation();
//   const [signleVideoUpdate, { isLoading: isUpdating }] = useSignleVideoUpdateMutation();
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [selectedVideoFile, setSelectedVideoFile] = useState(null);
//   const [previewVideoUrl, setPreviewVideoUrl] = useState("");

//   useEffect(() => {
//     if (!selectedVideoFile) return undefined;

//     const objectUrl = URL.createObjectURL(selectedVideoFile);
//     setPreviewVideoUrl(objectUrl);

//     return () => {
//       URL.revokeObjectURL(objectUrl);
//     };
//   }, [selectedVideoFile]);

//   if (isLoading) {
//     return <div><Loading /></div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-4">Error loading videos. Please try again.</div>;
//   }

//   const videos = data?.data?.videos || [];
//   console.log(videos);

//   const handleDelete = async (id) => {
//     try {
//       const res = await deleteVideo(id).unwrap();
//       toast.success(res?.message || "Video deleted successfully!");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to delete video. Please try again.");
//       console.error("Delete error:", err);
//     }
//   };

//   const handleEdit = (video) => {
//     setSelectedVideo(video);
//     setTitle(video.title);
//     setDuration(video.duration_seconds || "");
//     setSelectedPdf(null); // Reset PDF on edit
//     setSelectedVideoFile(null);
//     setPreviewVideoUrl(video.video_file || "");
//     setOpenModal(true);
//   };

//   const handleVideoFileChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     if (!file.type.startsWith("video/")) {
//       toast.error("Please upload a valid video file.");
//       return;
//     }

//     setSelectedVideoFile(file);
//   };

//   const handleUpdate = async () => {
//     if (!selectedVideo) return;

//     // Validation
//     if (!title.trim()) {
//       toast.error("Title is required.");
//       return;
//     }
//     if (!duration || isNaN(duration) || duration <= 0) {
//       toast.error("Please enter a valid duration in seconds.");
//       return;
//     }
//     if (selectedPdf && selectedPdf.type !== "application/pdf") {
//       toast.error("Please upload a valid PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("duration_seconds", duration);

//     // Append video_resource only if a new PDF is selected
//     if (selectedPdf) {
//       formData.append("video_resource", selectedPdf);
//     }

//     if (selectedVideoFile) {
//       formData.append("video_file_url", selectedVideoFile);
//     }

//     try {
//       const res = await signleVideoUpdate({
//         id: selectedVideo.object_id,
//         data: formData,
//       }).unwrap();
//       toast.success(res?.message || "Video updated successfully!");
//       setOpenModal(false);
//       setSelectedVideo(null);
//       setSelectedPdf(null); // Reset PDF after success
//       setSelectedVideoFile(null);
//       setPreviewVideoUrl("");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update video. Please try again.");
//       console.error("Update error:", err);
//     }
//   };

//   const handleCancel = () => {
//     setOpenModal(false);
//     setSelectedVideo(null);
//     setTitle("");
//     setDuration("");
//     setSelectedPdf(null); // Reset PDF on cancel
//     setSelectedVideoFile(null);
//     setPreviewVideoUrl("");
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-end">
//         <Link to={`/video/related-video-add/${id}`}>
//           <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF]/80 text-black rounded-full mt-4 transition-colors">
//             Add New Video
//           </button>
//         </Link>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//         {videos.map((video) => (
//           <div key={video.object_id} className="p-4 bg-gray-800 rounded-lg">
//             <video
//               controls
//               className="w-full h-40 object-cover rounded-md"
//               src={video.video_file}
//             >
//               Your browser does not support the video tag.
//             </video>
//             <div className="mt-2 flex flex-col">
//               <h3 className="text-lg text-white font-medium">{video.title}</h3>
//               <p className="text-[#62C1BF]">Language: {video.language_name}</p>
//               <p className="text-gray-400">Duration: {video.duration_seconds ? `${video.duration_seconds} seconds` : "N/A"}</p>
//             </div>
//             <button
//               onClick={() => handleDelete(video.object_id)}
//               className="mt-2 px-4 w-full py-2 bg-[#FF0000] text-white rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => handleEdit(video)}
//               className="mt-2 px-4 w-full py-2 bg-[#62C1BF] text-white rounded"
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div>

//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">Edit Video</h2>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 placeholder="Enter video title"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 className="mt-1 p-2 w-full border rounded-md"
//                 placeholder="Enter duration in seconds"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Video Resource (PDF)</label>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setSelectedPdf(e.target.files[0])}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {selectedPdf && <p className="text-sm text-gray-500 mt-1">{selectedPdf.name}</p>}
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Video File</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideoFileChange}
//                 className="mt-1 p-2 w-full border rounded-md"
//               />
//               {selectedVideoFile && (
//                 <p className="text-sm text-gray-500 mt-1">{selectedVideoFile.name}</p>
//               )}
//             </div>
//             {(previewVideoUrl || selectedVideo?.video_file) && (
//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Video Preview</p>
//                 <video
//                   controls
//                   className="w-full h-44 rounded-md bg-black"
//                   src={previewVideoUrl || selectedVideo?.video_file}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 disabled={isUpdating}
//                 className="px-4 py-2 bg-[#62C1BF] text-white rounded hover:bg-[#62C1BF]/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               >
//                 {isUpdating ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {videos.length === 0 && (
//         <p className="text-center text-gray-400 mt-4">No videos available for this category.</p>
//       )}
//     </div>
//   );
// }

// import { Link, useSearchParams } from "react-router-dom";
// import {
//   useDeleteVideoMutation,
//   usePositionUpdateMutation,
//   useSignleVideoUpdateMutation,
//   useSingleVideoQuery,
// } from "../../../redux/features/tutorialSlice";
// import Loading from "../../../Components/Loading";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";

// import {
//   DndContext,
//   closestCenter,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   useSortable,
//   rectSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// // ── Drag Handle Icon (6 dots) ─────────────────────────────────────────────────
// function DragHandleIcon() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//       className="text-gray-400"
//     >
//       <circle cx="7" cy="5"  r="1.5" />
//       <circle cx="13" cy="5"  r="1.5" />
//       <circle cx="7" cy="10" r="1.5" />
//       <circle cx="13" cy="10" r="1.5" />
//       <circle cx="7" cy="15" r="1.5" />
//       <circle cx="13" cy="15" r="1.5" />
//     </svg>
//   );
// }

// // ── Sortable Video Card ───────────────────────────────────────────────────────
// function SortableVideoCard({ video, onDelete, onEdit }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     setActivatorNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: video.object_id });

//   const cardStyle = {
//     transform: CSS.Transform.toString(transform),
//     transition: transition || "transform 200ms ease",
//     opacity: isDragging ? 0.3 : 1,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={cardStyle}
//       className={`bg-gray-800 rounded-lg overflow-hidden relative ${
//         isDragging ? "ring-2 ring-[#62C1BF]" : ""
//       }`}
//     >
//       {/* ── Drag Handle: শুধু এই ⠿ icon ধরে drag করা যাবে ── */}
//       <div
//         ref={setActivatorNodeRef}
//         {...listeners}
//         {...attributes}
//         className="absolute top-2 left-2 z-20 bg-red hover:bg-black/80 rounded p-1.5
//                    cursor-grab active:cursor-grabbing transition-colors select-none touch-none"
//         title="Drag to reorder"
//       >
//         <DragHandleIcon />
//       </div>

//       {/* Video element — drag handle এর বাইরে click করলে drag হবে না */}
//       <video
//         controls
//         className="w-full h-40 object-cover"
//         src={video.video_file}
//         // video controls যাতে drag trigger না করে
//         onPointerDown={(e) => e.stopPropagation()}
//       >
//         Your browser does not support the video tag.
//       </video>

//       <div className="p-4">
//         <div className="pl-1">
//           <h3 className="text-base text-white font-medium leading-snug">
//             {video.title}
//           </h3>
//           {video.language_name && (
//             <p className="text-[#62C1BF] text-sm mt-0.5">
//               Language: {video.language_name}
//             </p>
//           )}
//           <p className="text-gray-400 text-sm">
//             Duration:{" "}
//             {video.duration_seconds
//               ? `${video.duration_seconds} seconds`
//               : "N/A"}
//           </p>
//           <p className="text-gray-600 text-xs mt-0.5">Order: {video.order}</p>
//         </div>

//         <button
//           onClick={() => onDelete(video.object_id)}
//           className="mt-3 w-full py-2 bg-red text-white rounded hover:bg-red-700 transition-colors"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => onEdit(video)}
//           className="mt-2 w-full py-2 bg-[#62C1BF] text-white rounded hover:bg-[#62C1BF]/80 transition-colors"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// }

// // ── Ghost card shown while dragging ──────────────────────────────────────────
// function OverlayCard({ video }) {
//   if (!video) return null;
//   return (
//     <div className="bg-gray-700 rounded-lg overflow-hidden shadow-2xl ring-2 ring-[#62C1BF] rotate-2 scale-105 pointer-events-none">
//       <div className="w-full h-40 bg-gray-900 flex items-center justify-center">
//         <svg
//           className="w-14 h-14 text-[#62C1BF] opacity-50"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={1.5}
//             d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//           />
//         </svg>
//       </div>
//       <div className="p-4">
//         <h3 className="text-white font-medium text-sm truncate">{video.title}</h3>
//         <p className="text-gray-400 text-xs mt-1">
//           {video.duration_seconds ? `${video.duration_seconds}s` : "N/A"}
//         </p>
//       </div>
//     </div>
//   );
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// export default function CategoryRelatedVideo() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");

//   const { data, isLoading, error } = useSingleVideoQuery(id);
//   const [deleteVideo] = useDeleteVideoMutation();
//   const [signleVideoUpdate, { isLoading: isUpdating }] =
//     useSignleVideoUpdateMutation();

//     const [positionUpdate] = usePositionUpdateMutation();

//   const [videoList, setVideoList] = useState([]);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const [isSavingOrder, setIsSavingOrder] = useState(false);

//   // Modal state
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");
//   const [selectedPdf, setSelectedPdf] = useState(null);
//   const [selectedVideoFile, setSelectedVideoFile] = useState(null);
//   const [previewVideoUrl, setPreviewVideoUrl] = useState("");

//   useEffect(() => {
//     if (data?.data?.videos) {
//       const sorted = [...data.data.videos].sort((a, b) => a.order - b.order);
//       setVideoList(sorted);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (!selectedVideoFile) return;
//     const url = URL.createObjectURL(selectedVideoFile);
//     setPreviewVideoUrl(url);
//     return () => URL.revokeObjectURL(url);
//   }, [selectedVideoFile]);

//   // ── Sensors ──
//   // MouseSensor: mouse দিয়ে 5px সরালে drag শুরু হয়
//   // TouchSensor: touch screen এ 250ms hold করলে drag শুরু হয়
//   const sensors = useSensors(
//     useSensor(MouseSensor, {
//       activationConstraint: { distance: 5 },
//     }),
//     useSensor(TouchSensor, {
//       activationConstraint: { delay: 250, tolerance: 5 },
//     })
//   );

//   const handleDragStart = ({ active }) => {
//     const found = videoList.find((v) => v.object_id === active.id);
//     setActiveVideo(found ?? null);
//   };

//   const handleDragEnd = async ({ active, over }) => {
//     setActiveVideo(null);
//     if (!over || active.id === over.id) return;

//     const draggedVideo = videoList.find((v) => v.object_id === active.id);
//     const targetVideo  = videoList.find((v) => v.object_id === over.id);
//     if (!draggedVideo || !targetVideo) return;

//     const draggedOrder = draggedVideo.order;
//     const targetOrder  = targetVideo.order;

//     // ── Optimistic UI update ──
//     setVideoList((prev) => {
//       const oldIndex = prev.findIndex((v) => v.object_id === active.id);
//       const newIndex = prev.findIndex((v) => v.object_id === over.id);
//       const next = [...prev];
//       const [moved] = next.splice(oldIndex, 1);
//       next.splice(newIndex, 0, moved);
//       return next;
//     });

//     // ── API: দুটো video এর order swap ──
//     try {
//       setIsSavingOrder(true);

//       // Dragged video → target এর order
//       await signleVideoUpdate({
//         id: draggedVideo.object_id,
//         data: { order: targetOrder },
//       }).unwrap();

//       // Target video → dragged video এর পুরানো order
//       // await signleVideoUpdate({
//       //   id: targetVideo.object_id,
//       //   data: { order: draggedOrder },
//       // }).unwrap();

//       toast.success("Video order updated!");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update order.");
//       // Error হলে revert
//       if (data?.data?.videos) {
//         const sorted = [...data.data.videos].sort((a, b) => a.order - b.order);
//         setVideoList(sorted);
//       }
//     } finally {
//       setIsSavingOrder(false);
//     }
//   };

//   const handleDragCancel = () => {
//     setActiveVideo(null);
//     if (data?.data?.videos) {
//       const sorted = [...data.data.videos].sort((a, b) => a.order - b.order);
//       setVideoList(sorted);
//     }
//   };

//   const handleDelete = async (videoId) => {
//     try {
//       const res = await deleteVideo(videoId).unwrap();
//       toast.success(res?.message || "Video deleted successfully!");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to delete video.");
//     }
//   };

//   const handleEdit = (video) => {
//     setSelectedVideo(video);
//     setTitle(video.title);
//     setDuration(video.duration_seconds || "");
//     setSelectedPdf(null);
//     setSelectedVideoFile(null);
//     setPreviewVideoUrl(video.video_file || "");
//     setOpenModal(true);
//   };

//   const handleVideoFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (!file.type.startsWith("video/")) {
//       toast.error("Please upload a valid video file.");
//       return;
//     }
//     setSelectedVideoFile(file);
//   };

//   const handleUpdate = async () => {
//     if (!selectedVideo) return;
//     if (!title.trim()) { toast.error("Title is required."); return; }
//     if (!duration || isNaN(duration) || Number(duration) <= 0) {
//       toast.error("Please enter a valid duration in seconds.");
//       return;
//     }
//     if (selectedPdf && selectedPdf.type !== "application/pdf") {
//       toast.error("Please upload a valid PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("duration_seconds", duration);
//     if (selectedPdf)       formData.append("video_resource", selectedPdf);
//     if (selectedVideoFile) formData.append("video_file_url", selectedVideoFile);

//     try {
//       const res = await signleVideoUpdate({
//         id: selectedVideo.object_id,
//         data: formData,
//       }).unwrap();
//       toast.success(res?.message || "Video updated successfully!");
//       setOpenModal(false);
//       setSelectedVideo(null);
//       setSelectedPdf(null);
//       setSelectedVideoFile(null);
//       setPreviewVideoUrl("");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to update video.");
//     }
//   };

//   const handleCancel = () => {
//     setOpenModal(false);
//     setSelectedVideo(null);
//     setTitle("");
//     setDuration("");
//     setSelectedPdf(null);
//     setSelectedVideoFile(null);
//     setPreviewVideoUrl("");
//   };

//   if (isLoading) return <div><Loading /></div>;
//   if (error)
//     return (
//       <div className="text-center text-red-500 mt-4">
//         Error loading videos. Please try again.
//       </div>
//     );

//   return (
//     <div className="p-4">
//       {/* ── Header ── */}
//       <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
//         <div className="flex items-center gap-2 text-gray-400 text-sm select-none">
//           <DragHandleIcon />
//           {isSavingOrder ? (
//             <span className="text-[#62C1BF] animate-pulse">Saving order...</span>
//           ) : (
//             <span>Drag the ⠿ icon to reorder</span>
//           )}
//         </div>
//         <Link to={`/video/related-video-add/${id}`}>
//           <button className="px-6 py-2.5 bg-[#62C1BF] hover:bg-[#62C1BF]/80 text-black font-medium rounded-full transition-colors">
//             + Add New Video
//           </button>
//         </Link>
//       </div>

//       {/* ── DnD Grid ── */}
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragStart={handleDragStart}
//         onDragEnd={handleDragEnd}
//         onDragCancel={handleDragCancel}
//       >
//         <SortableContext
//           items={videoList.map((v) => v.object_id)}
//           strategy={rectSortingStrategy}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {videoList.map((video) => (
//               <SortableVideoCard
//                 key={video.object_id}
//                 video={video}
//                 onDelete={handleDelete}
//                 onEdit={handleEdit}
//               />
//             ))}
//           </div>
//         </SortableContext>

//         <DragOverlay
//           dropAnimation={{ duration: 180, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}
//         >
//           <OverlayCard video={activeVideo} />
//         </DragOverlay>
//       </DndContext>

//       {videoList.length === 0 && (
//         <p className="text-center text-gray-400 mt-8">
//           No videos available for this category.
//         </p>
//       )}

//       {/* ── Edit Modal ── */}
//       {openModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
//           <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <h2 className="text-lg font-semibold mb-5 text-gray-800">Edit Video</h2>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="p-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62C1BF]"
//                 placeholder="Enter video title"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Duration (seconds)
//               </label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(e.target.value)}
//                 className="p-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#62C1BF]"
//                 placeholder="Enter duration in seconds"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Video Resource (PDF)
//               </label>
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setSelectedPdf(e.target.files[0])}
//                 className="p-2 w-full border border-gray-300 rounded-lg text-sm"
//               />
//               {selectedPdf && (
//                 <p className="text-xs text-gray-500 mt-1">{selectedPdf.name}</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Video File
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={handleVideoFileChange}
//                 className="p-2 w-full border border-gray-300 rounded-lg text-sm"
//               />
//               {selectedVideoFile && (
//                 <p className="text-xs text-gray-500 mt-1">{selectedVideoFile.name}</p>
//               )}
//             </div>

//             {(previewVideoUrl || selectedVideo?.video_file) && (
//               <div className="mb-4">
//                 <p className="text-sm font-medium text-gray-700 mb-2">Video Preview</p>
//                 <video
//                   controls
//                   className="w-full h-44 rounded-lg bg-black"
//                   src={previewVideoUrl || selectedVideo?.video_file}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             )}

//             <div className="flex justify-end gap-3 mt-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 disabled={isUpdating}
//                 className="px-5 py-2 bg-[#62C1BF] text-white rounded-lg hover:bg-[#62C1BF]/80 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//               >
//                 {isUpdating ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { Link, useSearchParams } from "react-router-dom";
import {
  useDeleteVideoMutation,
  usePositionUpdateMutation,
  useSignleVideoUpdateMutation,
  useSingleVideoQuery,
} from "../../../redux/features/tutorialSlice";
import Loading from "../../../Components/Loading";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// ─────────────────────────────────────────────────────────────────────────────
// Drag Handle Bar — full width top bar, always visible
// ─────────────────────────────────────────────────────────────────────────────
function DragHandleBar({ activatorRef, listeners, attributes }) {
  return (
    <div
      ref={activatorRef}
      {...listeners}
      {...attributes}
      className="w-full flex items-center justify-center gap-2 py-2.5 px-4
                 bg-gradient-to-r from-[#2a2a3a] to-[#252535]
                 cursor-grab active:cursor-grabbing select-none touch-none
                 border-b border-white/10 group transition-all duration-200
                 hover:from-[#62C1BF]/20 hover:to-[#62C1BF]/10"
      title="Hold and drag to reorder"
    >
      {/* Left line */}
      <div className="h-px flex-1 bg-white/10 group-hover:bg-[#62C1BF]/40 transition-colors" />

      {/* 6-dot grip + label */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-[4px]">
          <div className="flex gap-[4px]">
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
          </div>
          <div className="flex gap-[4px]">
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
          </div>
          <div className="flex gap-[4px]">
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
            <span className="w-[5px] h-[5px] rounded-full bg-gray-500 group-hover:bg-[#62C1BF] transition-colors" />
          </div>
        </div>
        <span className="text-xs text-gray-500 group-hover:text-[#62C1BF] font-medium transition-colors">
          Drag to reorder
        </span>
      </div>

      {/* Right line */}
      <div className="h-px flex-1 bg-white/10 group-hover:bg-[#62C1BF]/40 transition-colors" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sortable Video Card
// ─────────────────────────────────────────────────────────────────────────────
function SortableVideoCard({ video, onDeleteClick, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: video.object_id });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 220ms ease",
    opacity: isDragging ? 0.25 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      className={`flex flex-col bg-[#1e1e2e] rounded-xl overflow-hidden shadow-lg
        border transition-all duration-200
        ${isDragging
          ? "border-[#62C1BF] shadow-[0_0_20px_rgba(98,193,191,0.3)]"
          : "border-white/5 hover:border-white/15"
        }`}
    >
      {/* ── TOP DRAG HANDLE BAR ── */}
      <DragHandleBar
        activatorRef={setActivatorNodeRef}
        listeners={listeners}
        attributes={attributes}
      />

      {/* ── VIDEO ── */}
      <div className="relative">
        <video
          controls
          className="w-full h-44 object-cover bg-black"
          src={video.video_file}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Your browser does not support the video tag.
        </video>

        {/* Position badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm
                        text-[#62C1BF] text-xs font-bold px-2.5 py-0.5 rounded-full
                        border border-[#62C1BF]/40">
          #{video.position}
        </div>
      </div>

      {/* ── INFO ── */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
          {video.title}
        </h3>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {video.language_name && (
            <span className="inline-flex items-center gap-1 text-xs
                             bg-[#62C1BF]/15 text-[#62C1BF] px-2 py-0.5
                             rounded-full border border-[#62C1BF]/25">
              🌐 {video.language_name}
            </span>
          )}
          {video.duration_seconds && (
            <span className="inline-flex items-center gap-1 text-xs
                             bg-white/5 text-gray-400 px-2 py-0.5
                             rounded-full border border-white/10">
              ⏱ {video.duration_seconds}s
            </span>
          )}
        </div>
      </div>

      {/* ── ACTIONS ── */}
      <div className="flex gap-2 p-4 pt-0">
        <button
          onClick={() => onDeleteClick(video)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                     bg-red border border-red-500/30 text-white text-sm font-medium
                     hover:bg-red-500/20 hover:border-red-500/60 hover:text-red-300
                     transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
        <button
          onClick={() => onEdit(video)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
                     bg-[#62C1BF]/10 border border-[#62C1BF]/30 text-[#62C1BF] text-sm font-medium
                     hover:bg-[#62C1BF]/25 hover:border-[#62C1BF]/60
                     transition-all duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ghost overlay card while dragging
// ─────────────────────────────────────────────────────────────────────────────
function OverlayCard({ video }) {
  if (!video) return null;
  return (
    <div className="bg-[#1e1e2e] rounded-xl overflow-hidden shadow-2xl
                    border-2 border-[#62C1BF] rotate-2 scale-105
                    shadow-[0_0_30px_rgba(98,193,191,0.4)] pointer-events-none">
      <div className="w-full py-2.5 px-4 bg-[#62C1BF]/20 flex items-center justify-center gap-2">
        <div className="flex flex-col gap-[3px]">
          {[0,1,2].map(i => (
            <div key={i} className="flex gap-[3px]">
              <span className="w-[4px] h-[4px] rounded-full bg-[#62C1BF]" />
              <span className="w-[4px] h-[4px] rounded-full bg-[#62C1BF]" />
            </div>
          ))}
        </div>
        <span className="text-xs text-[#62C1BF] font-medium">Moving...</span>
      </div>
      <div className="w-full h-36 bg-gray-900 flex items-center justify-center">
        <svg className="w-12 h-12 text-[#62C1BF]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-medium truncate">{video.title}</p>
        <p className="text-gray-500 text-xs mt-0.5">Position #{video.position}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CategoryRelatedVideo() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading, error } = useSingleVideoQuery(id);
  const [deleteVideo]                                    = useDeleteVideoMutation();
  const [signleVideoUpdate, { isLoading: isUpdating }]  = useSignleVideoUpdateMutation();
  const [positionUpdate]                                 = usePositionUpdateMutation();

  const [videoList, setVideoList]         = useState([]);
  const [activeVideo, setActiveVideo]     = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // ── Delete modal ──
  const [deleteModal, setDeleteModal]       = useState(false);
  const [videoToDelete, setVideoToDelete]   = useState(null);
  const [isDeleting, setIsDeleting]         = useState(false);

  // ── Edit modal ──
  const [openModal, setOpenModal]                       = useState(false);
  const [selectedVideo, setSelectedVideo]               = useState(null);
  const [title, setTitle]                               = useState("");
  const [duration, setDuration]                         = useState("");
  const [selectedPdf, setSelectedPdf]                   = useState(null);
  const [selectedVideoFile, setSelectedVideoFile]       = useState(null);
  const [previewVideoUrl, setPreviewVideoUrl]           = useState("");

  // API data → sort by position
  useEffect(() => {
    if (data?.data?.videos) {
      const sorted = [...data.data.videos].sort((a, b) => a.position - b.position);
      setVideoList(sorted);
    }
  }, [data]);

  useEffect(() => {
    if (!selectedVideoFile) return;
    const url = URL.createObjectURL(selectedVideoFile);
    setPreviewVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedVideoFile]);

  // ── Sensors ──
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  // ── Drag Start ──
  const handleDragStart = ({ active }) => {
    setActiveVideo(videoList.find((v) => v.object_id === active.id) ?? null);
  };

  // ── Drag End → send new_position to API ──
  const handleDragEnd = async ({ active, over }) => {
    setActiveVideo(null);
    if (!over || active.id === over.id) return;

    const oldIndex = videoList.findIndex((v) => v.object_id === active.id);
    const newIndex = videoList.findIndex((v) => v.object_id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const draggedVideo = videoList[oldIndex];
    // new_position = target card এর current position value
    const new_position = videoList[newIndex].position;

    // ── 1. Optimistic UI: list এ সরাও ──
    setVideoList((prev) => {
      const next = [...prev];
      const [moved] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, moved);
      return next;
    });

    // ── 2. API call: dragged video এর id + new_position পাঠাও ──
    try {
      setIsSavingOrder(true);
      await positionUpdate({
        id: draggedVideo.object_id,       // যে video move হলো তার id
        data: { new_position },           // যে position এ রাখতে চাই
      }).unwrap();
      toast.success("Video order updated!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update order.");
      // Error হলে revert
      if (data?.data?.videos) {
        setVideoList([...data.data.videos].sort((a, b) => a.position - b.position));
      }
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleDragCancel = () => {
    setActiveVideo(null);
    if (data?.data?.videos) {
      setVideoList([...data.data.videos].sort((a, b) => a.position - b.position));
    }
  };

  // ── Delete handlers ──
  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!videoToDelete) return;
    try {
      setIsDeleting(true);
      const res = await deleteVideo(videoToDelete.object_id).unwrap();
      toast.success(res?.message || "Video deleted successfully!");
      setDeleteModal(false);
      setVideoToDelete(null);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete video.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal(false);
    setVideoToDelete(null);
  };

  // ── Edit handlers ──
  const handleEdit = (video) => {
    setSelectedVideo(video);
    setTitle(video.title);
    setDuration(video.duration_seconds || "");
    setSelectedPdf(null);
    setSelectedVideoFile(null);
    setPreviewVideoUrl(video.video_file || "");
    setOpenModal(true);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a valid video file.");
      return;
    }
    setSelectedVideoFile(file);
  };

  const handleUpdate = async () => {
    if (!selectedVideo) return;
    if (!title.trim()) { toast.error("Title is required."); return; }
    if (!duration || isNaN(duration) || Number(duration) <= 0) {
      toast.error("Please enter a valid duration in seconds."); return;
    }
    if (selectedPdf && selectedPdf.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file."); return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration_seconds", duration);
    if (selectedPdf)       formData.append("video_resource", selectedPdf);
    if (selectedVideoFile) formData.append("video_file_url", selectedVideoFile);

    try {
      const res = await signleVideoUpdate({ id: selectedVideo.object_id, data: formData }).unwrap();
      toast.success(res?.message || "Video updated successfully!");
      setOpenModal(false);
      setSelectedVideo(null);
      setSelectedPdf(null);
      setSelectedVideoFile(null);
      setPreviewVideoUrl("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update video.");
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedVideo(null);
    setTitle("");
    setDuration("");
    setSelectedPdf(null);
    setSelectedVideoFile(null);
    setPreviewVideoUrl("");
  };

  // ── Render ──
  if (isLoading) return <div><Loading /></div>;
  if (error) return (
    <div className="text-center text-red-500 mt-4">Error loading videos. Please try again.</div>
  );

  return (
    <div className="p-5">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2.5 bg-[#1e1e2e] border border-white/10
                        rounded-xl px-4 py-2.5 text-sm">
          <div className="flex flex-col gap-[3px]">
            {[0,1,2].map(i => (
              <div key={i} className="flex gap-[3px]">
                <span className="w-[4px] h-[4px] rounded-full bg-[#62C1BF]" />
                <span className="w-[4px] h-[4px] rounded-full bg-[#62C1BF]" />
              </div>
            ))}
          </div>
          {isSavingOrder ? (
            <span className="text-[#62C1BF] animate-pulse font-medium">Saving order...</span>
          ) : (
            <span className="text-gray-400">Drag the top bar of a card to reorder</span>
          )}
        </div>

        <Link to={`/video/related-video-add/${id}`}>
          <button className="flex items-center gap-2 px-5 py-2.5
                             bg-[#62C1BF] hover:bg-[#4eaaa8] text-black font-semibold
                             rounded-xl transition-all duration-200 shadow-lg
                             shadow-[#62C1BF]/20 hover:shadow-[#62C1BF]/40">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add New Video
          </button>
        </Link>
      </div>

      {/* ── DnD Grid ── */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={videoList.map((v) => v.object_id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {videoList.map((video) => (
              <SortableVideoCard
                key={video.object_id}
                video={video}
                onDeleteClick={handleDeleteClick}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(0.18,0.67,0.6,1.22)" }}>
          <OverlayCard video={activeVideo} />
        </DragOverlay>
      </DndContext>

      {videoList.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-16 gap-3 text-gray-500">
          <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          <p className="text-sm">No videos available for this category.</p>
        </div>
      )}

      {/* ═══════════ DELETE CONFIRMATION MODAL ═══════════ */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/10">

            {/* Red header */}
            <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-5 flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2 shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-bold text-base">Delete Video</h2>
                <p className="text-red-200 text-xs mt-0.5">This action cannot be undone</p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <p className="text-gray-300 text-sm leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-white">{videoToDelete?.title}</span>?
              </p>

              {videoToDelete?.video_file && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <video src={videoToDelete.video_file} className="w-full h-28 object-cover bg-gray-900" />
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {videoToDelete?.language_name && (
                  <span className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/10">
                    🌐 {videoToDelete.language_name}
                  </span>
                )}
                {videoToDelete?.duration_seconds && (
                  <span className="text-xs bg-white/5 text-gray-400 px-2.5 py-1 rounded-full border border-white/10">
                    ⏱ {videoToDelete.duration_seconds}s
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-white/5 text-gray-300 border border-white/10
                           rounded-xl font-medium hover:bg-white/10 transition-all disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium
                           hover:bg-red-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ EDIT MODAL ═══════════ */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl w-full max-w-md
                          max-h-[90vh] overflow-y-auto border border-white/10">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-[#62C1BF]/20 rounded-lg p-2">
                  <svg className="w-4 h-4 text-[#62C1BF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
                <h2 className="text-white font-bold text-base">Edit Video</h2>
              </div>
              <button onClick={handleCancel}
                className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl
                             px-3.5 py-2.5 text-sm placeholder-gray-600
                             focus:outline-none focus:border-[#62C1BF]/60 focus:ring-1
                             focus:ring-[#62C1BF]/30 transition-all"
                  placeholder="Enter video title"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl
                             px-3.5 py-2.5 text-sm placeholder-gray-600
                             focus:outline-none focus:border-[#62C1BF]/60 focus:ring-1
                             focus:ring-[#62C1BF]/30 transition-all"
                  placeholder="e.g. 120"
                />
              </div>

              {/* PDF */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Video Resource (PDF)
                </label>
                <label className="flex items-center gap-2 w-full bg-white/5 border border-white/10
                                  border-dashed rounded-xl px-3.5 py-3 cursor-pointer
                                  hover:border-[#62C1BF]/40 hover:bg-[#62C1BF]/5 transition-all">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="text-sm text-gray-400 truncate">
                    {selectedPdf ? selectedPdf.name : "Choose PDF file"}
                  </span>
                  <input type="file" accept=".pdf" className="hidden"
                    onChange={(e) => setSelectedPdf(e.target.files[0])} />
                </label>
              </div>

              {/* Video File */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                  Video File
                </label>
                <label className="flex items-center gap-2 w-full bg-white/5 border border-white/10
                                  border-dashed rounded-xl px-3.5 py-3 cursor-pointer
                                  hover:border-[#62C1BF]/40 hover:bg-[#62C1BF]/5 transition-all">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
                  </svg>
                  <span className="text-sm text-gray-400 truncate">
                    {selectedVideoFile ? selectedVideoFile.name : "Choose video file"}
                  </span>
                  <input type="file" accept="video/*" className="hidden" onChange={handleVideoFileChange} />
                </label>
              </div>

              {/* Preview */}
              {(previewVideoUrl || selectedVideo?.video_file) && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Preview
                  </label>
                  <video
                    controls
                    className="w-full h-40 rounded-xl bg-black border border-white/10"
                    src={previewVideoUrl || selectedVideo?.video_file}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={handleCancel}
                className="flex-1 py-2.5 bg-white/5 text-gray-300 border border-white/10
                           rounded-xl font-medium hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 py-2.5 bg-[#62C1BF] text-black font-semibold rounded-xl
                           hover:bg-[#4eaaa8] transition-all disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}