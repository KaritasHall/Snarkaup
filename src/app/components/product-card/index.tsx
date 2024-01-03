import { Product } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import Button from "../button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-card-w grid grid-rows-[auto_1fr] gap-12">
      <div className="h-card-h w-full">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain mix-blend-multiply"
            width={255}
            height={255}
          />
        </Link>
      </div>
      {/* <Button color="default" label="Add to cart" shape="square" /> */}
      <div className="flex flex-col gap-4 font-inter font-semibold">
        <h2 className="line-clamp-1 text-base leading-6 lg:line-clamp-3">
          {product.title}
        </h2>
        <h3 className="text-sm leading-6">${product.price}</h3>
      </div>
    </div>
  );
};
export default ProductCard;
