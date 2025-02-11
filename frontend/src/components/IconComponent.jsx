import React from "react";

const IconComponent = ({ iconId }) => (
  <svg width="32" height="32">
    <use href={`/pixel-icons.svg#${iconId}`} />
  </svg>
);

export default IconComponent;
