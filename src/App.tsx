import { Layout } from "./components/Layout";
import { ImageTransform } from "./components/ImageTransform";
import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UploadWidget } from "./components/UploadWidget";

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
