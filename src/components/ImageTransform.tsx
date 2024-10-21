import { useState } from "react";
import { UploadWidget } from "./UploadWidget";

export function ImageTransform() {
  const [publicID, setPublicID] = useState("");
  return (
    <div>
      <h1>Image transform</h1>
      <UploadWidget setImage={setPublicID} />
      <p>{publicID}</p>
    </div>
  );
}
