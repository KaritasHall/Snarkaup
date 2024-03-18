"use client";

import CategorySection from "@/app/components/category-section";
import { useProducts } from "@/app/hooks/useProducts";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const {
    productsByCategory,
    products,
    productsByCategoryIsLoading,
    productsIsLoading,
  } = useProducts({
    category: params.category,
  });

  return (
    <>
      <CategorySection
        products={products || []}
        category={productsByCategory}
        isLoading={productsIsLoading || productsByCategoryIsLoading}
      />
    </>
  );
}
