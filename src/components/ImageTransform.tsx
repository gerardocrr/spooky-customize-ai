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
import { extract } from "@cloudinary/url-gen/actions/effect";

interface Props {
  currentIndex: number;
}

export function ImageTransform({ currentIndex }: Props) {
  const [isHoverButton, setIsHoverButton] = useState(false);
  const [imageTransformed, setImageTransformed] = useState<
    CloudinaryImage | undefined
  >(undefined);
  const [optionToTransform, setOptionToTransform] = useState("ai");
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
  const it = [
    "vulatg3z5a53xycmkhxv",
    "bltxtaedxsjebidugrza",
    "tjguqc2sbxjlk2epetgl",
    "yltahvidkvq7iuavbvff",
    "jydeak0pslokqmmhswxd",
  ];
  const scream = [
    "atlbfntsxh5pxhw7f7x1",
    "drif5nhrs08we56orpzn",
    "mszjsvd4re9cgmn6hct0",
    "iei5p7kshh3zzzu0paxj",
    "jsfjyqpooajhimyclrov",
  ];
  const terrifier = [
    "axk1dgwgbgmseq6oqkom",
    "innqqsqn9tpbfe6ht96z",
    "mujxd4jwghm7yw0bfjgc",
    "xqs3ul6bpwbm09qp2zny",
    "ozfupzgwwp8xgc3hwuq8",
  ];
  const saw = [
    "azo4gg4u9i6x5pnew5kw",
    "pekb2o8uqrucntdjgelt",
    "e2ejjgnebfonakignyf8",
    "mdqjgpgpyawqptck6ila",
    "wgvdmqev78pesslacbpq",
  ];
  const friday13th = [
    "ihfplcjnyjihdpugkeve",
    "htk1s8amrklxsmtstpcd",
    "sritjicwju3fa31cpqby",
    "b6fsyyncm28ivpn28tya",
    "fglp9arzpbforkiynygm",
  ];

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const myImage = cld.image(params.id);

  const handleTransform = () => {
    if (optionToTransform === "ai") {
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
      console.log("ai");
    } else {
      console.log("images");
      const newImage = cld
        .image(params.id)
        .resize(scale().width(800))
        .effect(extract("person").detectMultiple())
        .overlay(
          source(
            image(`hackathon/masks:${masks[currentIndex]}`).transformation(
              new Transformation().resize(scale().width(1.9).regionRelative())
            )
          ).position(new Position().gravity(focusOn(faces())))
        )
        .underlay(
          source(
            image(
              `hackathon/backgrounds:${background(currentIndex)}`
            ).transformation(new Transformation().resize(scale().width(950)))
          )
        );
      setImageTransformed(newImage);
    }
  };

  const background = (index: number) => {
    if (index === 0) {
      return "it:" + it[Math.floor(Math.random() * 5)];
    }
    if (index === 1) {
      return "scream:" + scream[Math.floor(Math.random() * 5)];
    }
    if (index === 2) {
      return "terrifier:" + terrifier[Math.floor(Math.random() * 5)];
    }
    if (index === 3) {
      return "saw:" + saw[Math.floor(Math.random() * 5)];
    }
    if (index === 4) {
      return "friday13th:" + friday13th[Math.floor(Math.random() * 5)];
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionToTransform(e.target.value);
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
        <div className="flex flex-col items-start mb-4">
          <div>
            <label>
              <input
                className="mx-2"
                type="radio"
                value="ai"
                checked={optionToTransform === "ai"}
                onChange={handleOptionChange}
              />
              Generate the background with Cloudinary AI
            </label>
          </div>
          <div>
            <label>
              <input
                className="mx-2"
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
          {emojis[currentIndex]} Transform! {optionToTransform}
        </button>
      </div>
    </div>
  );
}
