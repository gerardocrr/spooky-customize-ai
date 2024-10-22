import { useState } from "react";
import { Layout } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImageTransform } from "./components/ImageTransform";
import { UploadWidget } from "./components/UploadWidget";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <BrowserRouter>
        <Layout currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}>
          <Routes>
            <Route index element={<UploadWidget />} />
            <Route
              path="/image/:id"
              element={<ImageTransform currentIndex={currentIndex} />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
