import ProductCard from "@/app/components/product-cards/product-card";
import { AugmentedProduct } from "@/app/hooks/useProducts";

const ProductGrid = ({ products }: { products: AugmentedProduct[] }) => {
  return (
    <div className="grid grid-cols-3 gap-y-24">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
