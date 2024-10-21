// import { UploadWidget } from "./components/UploadWidget";
// import { AdvancedImage } from "@cloudinary/react";
// import {
//   Cloudinary,
//   CloudinaryImage,
//   Transformation,
// } from "@cloudinary/url-gen/index";
// import {
//   generativeReplace,
//   backgroundRemoval,
// } from "@cloudinary/url-gen/actions/effect";
// import { useState } from "react";
// import { source } from "@cloudinary/url-gen/actions/overlay";
// import { image } from "@cloudinary/url-gen/qualifiers/source";
// import { scale } from "@cloudinary/url-gen/actions/resize";
// import { Position } from "@cloudinary/url-gen/qualifiers";
// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// import { advancedFaces } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Layout } from "./components/Layout";
import { ImageTransform } from "./components/ImageTransform";
import "./App.css";

function App() {
  // const [publicID, setPublicID] = useState("");
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  //   },
  // });
  // const myImage = cld.image(publicID);

  // const imageMask = cld
  //   .image(publicID)
  //   .effect(
  //     generativeReplace().from("face").to("the walking dead zombie mask")
  //   );

  // const imageMask = cld
  //   .image(publicID)
  //   .overlay(
  //     source(
  //       image("hackathon/masks/yigdnszx6gwet1vevzzo").transformation(
  //         new Transformation().resize(scale().width(1.9).regionRelative())
  //       )
  //     ).position(new Position().gravity(focusOn(advancedFaces())))
  //   );

  return (
    <>
      {/* <div>
        <h1>Hola</h1>
        <UploadWidget setImage={setPublicID} />
        <AdvancedImage cldImg={myImage} width={"25%"} />
        <button className="bg-blue-300">Mascara</button>
        <AdvancedImage cldImg={imageMask} width={"50%"} />
      </div> */}
      <Layout>
        <ImageTransform />
      </Layout>
    </>
  );
}

export default App;
