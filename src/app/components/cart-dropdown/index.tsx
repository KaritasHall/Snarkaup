import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import { formatPrice } from "@/app/utils/format-price";
import MiniCartCard from "../product-cards/mini-cart-card";
import cx from "classnames";

type CartDropdownProps = {
  isScrolling: boolean;
  closeCart: () => void;
  setHasMountedCartDropdown: (hasMounted: boolean) => void;
  hasMountedCartDropdown: boolean;
};

const CartDropdown = ({
  isScrolling,
  closeCart,
  setHasMountedCartDropdown,
  hasMountedCartDropdown,
}: CartDropdownProps) => {
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // We need to keep track of when the component has mounted so animations can be applied
  useEffect(() => {
    setHasMountedCartDropdown(true);
  }, []);

  // Close the cart dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        event.stopPropagation();
        closeCart();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Calculate the total price of all items in the cart
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + (item?.product?.lowestPrice ?? 0) * item.quantity,

    0,
  );

  return (
    <>
      <div
        ref={dropdownRef}
        className={cx(
          "z-60 fadeIn fixed right-0 min-w-[min(500px,100%)] border-[1px] border-grey02 bg-white shadow-lg",
          isScrolling ? "top-[44px] lg:top-[64px]" : "top-[66px] lg:top-[86px]",
          hasMountedCartDropdown ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div
          className={cx(
            "overflow-y-auto px-8 sm:px-16",
            isScrolling
              ? "max-h-[calc(100dvh-64px)]"
              : "max-h-[calc(100dvh-86px)]",
          )}
        >
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-12 px-40 py-[60px]">
              <ShoppingBagIcon fill="grey" />
              <p className="text-lg text-black04">Your cart is empty</p>
            </div>
          )}
          {cart.length > 0 && (
            <div className="divider sticky top-0 flex flex-col gap-12 bg-white pt-8">
              <Link
                className="relative flex w-full justify-center border-[1px] border-black04 p-10"
                aria-label="View cart"
                href="/cart"
                onClick={closeCart}
              >
                <p className="text-base text-black">View cart</p>
                <div className="absolute right-10">
                  <ShoppingBagIcon fill="black" />
                </div>
              </Link>
              <Link
                className="relative flex w-full justify-center bg-black07 p-10"
                aria-label="Go to checkout"
                href="/checkout"
                onClick={closeCart}
              >
                <p className="text-base text-white">Checkout</p>
              </Link>

              <div className="flex w-full items-center justify-evenly py-10">
                <p className="w-full font-inter text-base">Total price</p>
                <p className="w-full text-right text-h6">
                  {formatPrice(totalCartPrice)}
                </p>
              </div>
            </div>
          )}
          <div className="py-16">
            {cart.map((cartItem, index) => (
              <MiniCartCard key={index} cartItem={cartItem} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDropdown;
