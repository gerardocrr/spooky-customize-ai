import { useState } from "react";
import { useParams } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { transformByAI } from "../lib/ImageTransform";
import { transformByRandomImages } from "../lib/ImageTransform";

interface Props {
  currentIndex: number;
}

export function ImageTransform({ currentIndex }: Props) {
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageTransformed, setImageTransformed] = useState<
    CloudinaryImage | undefined
  >(undefined);
  const [optionToTransform, setOptionToTransform] = useState("ai");
  const emojis = ["🎈", "👻", "🩸", "🔪", "🏒"];
  const params = useParams();

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(params.id);

  const handleTransform = () => {
    if (!params.id) {
      console.error("Image ID is undefined");
      return;
    }
    setIsLoading(true);
    if (optionToTransform === "ai") {
      setImageTransformed(transformByAI(params.id, currentIndex));
    } else {
      setImageTransformed(transformByRandomImages(params.id, currentIndex));
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionToTransform(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {isLoading && <div className="loader text-8xl"></div>}

      <div
        className={`flex flex-col justify-center items-center ${
          isLoading ? "hidden" : ""
        }`}
      >
        {!imageTransformed && (
          <AdvancedImage
            className="rounded-lg mb-5"
            cldImg={myImage}
            width={"40%"}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        )}

        {imageTransformed && (
          <AdvancedImage
            className="rounded-lg mb-5"
            cldImg={imageTransformed}
            width={"40%"}
            onLoad={() => {
              setIsLoading(false);
            }}
          />
        )}
        <div className="flex flex-col items-start mb-4">
          <div>
            <label
              className="text-white font-bold"
              style={{
                textShadow: "0 0 50px rgba(255, 0, 0, 1)",
              }}
            >
              <input
                className="mx-2 accent-red-600"
                type="radio"
                value="ai"
                checked={optionToTransform === "ai"}
                onChange={handleOptionChange}
              />
              Generate background with Cloudinary AI
            </label>
          </div>
          <div>
            <label
              className="text-white font-bold"
              style={{
                textShadow: "0 0 50px rgba(255, 0, 0, 1)",
              }}
            >
              <input
                className="mx-2 accent-red-600"
                type="radio"
                value="images"
                checked={optionToTransform === "images"}
                onChange={handleOptionChange}
              />
              Generate background with random images
            </label>
          </div>
        </div>
        <button
          className={`bg-orange-600 p-2 rounded-lg text-white transition-all duration-300 ease-in-out ${
            isHoverButton ? "scale-110" : "scale-100"
          }`}
          style={{
            boxShadow: isHoverButton ? "0 0 50px rgba(255, 130, 0, 1)" : "none",
          }}
          onMouseEnter={() => setIsHoverButton(true)}
          onMouseLeave={() => setIsHoverButton(false)}
          onClick={handleTransform}
        >
          {emojis[currentIndex]} Transform!
        </button>
      </div>
    </div>
  );
}
