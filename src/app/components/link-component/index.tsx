import Link from "next/link";
import { ArrowRightIcon } from "@icons";

type LinkComponentProps = {
  label: string;
  href: string;
  showArrow?: boolean;
  color?: "black" | "white";
};

const LinkComponent = ({
  label,
  href,
  showArrow = false,
  color,
}: LinkComponentProps) => {
  return (
    <Link href={href}>
      <div
        className={`font-inter group flex w-fit items-center gap-4 border-b-[1px] border-solid text-sm lg:text-base
        ${
          color === "white"
            ? "border-white text-white"
            : "text-black07 border-black07"
        }`}
      >
        <div
          className={
            !showArrow
              ? "transition-all group-hover:-translate-y-2 group-hover:transform"
              : ""
          }
        >
          {label}
        </div>
        {showArrow && (
          <div className="transition-all group-hover:translate-x-4 group-hover:transform">
            <ArrowRightIcon fill={color === "white" ? "white" : "black"} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default LinkComponent;
