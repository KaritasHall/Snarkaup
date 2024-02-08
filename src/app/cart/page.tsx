"use client";

import { useCart } from "../hooks/useCart";
import CartCard from "../components/cart-card";
import SectionContainer from "../components/section-container";

export default function Cart() {
  const { cart } = useCart();
  return (
    <SectionContainer>
      <div className="w-fit outline">
        <h2 className="text-2xl font-bold">Cart</h2>
        {cart.map((cartItem, index) => (
          <CartCard key={index} cartItem={cartItem} />
        ))}
      </div>
    </SectionContainer>
  );
}
