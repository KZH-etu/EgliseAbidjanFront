import { FC } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FileWarning } from "lucide-react";

type MediaViewerProps = {
  type: "audio" | "video" | "text";
  url: string;
};

export const MediaViewer: FC<MediaViewerProps> = ({ type, url }) => {

  if (!url) {
    return (
      <div className="flex items-center justify-center h-64 bg-neutral-50 rounded-lg border border-neutral-100 pb-16">
        <FileWarning className="text-neutral-400 mr-2" />
        <span className="text-neutral-500">No media available</span>
      </div>
    );
  }

  if (type === "audio") {
    return (
      <div className="bg-neutral-50 rounded-lg p-4 shadow border border-neutral-100 flex flex-col items-center pb-16">
        <audio controls src={url} className="w-full" />
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="bg-neutral-50 rounded-lg p-4 shadow border border-neutral-100 flex flex-col items-center pb-14 mb-10">
        <video controls src={url} className="w-full max-h-[480px] rounded" />
      </div>
    );
  }

  return null;
};