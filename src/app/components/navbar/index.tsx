"use client";

import SearchBar from "../searchbar";
import Link from "next/link";
import CartButton from "../cart-button";
import { useEffect, useState } from "react";
import CartDropdown from "../cart-dropdown";
import { useCart } from "@/app/hooks/useCart";
import { setBodyScroll } from "@/app/utils/set-body-scroll";
import { MegaMenu } from "../mega-menu";
import cx from "classnames";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasMountedCartDropdown, setHasMountedCartDropdown] = useState(false);
  const [hasMountedMegaMenu, setHasMountedMegaMenu] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { cart } = useCart();

  const closeMegaMenu = () => {
    setHasMountedMegaMenu(false);
    setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 400);
  };

  const closeCart = () => {
    setHasMountedCartDropdown(false);
    setTimeout(() => {
      setIsCartOpen(false);
    }, 400);
  };

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

  useEffect(() => {
    setBodyScroll(!isCartOpen);
  }, [isCartOpen]);

  return (
    <div>
      <nav
        className={cx(
          "fixed top-0 z-20 flex w-full flex-col gap-16 bg-white px-fluid-x py-6 pt-12 transition-[400ms] ease-in-out lg:py-0",
          isScrolling ? "lg:py-10" : "lg:pb-18 lg:pt-24",
          hasMountedMegaMenu ? "shadow-none" : "shadow-md",
        )}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-1/2 gap-18">
            <Link href="/" aria-label="Link to home page">
              <h1 className="">Logo</h1>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                isMegaMenuOpen ? closeMegaMenu : setIsMegaMenuOpen(true);
              }}
              className="text-black07"
              aria-label="Open mega menu"
            >
              Shop
            </button>
          </div>
          <div className="flex items-center lg:w-1/2 lg:gap-18">
            <SearchBar
              className="hidden w-full lg:block"
              placeholder="What are you looking for?"
            />

            <div className="flex items-center gap-4">
              <CartButton
                aria-label="Open cart dropdown"
                onClick={(e) => {
                  e.stopPropagation();
                  isCartOpen ? closeCart() : setIsCartOpen(true);
                }}
              />
              {cart.length > 0 && (
                <div className="flex h-22 w-22 items-center justify-center rounded-full bg-black07 p-2">
                  <p className="text-xs text-white">{totalQuantity}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <SearchBar
          className={cx(
            "mb-6 w-full lg:hidden",
            isScrolling ? "hidden" : "block",
            isMegaMenuOpen ? "hidden" : "block",
            isCartOpen ? "hidden" : "block",
          )}
          placeholder="What are you looking for?"
        />
      </nav>

      {isMegaMenuOpen && (
        <MegaMenu
          isScrolling={isScrolling}
          closeMegaMenu={closeMegaMenu}
          hasMountedMegaMenu={hasMountedMegaMenu}
          setHasMountedMegaMenu={setHasMountedMegaMenu}
        />
      )}

      {isCartOpen && (
        <CartDropdown
          isScrolling={isScrolling}
          closeCart={closeCart}
          hasMountedCartDropdown={hasMountedCartDropdown}
          setHasMountedCartDropdown={setHasMountedCartDropdown}
        />
      )}
    </div>
  );
};

export default Navbar;
