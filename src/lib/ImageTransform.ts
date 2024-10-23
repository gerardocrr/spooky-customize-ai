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
  "neiqm9fxrcolgjy3opap",
  "ciipkspjyiuvhbtkcnzg",
  "n2jfdklvk00n5tsusxrl",
  "bsucfmfi7khgbrkikqch",
  "yngbyk0lpjpvs46dxsua",
];
const screamBackgrounds = [
  "ialnmqnyqzru2pjxy3qr",
  "lfkt6huzuykw3ahiy9wd",
  "kc5o15bcrzvblb6db4ut",
  "y2n8rqbtmy4qoaj1gdds",
  "itrspkhdkirphs3nazo4",
];
const terrifierBackgrounds = [
  "anwchofgzyhe3vwhtglz",
  "g63dq0nwweyo3ycrflbz",
  "srm6gr9kjviocgxy0sd8",
  "cmx16pvgwxjkhjgp81lw",
  "l4gbyc7jzxdfdqrdnutf",
];
const sawBackgrounds = [
  "ixo7ac10srlstmjwbdef",
  "iwi7j3zk3evjan61m1fa",
  "nupp4bquxx4hmtmmnokp",
  "ykxzskj2to3xfx9rmex0",
  "ymbxjjnoa3mh87eptdch",
];
const friday13thBackgrounds = [
  "dhebteb5s8tc2jsdmwot",
  "ygqhyueddtz8mytbin9x",
  "a3gmi3wsmq7hoom44j46",
  "kfbte3bzut4vedqfy2gw",
  "yekto3yhflzwtpiqnwtz",
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

export const downloadImage = async (url: string, name: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = name + ".jpg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
};
