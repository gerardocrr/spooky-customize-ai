import { useState } from "react";
import { UploadWidget } from "./UploadWidget";

export function ImageTransform() {
  const [publicID, setPublicID] = useState("");
  return (
    <div>
      <UploadWidget setImage={setPublicID} />
      <p>{publicID}</p>
    </div>
  );
}
