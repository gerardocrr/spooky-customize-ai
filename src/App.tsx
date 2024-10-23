import { useState } from "react";
import { Layout } from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ImageTransform } from "./components/ImageTransform";
import { UploadWidget } from "./components/UploadWidget";
import { Gallery } from "./components/Gallery";
import { NotFound } from "./components/NotFound";
import { Toaster } from "sonner";
import "./App.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Layout currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}>
          <Routes>
            <Route index element={<UploadWidget />} />
            <Route
              path="/image/:id"
              element={<ImageTransform currentIndex={currentIndex} />}
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
