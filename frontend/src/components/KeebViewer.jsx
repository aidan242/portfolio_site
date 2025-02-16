import React, { useState, useEffect } from "react";
import DraggableWindow from "./DraggableWindow";

const KeebViewer = ({ onClose, zIndex, onFocus }) => {
  const [keyboards, setKeyboards] = useState([]);
  const [selectedKeyboard, setSelectedKeyboard] = useState(null);
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKeyboards = async () => {
      try {
        const response = await fetch("/keyboards.json");
        const data = await response.json();
        setKeyboards(data.keyboards);
        setSelectedKeyboard(data.keyboards[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading keyboard data:", error);
        setLoading(false);
      }
    };
    loadKeyboards();
  }, []);

  const handleKeyboardSelect = (keyboard) => {
    setImageLoaded(false);
    setSelectedKeyboard(keyboard);
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
        {loading ? (
          <div className="loading">Loading keyboards...</div>
        ) : (
          <>
            <div className="keyboard-list">
              {keyboards.map((keyboard) => (
                <button
                  key={keyboard.id}
                  className={`keyboard-list-item ${
                    selectedKeyboard?.id === keyboard.id ? "active" : ""
                  }`}
                  onClick={() => handleKeyboardSelect(keyboard)}
                >
                  {keyboard.name}
                </button>
              ))}
            </div>

            <div className="keyboard-details">
              {selectedKeyboard ? (
                <>
                  <div className="image-container">
                    <img
                      src={`/img/${selectedKeyboard.image}`}
                      alt={selectedKeyboard.name}
                      className={imageLoaded ? "loaded" : ""}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>

                  <div className="keyboard-info">
                    <p className="keyboard-description">
                      {selectedKeyboard.description}
                    </p>
                    <div className="specs-grid">
                      <div className="spec-item">
                        <span className="spec-label">Type</span>
                        <span className="spec-value">
                          {selectedKeyboard.specs.type}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Switches</span>
                        <span className="spec-value">
                          {selectedKeyboard.specs.switches}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Keycaps</span>
                        <span className="spec-value">
                          {selectedKeyboard.specs.keycaps}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Plate</span>
                        <span className="spec-value">
                          {selectedKeyboard.specs.plate}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="loading">Select a keyboard to view details</div>
              )}
            </div>
          </>
        )}
      </div>
    </DraggableWindow>
  );
};

export default KeebViewer;
