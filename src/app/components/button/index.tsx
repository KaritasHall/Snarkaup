import { forwardRef, useState } from "react";

export type Colors = "default" | "white" | "blue" | "green";

type ButtonProps = {
  shape?: "soft" | "square" | "none";
  stretch?: boolean;
  color?: Colors;
  icon?: ({ fill }: { fill?: "black" | "white" }) => JSX.Element;
  label?: string;
  className?: string;
  onClick?: () => void;
};

// Tailwind classes for ButtonProps ty  pes (shape/color)
const buttonShapeClass = {
  soft: "rounded-full",
  square: "rounded-lg",
  none: "",
};

const buttonColorClass: Record<Colors, string> = {
  default: "bg-black07 text-white hover:bg-white hover:text-black07",
  white: "bg-white text-black07 hover:bg-black07 hover:text-white",
  blue: "bg-blue text-white hover:bg-white hover:text-black07",
  green: "bg-green text-white hover:bg-white hover:text-black07",
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
      ...rest
    },
    ref,
  ) => {
    const [hovering, setHovering] = useState(false);
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`flex items-center justify-center gap-4 px-56 py-12 text-sm outline outline-1 outline-inherit lg:gap-8 lg:text-base 
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
