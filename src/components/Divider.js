import React from "react";

export default function Divider({ isVertical }) {
  const verticalClassName = "h-full bg-gray-400 w-0.5 flex flex-col";
  const horizontalClassName = "w-full bg-gray-400 h-0.5 flex flex-row";

  return (
    <div
      className={`${isVertical ? verticalClassName : horizontalClassName}`}
    />
  );
}
