import { useState } from "react";

export function Background() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  const backgrounds = [
    "friday.webp",
    "it.webp",
    "saw.webp",
    "scream.webp",
    "smile.webp",
  ];

  const handleRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
  };

  const handleLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? backgrounds.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(/backgrounds/${backgrounds[currentIndex]})`,
      }}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
          hoverLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black to-transparent transition-opacity duration-300 ${
          hoverRight ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          className={`text-white text-9xl transition-transform duration-300 ease-in-out ${
            hoverLeft ? "scale-150" : "scale-100"
          }`}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
          onClick={handleLeft}
        >
          ‹
        </button>
        <button
          className={`text-white text-9xl transition-transform duration-300 ease-in-out ${
            hoverRight ? "scale-150" : "scale-100"
          }`}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
          onClick={handleRight}
        >
          ›
        </button>
      </div>
    </div>
  );
}
