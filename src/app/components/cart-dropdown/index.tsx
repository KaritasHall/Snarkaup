import { useCart } from "@/app/hooks/useCart";
import CartCard from "@/app/components/cart-card";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";

type CartDropdownProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartDropdown = ({ isCartOpen, setIsCartOpen }: CartDropdownProps) => {
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
          className="absolute right-[63px] top-[80px] z-50 border-[1px] border-grey02 bg-white shadow-lg"
        >
          <div className="max-h-[75vh] overflow-y-auto px-8">
            {cart.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-12 px-40 py-[60px]">
                <ShoppingBagIcon fill="grey" />
                <p className="text-lg text-black04">Your cart is empty</p>
              </div>
            )}
            {cart.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>
          {cart.length > 0 && (
            <Link
              className="flex w-full justify-center bg-black07 p-10 text-white"
              aria-label="Go to cart"
              href="/cart"
              onClick={() => setIsCartOpen(false)}
            >
              <p>Go to cart</p>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default CartDropdown;
