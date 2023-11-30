"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function ElectronicsPage() {
  const { productsByCategory, categoryTitle } = useProducts({
    category: "electronics",
  });

  return (
    <CategorySection
      categoryTitle={categoryTitle}
      products={productsByCategory}
    />
  );
}
