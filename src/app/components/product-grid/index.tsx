import ProductCard from "../product-card";
import { AugmentedProduct } from "@/app/hooks/useProducts";

const ProductGrid = ({ products }: { products: AugmentedProduct[] }) => {
  return (
    <div className="grid grid-cols-3">
      {products?.map((product) => (
        <div>
          <ProductCard key={product.id} product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
