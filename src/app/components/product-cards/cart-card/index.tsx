import Image from "next/image";
import Link from "next/link";
import { useCart, CartItem } from "@/app/hooks/useCart";
import { CloseButton } from "@/app/components/close-button";
import { formatPrice } from "@/app/utils/format-price";
import { ItemCounter } from "../../item-counter";

interface CartCardProps {
  cartItem: CartItem;
}

const CartCard = ({ cartItem }: CartCardProps) => {
  const { removeFromCart, showItemQuantity } = useCart();

  const cartProduct = cartItem?.product;
  const cartProductVariantId = cartItem?.variantId;
  const cartItemVariant = cartProduct?.variants.find(
    (variant) => variant.id === cartProductVariantId,
  );

  const cartQuantity = showItemQuantity(cartProductVariantId);

  // Calculate the total price of a product
  const totalVariantPrice = cartItemVariant?.price
    ? cartItemVariant.price * cartQuantity
    : 0;

  return (
    <div className="flex w-[645px] items-center justify-between py-24">
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
              {cartItemVariant?.title ?? ""}
            </p>
          )}
          <CloseButton
            onClick={() => removeFromCart(cartProductVariantId)}
            label="Remove"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-[60px]">
        <ItemCounter
          productVariantId={cartProductVariantId}
          productId={cartProduct.id}
        />
        {/* Shows price of single product */}
        <p className="hidden text-lg leading-6 lg:block">
          {formatPrice(cartItemVariant?.price ?? 0)}
        </p>
        {/* Shows the price sum of multiple items of a product*/}
        <p className="text-right text-lg font-semibold leading-6">
          {formatPrice(totalVariantPrice)}
        </p>
      </div>
    </div>
  );
};
export default CartCard;
