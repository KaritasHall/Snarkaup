import { useState } from "react";
import { CloseIcon } from "../icons";

type CloseButtonProps = {
  onClick: () => void;
  label?: string;
};

export const CloseButton = ({ onClick, label }: CloseButtonProps) => {
  const [hovering, setHovering] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="flex h-fit w-fit items-center justify-center"
    >
      <CloseIcon hover={hovering} />
      {label && (
        <h4
          className={`text-sm font-semibold tracking-wide text-black04 ${
            hovering ? "text-black07" : ""
          }`}
        >
          {label}
        </h4>
      )}
    </button>
  );
};
