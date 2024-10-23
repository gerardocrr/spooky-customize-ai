import { useState } from "react";

export function NotFound() {
  const [isHover, setIsHover] = useState(false);
  return (
    <div>
      <h1
        className={`text-9xl font-extrabold text-red-600 transition-all duration-300 ease-in-out ghastly-font ${
          isHover ? "scale-110" : "scale-100"
        }`}
        style={{
          textShadow: isHover ? "0 0 50px rgba(255, 0, 0, 1)" : "none",
          cursor: "default",
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        N o t F o u n d
      </h1>
    </div>
  );
}
