import { useCart } from "@/app/hooks/useCart";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "../icons";

// Increase or decrease the count of items in the cart

interface ItemCounterProps {
  productId: number;
}

export const ItemCounter = ({ productId }: ItemCounterProps) => {
  const { addToCart, showItemQuantity, decreaseQuantity } = useCart();

  const cartQuantity = showItemQuantity(productId);
  const [quantity, setQuantity] = useState<number>(cartQuantity);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(productId, 1);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    decreaseQuantity(productId);
  };

  return (
    <div className="flex w-fit justify-between gap-12 rounded-[4px] border border-black04 px-12 py-4">
      <button className="w-fit" onClick={decrementQuantity}>
        <MinusIcon />
      </button>
      <span className="flex justify-center p-2 text-label font-semibold text-black07">
        {cartQuantity}
      </span>
      <button className="w-fit" onClick={incrementQuantity}>
        <PlusIcon />
      </button>
    </div>
  );
};
