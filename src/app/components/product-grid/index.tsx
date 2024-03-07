import ProductCard from "@/app/components/product-cards/product-card";
import { ListProductWithContent } from "@/app/hooks/useProducts";

const ProductGrid = ({ products }: { products: ListProductWithContent[] }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 justify-evenly gap-x-[84px] gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-40">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
