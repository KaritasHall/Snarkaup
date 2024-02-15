import { useCart } from "@/app/hooks/useCart";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import { formatPrice } from "@/app/utils/format-price";
import MiniCartCard from "../product-cards/mini-cart-card";

type CartDropdownProps = {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const CartDropdown = ({ isCartOpen, setIsCartOpen }: CartDropdownProps) => {
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the cart dropdown when clicking outside of it
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

  // Calculate the total price of all items in the cart
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + (item?.product?.lowestPrice ?? 0) * item.quantity,

    0,
  );

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
            {cart.length > 0 && (
              <div className="divider flex flex-col gap-12">
                <Link
                  className="relative flex w-full justify-center border-[1px] border-black04 p-10"
                  aria-label="View cart"
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                >
                  <p className="text-base text-black">View cart</p>
                  <div className="absolute right-10">
                    <ShoppingBagIcon fill="black" />
                  </div>
                </Link>
                <Link
                  className=" relative flex w-full justify-center bg-black07 p-10"
                  aria-label="Go to checkout"
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                >
                  <p className="text-base text-white">Checkout</p>
                </Link>

                <div className="flex w-full items-center  justify-between p-10">
                  <p className="font-inter text-base">Total price</p>
                  <p className="text-h6">{formatPrice(totalCartPrice)}</p>
                </div>
              </div>
            )}
            {cart.map((cartItem, index) => (
              <MiniCartCard key={index} cartItem={cartItem} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CartDropdown;
