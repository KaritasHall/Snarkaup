"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function WomensClothingPage() {
  const { productsByCategory, categoryTitle } = useProducts({
    category: "women's clothing",
  });

  return (
    <CategorySection
      categoryTitle={categoryTitle}
      products={productsByCategory}
    />
  );
}
