"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function MensClothingPage() {
  const { productsByCategory, categoryTitle } = useProducts({
    category: "men's clothing",
  });

  return (
    <CategorySection
      categoryTitle={categoryTitle}
      products={productsByCategory}
    />
  );
}
