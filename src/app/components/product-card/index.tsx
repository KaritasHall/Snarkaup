import { Product } from "@/app/hooks/useProducts";
import Image from "next/image";

// TODO: Wrap in Link when slugs are ready

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-168 lg:w-255 grid grid-rows-[auto_1fr] gap-8 rounded-md bg-white px-8 py-12 shadow-lg lg:gap-12">
      <div className="h-160 md:h-168 lg:h-255 w-full lg:pb-4">
        <Image
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain pb-6"
          width={255}
          height={255}
        />
      </div>
      <div className="flex flex-col justify-end gap-6">
        <h2 className="hidden text-base lg:block">{product.title}</h2>
        <h3 className="text-base md:text-lg">${product.price}</h3>
      </div>
    </div>
  );
};
export default ProductCard;