import { useEffect } from "react";

export function Gallery() {
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://res.cloudinary.com/${
          import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME
        }/image/list/users-images.json`
      );
      const data = await response.json();
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-white">Gallery</h1>
    </div>
  );
}
