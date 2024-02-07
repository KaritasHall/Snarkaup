import SearchBar from "../searchbar";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-fluid-x pb-10 lg:pb-30">
      <nav className="flex h-fit w-full justify-between py-16 lg:h-88 lg:pb-18 lg:pt-24">
        <div className="flex w-1/2 gap-18">
          <Link href="/" aria-label="Link to home page">
            <h1 className="">Logo</h1>
          </Link>
          <h2 className="">Shop</h2>
        </div>
        <div className="flex w-1/2 items-center gap-18">
          <SearchBar placeholder="Search" />
          <ShoppingBagIcon />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
