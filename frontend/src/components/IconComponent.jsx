import React from "react";

const IconComponent = ({ iconId }) => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 32 32"
    style={{
      width: "72px",
      height: "72px",
      minWidth: "72px",
      minHeight: "72px",
    }}
  >
    <use href={`/pixel-icons.svg#${iconId}`} />
  </svg>
);

export default IconComponent;
