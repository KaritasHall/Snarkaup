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
    <div className="divider-dark flex w-full py-24 lg:items-center lg:justify-between xl:w-[55vw]">
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
        <div className="flex flex-col gap-8">
          <h2 className="line-clamp-1 w-[150px] text-sm font-semibold leading-6 tracking-wide text-black07 xl:line-clamp-none xl:w-full">
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
            className="hidden sm:flex"
          />
          <div className="sm:hidden">
            <ItemCounter
              productVariantId={cartProductVariantId}
              productId={cartProduct.id}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end sm:grid sm:grid-cols-3 sm:items-center sm:gap-[60px]">
        <div className="hidden sm:block">
          <ItemCounter
            productVariantId={cartProductVariantId}
            productId={cartProduct.id}
          />
        </div>
        {/* Shows price of single product */}
        <p className="hidden text-lg leading-6 sm:block">
          {formatPrice(cartItemVariant?.price ?? 0)}
        </p>
        {/* Shows the price sum of multiple items of a product*/}
        <p className="text-right text-sm font-semibold leading-6 lg:text-lg">
          {formatPrice(totalVariantPrice)}
        </p>
        <CloseButton
          onClick={() => removeFromCart(cartProductVariantId)}
          className="flex sm:hidden"
        />
      </div>
    </div>
  );
};
export default CartCard;
