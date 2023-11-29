"use client";
import { useProducts } from "../hooks/useProducts";
import SectionContainer from "../components/section-container";
import ProductCard from "../components/product-card";

export default function Page() {
  const { productsByCategory, categories } = useProducts({
    category: "women's clothing",
  });

  return (
    <SectionContainer>
      <h2>Women's clothing</h2>
      <div className="grid grid-cols-1 gap-64 lg:grid-cols-4">
        {productsByCategory?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </SectionContainer>
  );
}
