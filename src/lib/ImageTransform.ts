import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
import { Cloudinary, Transformation } from "@cloudinary/url-gen/index";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers/position";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { faces } from "@cloudinary/url-gen/qualifiers/focusOn";
import { extract } from "@cloudinary/url-gen/actions/effect";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

const prompts = [
  "dark hospital empty at night without lights with blood on the floor",
  "dark bathroom empty at night without lights with blood on the floor",
  "white wall with blood dripping down",
  "hospital room and walls with blood dripping down",
  "dark forest at night with no lights",
];
const masks = [
  "ecwqicsyuryrh88meice",
  "nxgqkbxux2bn4lbvoiuf",
  "fbdy1dbe30ms1ek2n3hw",
  "fdmus1lybdzzm95mkx0e",
  "s4wlthv4ay69fbuljlmd",
];
const itBackgrounds = [
  "vulatg3z5a53xycmkhxv",
  "bltxtaedxsjebidugrza",
  "tjguqc2sbxjlk2epetgl",
  "yltahvidkvq7iuavbvff",
  "jydeak0pslokqmmhswxd",
];
const screamBackgrounds = [
  "atlbfntsxh5pxhw7f7x1",
  "drif5nhrs08we56orpzn",
  "mszjsvd4re9cgmn6hct0",
  "iei5p7kshh3zzzu0paxj",
  "jsfjyqpooajhimyclrov",
];
const terrifierBackgrounds = [
  "axk1dgwgbgmseq6oqkom",
  "innqqsqn9tpbfe6ht96z",
  "mujxd4jwghm7yw0bfjgc",
  "xqs3ul6bpwbm09qp2zny",
  "ozfupzgwwp8xgc3hwuq8",
];
const sawBackgrounds = [
  "azo4gg4u9i6x5pnew5kw",
  "pekb2o8uqrucntdjgelt",
  "e2ejjgnebfonakignyf8",
  "mdqjgpgpyawqptck6ila",
  "wgvdmqev78pesslacbpq",
];
const friday13thBackgrounds = [
  "ihfplcjnyjihdpugkeve",
  "htk1s8amrklxsmtstpcd",
  "sritjicwju3fa31cpqby",
  "b6fsyyncm28ivpn28tya",
  "fglp9arzpbforkiynygm",
];

const randomBackground = (index: number) => {
  if (index === 0) {
    return "it:" + itBackgrounds[Math.floor(Math.random() * 5)];
  }
  if (index === 1) {
    return "scream:" + screamBackgrounds[Math.floor(Math.random() * 5)];
  }
  if (index === 2) {
    return "terrifier:" + terrifierBackgrounds[Math.floor(Math.random() * 5)];
  }
  if (index === 3) {
    return "saw:" + sawBackgrounds[Math.floor(Math.random() * 5)];
  }
  if (index === 4) {
    return "friday13th:" + friday13thBackgrounds[Math.floor(Math.random() * 5)];
  }
};

export const transformByAI = (imageID: string, index: number) => {
  console.log("ai");
  return cld
    .image(imageID)
    .effect(generativeBackgroundReplace().prompt(prompts[index]))
    .overlay(
      source(
        image(`hackathon/masks:${masks[index]}`).transformation(
          new Transformation().resize(scale().width(1.9).regionRelative())
        )
      ).position(new Position().gravity(focusOn(faces())))
    );
};

export const transformByRandomImages = (imageID: string, index: number) => {
  console.log("images");
  return cld
    .image(imageID)
    .resize(scale().width(800))
    .effect(extract("person").detectMultiple())
    .overlay(
      source(
        image(`hackathon/masks:${masks[index]}`).transformation(
          new Transformation().resize(scale().width(1.9).regionRelative())
        )
      ).position(new Position().gravity(focusOn(faces())))
    )
    .underlay(
      source(
        image(
          `hackathon/backgrounds:${randomBackground(index)}`
        ).transformation(new Transformation().resize(scale().width(950)))
      )
    );
};
