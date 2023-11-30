"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function JeweleryPage() {
  const { productsByCategory, categoryTitle } = useProducts({
    category: "jewelery",
  });

  return (
    <CategorySection
      categoryTitle={categoryTitle}
      products={productsByCategory}
    />
  );
}
