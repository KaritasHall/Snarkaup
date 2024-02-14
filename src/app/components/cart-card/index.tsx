import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/app/hooks/useCart";
import { CloseButton } from "../close-button";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "../icons";
import { formatPrice } from "@/app/utils/format-price";

// TODO: Birta réttan variant f. viðeigandi vöru

interface CartCardProps {
  cartItem: CartItem;
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { removeFromCart, addToCart, showItemQuantity, decreaseQuantity } =
    useCart();

  const cartProduct = cartItem?.product;
  const cartProductId = cartItem?.product.id;

  const cartQuantity = showItemQuantity(cartProductId);
  const [quantity, setQuantity] = useState<number>(cartQuantity);

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(cartProductId, 1);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    decreaseQuantity(cartProductId);
  };

  // Calculate the total price of a product
  const totalPrice = cartProduct?.lowestPrice
    ? cartProduct.lowestPrice * cartQuantity
    : 0;

  return (
    <div className="flex w-[645px] items-center justify-between py-24 font-inter">
      <div className="flex gap-16">
        <div className="h-96 w-80">
          <Link href={`/${cartItem?.product.slug}`}>
            {cartProduct.listImage && (
              <Image
                src={cartProduct.listImage}
                alt={cartProduct.title}
                className="h-full w-full object-cover"
                width={255}
                height={255}
              />
            )}
          </Link>
        </div>
        <div className="flex w-[210px] flex-col gap-8">
          <h2 className="line-clamp-1 text-sm font-semibold leading-6 tracking-wide text-black07">
            {cartProduct.title}
          </h2>
          {cartItem?.product.variants && (
            <p className="text-label text-black04">
              {cartProduct.variants[0].title}
            </p>
          )}
          <CloseButton
            onClick={() => removeFromCart(cartProductId)}
            label="Remove"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-[60px]">
        <div className="flex w-fit justify-between gap-12 rounded-[4px] border border-black04 px-12 py-8">
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
        {/* Shows price of single product */}
        <p className="hidden font-inter text-lg leading-6 lg:block">
          {cartProduct?.lowestPrice && formatPrice(cartProduct.lowestPrice)}
        </p>
        {/* Shows the price sum of multiple items of a product*/}
        <p className="text-right font-inter text-lg font-semibold leading-6">
          {formatPrice(totalPrice)}
        </p>
      </div>
    </div>
  );
};
export default CartCard;
