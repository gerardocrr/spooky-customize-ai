import { useEffect, useRef } from "react";

interface UploadWidgetProps {
  setImage: (publicID: string) => void;
}

export function UploadWidget({ setImage }: UploadWidgetProps) {
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
          setImage(result.info.public_id);
        } else {
          console.log("Errorrr!!!!!!!");
        }
      }
    );
  }, []);
  return (
    <button onClick={() => (WidgetRef.current as any).open()}>Upload</button>
  );
}
