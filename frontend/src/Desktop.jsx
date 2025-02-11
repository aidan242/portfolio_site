import React, { useState, useEffect } from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import DraggableWindow from "@/components/DraggableWindow";
import KeebViewer from "@/components/KeebViewer";
import AboutMe from "@/components/AboutMe";
import IconComponent from "@/components/IconComponent";

const Desktop = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openWindows, setOpenWindows] = useState({
    links: { isOpen: false, zIndex: 0 },
    keebViewer: { isOpen: false, zIndex: 0 },
    aboutMe: { isOpen: false, zIndex: 0 },
  });
  const [linksWindowPosition, setLinksWindowPosition] = useState({
    x: 100,
    y: 100,
  });
  const [nextZIndex, setNextZIndex] = useState(1);

  const icons = [
    {
      name: "About Me",
      action: () => handleWindowOpen("aboutMe"),
      iconId: "about-me",
    },
    {
      name: "KeebViewer",
      action: () => handleWindowOpen("keebViewer"),
      iconId: "keyboard",
    },
    {
      name: "Projects",
      path: "/projects",
      iconId: "projects",
    },
    {
      name: "Links",
      action: () => handleWindowOpen("links"),
      iconId: "links",
    },
  ];

  const socialLinks = [
    { name: "X", url: "https://twitter.com", icon: <Twitter size={20} /> },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: <Linkedin size={20} />,
    },
    { name: "GitHub", url: "https://github.com", icon: <Github size={20} /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(
        now.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      );
    }, 1000);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleWindowOpen = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { isOpen: true, zIndex: nextZIndex },
    }));
    setNextZIndex((prev) => prev + 1);
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false },
    }));
  };

  const handleWindowFocus = (windowId) => {
    if (openWindows[windowId].zIndex !== nextZIndex - 1) {
      setOpenWindows((prev) => ({
        ...prev,
        [windowId]: { ...prev[windowId], zIndex: nextZIndex },
      }));
      setNextZIndex((prev) => prev + 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleIconClick = (icon) => {
    if (icon.action) {
      icon.action();
    } else if (icon.path) {
      // Handle navigation
    }
  };

  return (
    <div className="retro-os">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="right">
          <span className="separator">
            <button className="fullscreen-button" onClick={toggleFullscreen}>
              Fullscreen
            </button>
          </span>
          <span className="separator">
            <span>{time}</span>
          </span>
          <span className="separator">
            <span>{date}</span>
          </span>
        </div>
      </div>

      {/* Desktop Area */}
      <div className="desktop">
        {icons.map((icon) => (
          <div
            key={icon.name}
            className="draggable-icon"
            onClick={() => handleIconClick(icon)}
          >
            <div className="icon-box">
              <IconComponent iconId={icon.iconId} />
            </div>
            <span className="icon-label">{icon.name}</span>
          </div>
        ))}

        {openWindows.keebViewer.isOpen && (
          <KeebViewer
            onClose={() => handleWindowClose("keebViewer")}
            zIndex={openWindows.keebViewer.zIndex}
            onFocus={() => handleWindowFocus("keebViewer")}
          />
        )}

        {openWindows.aboutMe.isOpen && (
          <AboutMe
            onClose={() => handleWindowClose("aboutMe")}
            zIndex={openWindows.aboutMe.zIndex}
            onFocus={() => handleWindowFocus("aboutMe")}
          />
        )}

        {openWindows.links.isOpen && (
          <DraggableWindow
            title="Social Links"
            position={linksWindowPosition}
            onPositionChange={setLinksWindowPosition}
            onClose={() => handleWindowClose("links")}
            zIndex={openWindows.links.zIndex}
            onFocus={() => handleWindowFocus("links")}
          >
            <div className="social-links-container">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </DraggableWindow>
        )}
      </div>
    </div>
  );
};

export default Desktop;
