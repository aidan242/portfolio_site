import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const DraggableIcon = ({ icon, position, onPositionChange, onClick }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e) => {
      if (e.button !== 0) return;
      e.preventDefault();

      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
      setIsDragging(true);
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, window.innerWidth - 100)
      );
      const newY = Math.max(
        48,
        Math.min(e.clientY - dragOffset.y, window.innerHeight - 200)
      );

      onPositionChange(icon.name, { x: newX, y: newY });
    },
    [isDragging, dragOffset, icon.name, onPositionChange]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!isDragging) return;

      const deltaX = Math.abs(e.clientX - dragStart.x);
      const deltaY = Math.abs(e.clientY - dragStart.y);

      // If the mouse barely moved, consider it a click
      if (deltaX < 5 && deltaY < 5) {
        if (icon.path) {
          navigate(icon.path);
        } else if (onClick) {
          onClick(icon);
        }
      }

      setIsDragging(false);
    },
    [isDragging, dragStart, icon, navigate, onClick]
  );

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
      className="draggable-icon"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="icon-box">
        <span>?</span>
      </div>
      <span className="icon-label">{icon.name}</span>
    </div>
  );
};

export default DraggableIcon;
