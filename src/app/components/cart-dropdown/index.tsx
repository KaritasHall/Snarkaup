import { useCart, CartItem } from "@/app/hooks/useCart";
import CartCard from "@/app/components/cart-card";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ShoppingBagIcon } from "../icons/shopping-bag-icon";
import { formatPrice } from "@/app/utils/format-price";

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
              <div className="flex-col">
                <Link
                  className="relative flex w-full justify-center border-2 border-black05 p-10"
                  aria-label="View cart"
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                >
                  <p className="text-black">View cart</p>
                  <div className="absolute right-10">
                    <ShoppingBagIcon fill="black" />
                  </div>
                </Link>

                <div className="flex w-full justify-between p-12">
                  <p>Total price</p>
                  <p>{formatPrice(totalCartPrice)}</p>
                </div>
              </div>
            )}
            {cart.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CartDropdown;
