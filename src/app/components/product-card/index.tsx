import { Product } from "@/app/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="grid w-168 grid-rows-[auto_1fr] gap-8 rounded-md bg-white px-8 py-12 shadow-lg lg:w-255 lg:gap-12">
      <div className="h-160 w-full md:h-168 lg:h-255 lg:pb-4">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain pb-6"
            width={255}
            height={255}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-end gap-6">
        <h2 className="hidden text-base lg:block">{product.title}</h2>
        <h3 className="text-base md:text-lg">${product.price}</h3>
      </div>
    </div>
  );
};
export default ProductCard;
