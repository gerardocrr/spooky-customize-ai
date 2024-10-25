import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function UploadWidget() {
  const [isHoverButton, setIsHoverButton] = useState(false);
  const cloudinaryRef = useRef();
  const WidgetRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    WidgetRef.current = (cloudinaryRef.current as any).createUploadWidget(
      {
        cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "unsigned-preset",
        sources: ["local"],
        multiple: false,
        maxFiles: 1,
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          navigate(`/image/${result.info.public_id}`);
          toast.success("Image loaded successfully.");
        }
      }
    );
  }, []);
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-white mb-5 bg-red-600 p-2 rounded-lg bg-opacity-20">
        For a better experience use an image in which your face is clearly
        visible and the background is empty.
      </p>
      <button
        className={`bg-orange-600 p-2 rounded-lg text-white transition-all duration-300 ease-in-out ${
          isHoverButton ? "scale-110" : "scale-100"
        }`}
        style={{
          boxShadow: isHoverButton ? "0 0 50px rgba(255, 130, 0, 1)" : "none",
        }}
        onMouseEnter={() => setIsHoverButton(true)}
        onMouseLeave={() => setIsHoverButton(false)}
        onClick={() => (WidgetRef.current as any).open()}
      >
        🎃 Upload your image!
      </button>
    </div>
  );
}
