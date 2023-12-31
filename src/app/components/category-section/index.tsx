import React from "react";
import { AugmentedProduct, AugmentedCategory } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import ProductCard from "@/app/components/product-card";

interface CategorySectionProps {
  category: AugmentedCategory;
  products: AugmentedProduct[];
}

function CategorySection({ category, products }: CategorySectionProps) {
  return (
    <div key={category?.id}>
      <SectionContainer>
        <h2 className="capitalize">{category?.title}</h2>
        <div className="grid grid-cols-1 gap-64 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}

export default CategorySection;
