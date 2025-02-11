import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DraggableWindow from "./DraggableWindow";

const KeebViewer = ({ onClose, zIndex, onFocus }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch("/api/keeb-images");
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };
    loadImages();
  }, []);

  const handlePrevious = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <DraggableWindow
      title="Keyboard Viewer"
      position={windowPosition}
      onPositionChange={setWindowPosition}
      onClose={onClose}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="keeb-viewer">
        {images.length > 0 ? (
          <>
            <button
              className="nav-button left"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="image-container">
              <img
                src={`/img/${images[currentIndex]}`}
                alt={`Keyboard ${currentIndex + 1}`}
                className={imageLoaded ? "loaded" : ""}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="image-counter">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            <button
              className="nav-button right"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        ) : (
          <div className="loading">Loading images...</div>
        )}
      </div>
    </DraggableWindow>
  );
};

export default KeebViewer;
