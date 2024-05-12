import React, { useState } from "react";
import { classAdder } from "../../util/classAdder";

const Splitter = ({ id = "drag-bar", dir, isDragging, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      id={id}
      className={classAdder(
        "z-30",
        "sample-drag-bar",
        dir === "horizontal" && "sample-drag-bar--horizontal",
        (isDragging || isFocused) && "sample-drag-bar--dragging"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default Splitter;
