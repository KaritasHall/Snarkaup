import Image from "next/image";
import Link from "next/link";
import { AugmentedProduct } from "@/app/hooks/useProducts";

interface ProductCardProps {
  product: AugmentedProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="grid w-card-w grid-rows-[auto_1fr] gap-12">
      <div className="h-card-h w-full">
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
      <div className="flex flex-col gap-4 font-inter font-semibold">
        <h2 className="line-clamp-1 text-base leading-6 lg:line-clamp-3">
          {product.title}
        </h2>
        <h3 className="text-sm leading-6">${product.lowestPrice}</h3>
      </div>
    </div>
  );
};
export default ProductCard;
