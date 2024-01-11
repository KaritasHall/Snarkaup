import Image from "next/image";
import Link from "next/link";
import { AugmentedProduct } from "@/app/hooks/useProducts";
import { CloseButton } from "../close-button";

interface CartCardProps {
  product: AugmentedProduct;
}

const CartCard = ({ product }: CartCardProps) => {
  return (
    <div className="flex w-[645px] items-center justify-between py-24 font-inter outline outline-2 outline-black04">
      <div className="flex gap-16">
        <div className="h-96 w-80">
          <Link href={`/${product.slug}`}>
            {product.listImage && (
              <Image
                src={product.listImage}
                alt={product.title}
                className="h-full w-full object-cover"
                width={255}
                height={255}
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col gap-8">
          <h2 className="max-w-[200px] text-sm font-semibold leading-6 tracking-wide text-black07">
            {product.title}
          </h2>
          {/* TODO: Add current variant */}
          {product.variants && (
            <p className="text-label text-black04">
              {product.variants[0].title}
            </p>
          )}
          <CloseButton onClick={() => {}} label="Remove" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[60px] bg-red">
        <p>counter</p>
        <h3 className="text-sm leading-6">${product.lowestPrice}</h3>
        <p className="">subtotal</p>
      </div>
    </div>
  );
};
export default CartCard;
