import React from "react";
import {
  ListProductWithContent,
  AugmentedCategory,
} from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import ProductCard from "@/app/components/product-cards/product-card";

interface CategorySectionProps {
  category: AugmentedCategory;
  products: ListProductWithContent[];
}

function CategorySection({ category, products }: CategorySectionProps) {
  const categoryItemCount = products?.length;

  return (
    <div key={category?.id}>
      <SectionContainer>
        <div className="pb-24">
          <h2 className="text-center text-h1 capitalize text-black06">
            {category?.title}
          </h2>
          <p className="text-left text-base text-black04">
            {categoryItemCount} items
          </p>
        </div>
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
