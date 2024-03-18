"use client";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductGrid from "./components/product-grid";

export default function Home() {
  const { products, productsIsLoading } = useProducts({});

  return (
    <SectionContainer>
      <ProductGrid products={products ?? []} isLoading={productsIsLoading} />
    </SectionContainer>
  );
}
