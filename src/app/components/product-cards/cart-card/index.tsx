import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/app/hooks/useCart";
import { CloseButton } from "@/app/components/close-button";
import { formatPrice } from "@/app/utils/format-price";
import { ItemCounter } from "../../item-counter";
import { ProductWithContent } from "@/app/hooks/useProducts";

// TODO: Birta réttan variant f. viðeigandi vöru

interface CartCardProps {
  cartItem: CartItem;
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { removeFromCart, showItemQuantity } = useCart();

  const cartProduct = cartItem?.product;
  const cartProductId = cartItem?.product.id;

  const cartQuantity = showItemQuantity(cartProductId);

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
        <ItemCounter productId={cartProductId} />
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
