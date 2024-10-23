import { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { useNavigate } from "react-router-dom";

interface ImageResource {
  public_id: string;
}

interface ImageData {
  resources: ImageResource[];
}

export function Gallery() {
  const [images, setImages] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/list/users-images.json`
      );
      const data = await response.json();
      setImages(data);
      setIsLoading(false);
    };
    getData();
  }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="loader text-8xl flex justify-center items-center"></div>
      ) : (
        <div className="grid grid-cols-4">
          {images?.resources?.map((img, idx) => {
            const myImage = cld.image(img.public_id);
            const isHovered = hoverIndex === idx;
            return (
              <div className="p-5" key={idx}>
                <AdvancedImage
                  className={`rounded-lg ransition-all duration-300 ease-in-out hover:cursor-pointer ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                  style={{
                    boxShadow: isHovered
                      ? "0 0 10px rgba(255, 0, 0, 1)"
                      : "none",
                  }}
                  cldImg={myImage}
                  onClick={() => {
                    navigate(`/image/${img.public_id}`);
                  }}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
