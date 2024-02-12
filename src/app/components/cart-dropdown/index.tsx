import { useCart } from "@/app/hooks/useCart";
import CartCard from "@/app/components/cart-card";
import SectionContainer from "../section-container";
import { CloseButton } from "../close-button";
import Link from "next/link";
import { useRef, useEffect } from "react";

type CartDropdownProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartDropdown = ({ isCartOpen, setIsCartOpen }: CartDropdownProps) => {
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        event.stopPropagation();
        setIsCartOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isCartOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-[63px] top-[80px] z-50 bg-white shadow-lg"
        >
          <div className="max-h-[75vh] overflow-y-auto px-8">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Cart</h2>
              <CloseButton
                aria-label="Close dropdown"
                onClick={() => setIsCartOpen(false)}
              />
            </div>
            {cart.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>
          <Link
            className="flex w-full justify-center bg-black07 p-10 text-white"
            aria-label="Go to cart"
            href="/cart"
          >
            <p>Go to cart</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartDropdown;
