import { Layout } from "./components/Layout";
import { ImageTransform } from "./components/ImageTransform";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <Layout currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}>
        <ImageTransform />
      </Layout>
    </>
  );
}

export default App;
