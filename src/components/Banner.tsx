import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Banner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const CloudinaryLogo = () => (
    <svg
      viewBox="0 0 256 168"
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="#3448C5"
        d="M75.06 75.202a.7.7 0 0 1 .498.208l23.56 23.581a.7.7 0 0 1-.488 1.188h-6.022c-.39 0-.71.31-.721.7v53.015a12.724 12.724 0 0 0 3.71 8.949l3.52 3.52a.7.7 0 0 1-.487 1.187H70.85c-7.027 0-12.723-5.696-12.723-12.723v-53.948a.7.7 0 0 0-.7-.7h-5.938a.7.7 0 0 1-.509-1.188l23.581-23.58a.7.7 0 0 1 .499-.21Zm52.103 13.656a.7.7 0 0 1 .498.209l23.581 23.496a.7.7 0 0 1-.509 1.188h-6.022c-.39.011-.7.33-.7.72v39.423a12.724 12.724 0 0 0 3.69 8.949l3.541 3.52a.7.7 0 0 1-.509 1.187h-27.716c-7.027 0-12.724-5.696-12.724-12.723v-40.313c0-.39-.31-.71-.7-.721h-6a.7.7 0 0 1-.488-1.188l23.56-23.538a.7.7 0 0 1 .498-.209Zm52.114 13.51c.183 0 .36.075.487.207l23.581 23.56a.7.7 0 0 1-.487 1.209h-6.044a.7.7 0 0 0-.7.7v25.85a12.724 12.724 0 0 0 3.711 8.949l3.52 3.52a.7.7 0 0 1-.487 1.187h-27.801c-7.027 0-12.724-5.696-12.724-12.723v-26.784a.7.7 0 0 0-.7-.7h-5.937a.7.7 0 0 1-.488-1.208l23.58-23.56a.679.679 0 0 1 .489-.207ZM126.686-.002c37.04.27 69.71 24.323 80.964 59.614C235.16 63.202 255.8 86.54 256 114.28c0 22.895-14.319 41.921-37.438 49.842l-.86.289-1.06.339v-17.092c14.695-6.192 23.326-18.428 23.326-33.378-.075-21.097-16.782-38.323-37.78-39.126l-.709-.02h-6.361l-1.527-6.066c-7.494-30.93-35.08-52.79-66.905-53.015-26.187-.125-50.1 14.755-61.576 38.23l-2.36 4.861-4.454.467c-20.112 2.151-36.627 16.862-41.08 36.593-4.39 19.449 3.898 39.527 20.646 50.231l.734.46v18.025h-.106l-1.59-.721C11.744 152.636-2.99 126.08.51 98.616 4.012 71.153 24.938 49.142 52.19 44.258 66.912 16.851 95.575-.177 126.686-.002Z"
      />
    </svg>
  );
  const MidudevLogo = () => (
    <svg
      version="1.2"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 228 198"
      xmlns="http://www.w3.org/2000/svg"
      height="16"
    >
      <g>
        <path
          fill="#199afc"
          d="M73.2 126.4c-15 15-15 39.3 0 54.3L19 126.4C4 111.5 4 87.2 19 72.2L73.2 18c15-15 39.2-15 54.2 0s15 39.2 0 54.2z"
        />
        <path
          fill="#1d5682"
          d="m73.2 126.4 27.1-27.1 27.1 27.1c15 15 15 39.3 0 54.3-15 14.9-39.2 14.9-54.2 0-15-15-15-39.3 0-54.3z"
        />
        <g>
          <path
            fill="#199afc"
            d="M185.5 84.3c8.3-8.2 8.3-21.7 0-29.9l30 29.9c8.2 8.3 8.2 21.7 0 30l-30 30c-8.3 8.3-21.7 8.3-30 0s-8.3-21.7 0-30z"
          />
          <path
            fill="#1d5682"
            d="m185.5 84.3-15 15-15-15c-8.3-8.2-8.3-21.7 0-29.9 8.3-8.3 21.7-8.3 30 0 8.3 8.2 8.3 21.7 0 29.9z"
          />
        </g>
      </g>
    </svg>
  );

  return (
    <motion.div
      className={`flex items-center justify-between text-white bg-red-950 bgre bg py-1 z-10 ${
        isVisible ? "" : "hidden"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div></div>
      <a
        target="_blank"
        href="https://cloudinary.com/blog/cloudinarys-hackathon-results-are-in#5th_place_spooky_customize_ai"
        className="inline-flex items-center hover:underline"
      >
        🏆 I won 5th place at
        <span className="mx-2">
          <CloudinaryLogo />
        </span>
        Cloudinary and
        <span className="mx-2">
          <MidudevLogo />
        </span>
        Midudev hackathon!
      </a>
      <button
        className="mx-5"
        onClick={() => {
          setIsVisible(false);
        }}
      >
        x
      </button>
    </motion.div>
  );
}
