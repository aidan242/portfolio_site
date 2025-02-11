import React, { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";

const DraggableWindow = ({
  title,
  onClose,
  position,
  onPositionChange,
  children,
  zIndex,
  onFocus,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      onFocus();

      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
    },
    [position, onFocus]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, window.innerWidth - 300)
      );
      const newY = Math.max(
        48,
        Math.min(e.clientY - dragOffset.y, window.innerHeight - 200)
      );

      onPositionChange({ x: newX, y: newY });
    },
    [isDragging, dragOffset, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="draggable-window"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="window-title-bar"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <span>{title}</span>
        <button onClick={onClose} className="close-button">
          <X size={16} />
        </button>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default DraggableWindow;
