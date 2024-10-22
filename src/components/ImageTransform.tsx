import { useState } from "react";
import { useParams } from "react-router-dom";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
import { Cloudinary, Transformation } from "@cloudinary/url-gen/index";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { faces } from "@cloudinary/url-gen/qualifiers/focusOn";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/index";

interface Props {
  currentIndex: number;
}

export function ImageTransform({ currentIndex }: Props) {
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [imageTransformed, setImageTransformed] = useState<
    CloudinaryImage | undefined
  >(undefined);
  const params = useParams();
  const emojis = ["🎈", "👻", "🩸", "🔪", "🏒"];
  const masks = [
    "ecwqicsyuryrh88meice",
    "nxgqkbxux2bn4lbvoiuf",
    "fbdy1dbe30ms1ek2n3hw",
    "fdmus1lybdzzm95mkx0e",
    "s4wlthv4ay69fbuljlmd",
  ];
  const prompts = [
    "dark hospital empty at night without lights with blood on the floor",
    "dark bathroom empty at night without lights with blood on the floor",
    "white wall with blood dripping down",
    "hospital room and walls with blood dripping down",
    "dark forest at night with no lights",
  ];

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(params.id);

  const handleTransform = () => {
    const newImage = cld
      .image(params.id)
      .effect(generativeBackgroundReplace().prompt(prompts[currentIndex]))
      .overlay(
        source(
          image(`hackathon/masks:${masks[currentIndex]}`).transformation(
            new Transformation().resize(scale().width(1.9).regionRelative())
          )
        ).position(new Position().gravity(focusOn(faces())))
      );
    setImageTransformed(newImage);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        {!imageTransformed && (
          <AdvancedImage
            className="rounded-lg mb-5"
            cldImg={myImage}
            width={"40%"}
          />
        )}

        {imageTransformed && (
          <AdvancedImage
            className="rounded-lg mb-5"
            cldImg={imageTransformed}
            width={"40%"}
          />
        )}
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
          {emojis[currentIndex]} Transform! {masks[currentIndex]}
        </button>
      </div>
    </div>
  );
}
