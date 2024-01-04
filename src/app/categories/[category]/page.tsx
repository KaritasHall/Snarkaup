"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { productsByCategory } = useProducts({
    category: params.category,
  });

  const categoryTitle = decodeURI(params.category);

  return (
    <CategorySection
      categoryTitle={categoryTitle}
      products={productsByCategory || []}
    />
  );
}
