import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";

export default function RelatedVideo() {
  const videos = [
    {
      id: 1,
      title: "Facts and Background: What are virtual currencies ?",
      count: "24 mins",
      type: "document",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 2,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 3,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 4,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 5,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 6,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 7,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
    {
      id: 8,
      title: "Crypto Basics",
      count: "24 mins",
      type: "video",
      image: "/placeholder.svg?height=120&width=200",
    },
  ];
  return (
    <div>
      <div className="flex justify-end mb-8 items-end">
        <Link to={"/video/related-video-add"}>
          <button className="w-64 py-3 bg-[#62C1BF] hover:bg-[#62C1BF] text-black rounded-full mt-4 transition-colors">
            Add New Video 
          </button>{" "}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-[#373737] rounded-lg p-4 ">
            {/* <img
              className="bg-center w-full"
              src="/image.png"
              alt=""
            /> */}
            <video
              className="w-full bg-center rounded-lg"
              controls
              autoPlay
              src="https://videos.pexels.com/video-files/7578639/7578639-uhd_2732_1440_25fps.mp4"
            ></video>

            <h1 className="text-[24px] text-[#F3F3F3] font-medium">
              {video.title}
            </h1>
            <div className="flex justify-between items-center">
              <p className="text-[#62C1BF] text-xl">{video.count}</p>
              <EllipsisVertical className="text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
