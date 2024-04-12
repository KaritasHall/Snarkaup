import Link from "next/link";

export const Logo = () => {
  return (
    <Link aria-label="Go to home page" href="/">
      <p className="font-raleway font-bold">SNARKAUP</p>
    </Link>
  );
};
