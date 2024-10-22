import { useState } from "react";
// import { UploadWidget } from "./UploadWidget";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { AdvancedImage } from "@cloudinary/react";
// import { source } from "@cloudinary/url-gen/actions/overlay";
// import { image } from "@cloudinary/url-gen/qualifiers/source";
// import { scale } from "@cloudinary/url-gen/actions/resize";
// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { faces } from "@cloudinary/url-gen/qualifiers/focusOn";

interface Props {
  currentIndex: number;
}

export function ImageTransform({ currentIndex }: Props) {
  //const [publicID, setPublicID] = useState("");
  const [isHoverButton, setIsHoverButton] = useState(false);

  const emojis = ["🎈", "👻", "✌️", "🏒", "😊"];

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image("bwa9xdsy3pib90jom5yb");

  // const imageMask = cld
  //   .image(publicID)
  //   .overlay(
  //     source(
  //       image("hackathon/masks:fdmus1lybdzzm95mkx0e").transformation(
  //         new Transformation().resize(scale().width(1.5).regionRelative())
  //       )
  //     ).position(new Position().gravity(focusOn(faces())))
  //   );

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <UploadWidget setImage={setPublicID} /> */}

      <div className="flex flex-col justify-center items-center">
        <AdvancedImage
          className="rounded-lg mb-5"
          cldImg={myImage}
          width={"40%"}
        />
        <button
          className={`bg-orange-600 p-2 rounded-lg text-white transition-all duration-300 ease-in-out ${
            isHoverButton ? "scale-110" : "scale-100"
          }`}
          style={{
            boxShadow: isHoverButton ? "0 0 50px rgba(255, 130, 0, 1)" : "none",
          }}
          onMouseEnter={() => setIsHoverButton(true)}
          onMouseLeave={() => setIsHoverButton(false)}
        >
          {emojis[currentIndex]} Transform!
        </button>
      </div>

      {/* <AdvancedImage cldImg={imageMask} width={"40%"} /> */}
    </div>
  );
}
