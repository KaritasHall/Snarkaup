import React from "react";
import {
  ListProductWithContent,
  AugmentedCategory,
} from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import ProductGrid from "../product-grid";

interface CategorySectionProps {
  category: AugmentedCategory | undefined;
  products: ListProductWithContent[];
  isLoading: boolean;
}

function CategorySection({
  category,
  products,
  isLoading,
}: CategorySectionProps) {
  const categoryItemCount = products?.length;

  return (
    <div key={category?.id}>
      <SectionContainer>
        <div className="pb-24">
          <h2 className="min-h-[83px] text-center text-h1 capitalize text-black06">
            {category?.title}
          </h2>

          <p className="min-h-[23px] text-left text-base text-black04">
            {!isLoading ? categoryItemCount + " items" : ""}
          </p>
        </div>
        <ProductGrid products={products ?? []} isLoading={isLoading} />
      </SectionContainer>
    </div>
  );
}

export default CategorySection;
