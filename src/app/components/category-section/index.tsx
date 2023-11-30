import { Product } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import ProductCard from "@/app/components/product-card";

interface CategorySectionProps {
  categoryTitle: string;
  products: Product[] | undefined;
}

function CategorySection({ categoryTitle, products }: CategorySectionProps) {
  return (
    <SectionContainer>
      <h2 className="capitalize">{categoryTitle}</h2>
      <div className="grid grid-cols-1 gap-64 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
}

export default CategorySection;
