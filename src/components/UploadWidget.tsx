import { useEffect, useRef, useState } from "react";

// interface UploadWidgetProps {
//   setImage: (publicID: string) => void;
// }

export function UploadWidget() {
  const [isHoverButton, setIsHoverButton] = useState(false);
  const cloudinaryRef = useRef();
  const WidgetRef = useRef();
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
          console.log(result);
          console.log("Exitooooo!!!!!!");
          //setImage(result.info.public_id);
        } else {
          console.log("Errorrr!!!!!!!");
        }
      }
    );
  }, []);
  return (
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
  );
}
