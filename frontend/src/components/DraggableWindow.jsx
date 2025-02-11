import React, { useState, useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";

const DraggableWindow = ({
  title,
  onClose,
  position,
  onPositionChange,
  children,
  zIndex,
  onFocus,
  tabs,
  activeTab,
  onTabChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const adjustWindowPosition = useCallback(() => {
    if (!windowRef.current) return;

    const windowHeight = windowRef.current.offsetHeight;
    const windowWidth = windowRef.current.offsetWidth;
    const minVisibleHeight = windowHeight;

    // Calculate new position if window is out of bounds
    const newY = Math.max(
      0,
      Math.min(position.y, window.innerHeight - minVisibleHeight)
    );

    const newX = Math.max(
      0,
      Math.min(position.x, window.innerWidth - windowWidth)
    );

    // Only update if position needs to change
    if (newX !== position.x || newY !== position.y) {
      onPositionChange({ x: newX, y: newY });
    }
  }, [position, onPositionChange]);

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
      if (!isDragging || !windowRef.current) return;

      const windowHeight = windowRef.current.offsetHeight;
      const windowWidth = windowRef.current.offsetWidth;
      const minVisibleHeight = windowHeight;

      const newY = Math.max(
        0,
        Math.min(
          e.clientY - dragOffset.y,
          window.innerHeight - minVisibleHeight
        )
      );

      const newX = Math.max(
        0,
        Math.min(e.clientX - dragOffset.x, window.innerWidth - windowWidth)
      );

      onPositionChange({ x: newX, y: newY });
    },
    [isDragging, dragOffset, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTabChange = useCallback(
    (tabId) => {
      onTabChange(tabId);
      // Use requestAnimationFrame to wait for DOM update
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          adjustWindowPosition();
        });
      });
    },
    [onTabChange, adjustWindowPosition]
  );

  // Adjust position on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      adjustWindowPosition();
    };

    window.addEventListener("resize", handleResize);
    adjustWindowPosition();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [adjustWindowPosition]);

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
      ref={windowRef}
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
        <div className="title-and-tabs">
          <span className="window-title">{title}</span>
          {tabs && (
            <div className="window-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`window-tab ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent drag start when clicking tabs
                    handleTabChange(tab.id);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClose} className="close-button">
          <X size={16} />
        </button>
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
};

export default DraggableWindow;
