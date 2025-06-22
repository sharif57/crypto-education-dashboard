import { ArrowLeft, Upload } from "lucide-react";

export default function TrainAI() {
  const pdfFiles = [
    { id: 1, name: "name.pdf" },
    { id: 2, name: "name.pdf" },
  ];

  return (
    <div className=" bg-[#373737]">
      {/* Header */}
      <div className="bg-gray-700 px-6 py-4 flex items-center justify-between">
        <div
          onClick={() => window.history.back()}
          className="flex items-center gap-3 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
          <span className="text-white text-base font-medium">Uploaded PDF</span>
        </div>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload PDF
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          {pdfFiles.map((file) => (
            <div
              key={file.id}
              className="bg-[#676767] rounded-lg p-4 flex flex-col items-center"
            >
              {/* PDF Icon Circle */}
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-3">
                <div className="relative">
                  {/* PDF Document Icon */}
                  <div className="w-8 h-10 bg-white rounded-sm relative">
                    {/* PDF Label */}
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-sm leading-none">
                      PDF
                    </div>
                    {/* Document Lines */}
                    <div className="absolute top-3 left-1 right-1 space-y-1">
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded"></div>
                      <div className="h-0.5 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* File Name */}
              <span className="text-white text-sm text-center">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
