"use client";

import SearchBar from "../searchbar";
import Link from "next/link";
import CartButton from "../cart-button";
import { useState } from "react";
import CartDropdown from "../cart-dropdown";

// Will show 4 products max. Scroll.
// Add button to close cart.
// Add button to go to cart page.

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="px-fluid-x">
      <nav className="flex h-fit w-full items-center justify-between py-16 lg:h-88 lg:pb-18 lg:pt-24">
        <div className="flex w-1/2 gap-18">
          <Link href="/" aria-label="Link to home page">
            <h1 className="">Logo</h1>
          </Link>
          <h2 className="">Shop</h2>
        </div>
        <div className="flex w-1/2 items-center gap-18">
          <SearchBar placeholder="Search" />
          <CartButton
            onClick={(e) => {
              e.stopPropagation();
              setIsCartOpen(!isCartOpen);
            }}
          />
        </div>
      </nav>
      <div className="h-0 w-0">
        {isCartOpen && (
          <CartDropdown isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
