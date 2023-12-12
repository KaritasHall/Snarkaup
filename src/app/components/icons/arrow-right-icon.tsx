export const ArrowRightIcon = ({
  fill = "black",
}: {
  fill?: "black" | "white";
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M3.8335 8H13.1668"
      stroke={fill === "black" ? "#141718" : "#FEFEFE"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.1665 12L13.1665 8"
      stroke={fill === "black" ? "#141718" : "#FEFEFE"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.1665 4L13.1665 8"
      stroke={fill === "black" ? "#141718" : "#FEFEFE"}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
