"use client";

import { useCart } from "../hooks/useCart";
import CartCard from "../components/product-cards/cart-card";
import SectionContainer from "../components/section-container";

export default function CartPage() {
  const { cart } = useCart();
  return (
    <SectionContainer>
      <div className="flex w-full justify-center">
        <h2 className="font-poppins text-h1">Cart</h2>
      </div>

      <div className="w-fit">
        {cart.map((cartItem, index) => (
          <CartCard key={index} cartItem={cartItem} />
        ))}
      </div>
    </SectionContainer>
  );
}
