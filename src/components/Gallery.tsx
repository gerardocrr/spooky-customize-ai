import { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";

export function Gallery() {
  interface ImageResource {
    public_id: string;
  }

  interface ImageData {
    resources: ImageResource[];
  }

  const [images, setImages] = useState<ImageData | null>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/list/users-images.json`
      );
      const data = await response.json();
      setImages(data);
    };
    getData();
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });
  return (
    <div className="grid grid-cols-4">
      {images?.resources?.map((photo, idx) => {
        const myImage = cld.image(photo.public_id);
        return (
          <div className="p-5" key={idx}>
            <AdvancedImage className="rounded-lg" cldImg={myImage} />
          </div>
        );
      })}
    </div>
  );
}
