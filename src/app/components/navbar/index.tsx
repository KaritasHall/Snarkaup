"use client";

import SearchBar from "../searchbar";
import Link from "next/link";
import CartButton from "../cart-button";
import { use, useEffect, useState } from "react";
import CartDropdown from "../cart-dropdown";
import { useCart } from "@/app/hooks/useCart";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { cart } = useCart();

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setIsScrolling]);

  return (
    <div>
      <nav
        className={`fixed top-0 flex w-full items-center justify-between bg-white px-fluid-x shadow-md transition-[200ms] ${
          isScrolling ? "lg:py-10" : "lg:pb-18 lg:pt-24"
        }`}
      >
        <div className="flex w-1/2 gap-18">
          <Link href="/" aria-label="Link to home page">
            <h1 className="">Logo</h1>
          </Link>
          <h2 className="">Shop</h2>
        </div>
        <div className="flex w-1/2 items-center gap-18">
          <SearchBar placeholder="What are you looking for?" />
          <div className="flex items-center gap-4">
            <CartButton
              onClick={(e) => {
                e.stopPropagation();
                setIsCartOpen(!isCartOpen);
              }}
            />
            {cart.length > 0 && (
              <div className="flex h-22 w-22 items-center justify-center rounded-full bg-black07 p-2">
                <p className="text-xs text-white">{totalQuantity}</p>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="h-0 w-0">
        {isCartOpen && (
          <CartDropdown
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isScrolling={isScrolling}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
