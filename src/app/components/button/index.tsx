import { forwardRef, useState } from "react";

export type Colors = "default" | "white" | "blue" | "green" | "grey";

type ButtonProps = {
  shape?: "soft" | "square" | "none" | "circular";
  stretch?: boolean;
  color?: Colors;
  icon?: ({ fill }: { fill?: "black" | "white" }) => JSX.Element;
  label?: string;
  className?: string;
  onClick: () => void;
  ariaLabel: string;
};

// Tailwind classes for ButtonProps types (shape/color)
const buttonShapeClass = {
  soft: "rounded-full",
  square: "rounded-lg",
  none: "",
  circular: "rounded-full px-6 py-6 lg:px-8 lg:py-8",
};

const buttonColorClass: Record<Colors, string> = {
  default: "bg-black07 text-white hover:bg-white hover:text-black07",
  white: "bg-white text-black07 hover:bg-black07 hover:text-white",
  blue: "bg-blue text-white hover:bg-white hover:text-black07",
  green: "bg-green text-white hover:bg-white hover:text-black07",
  grey: "bg-grey03 text-black07 hover:bg-black07 hover:text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      shape = "square",
      stretch = false,
      color = "default",
      icon,
      label,
      className = "",
      onClick,
      ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const [hovering, setHovering] = useState(false);
    return (
      <button
        ref={ref}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`flex items-center justify-center gap-4 py-12 text-sm outline outline-1 
        outline-inherit lg:gap-8 lg:px-56 lg:text-base 
        ${buttonShapeClass[shape]} 
        ${buttonColorClass[color]}
        ${stretch ? "w-full py-8" : ""}
        ${className} 
        `}
        {...rest}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {icon && hovering === false && icon({ fill: "black" })}
        {icon && hovering === true && icon({ fill: "white" })}
        {label}
      </button>
    );
  },
);

export default Button;
