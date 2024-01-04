"use client";
import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import ProductCard from "@/app/components/product-card";

export default function Page({ params }: { params: { slug: string } }) {
  const { product } = useProducts({
    id: params.slug,
  });

  if (!product) {
    return null;
  }

  return (
    <SectionContainer>
      <h2>This is a slug!</h2>
      <p className="text-black">{params.slug}</p>
      <p className="text-black">{product?.title}</p>
      <ProductCard key={product?.id} product={product} />
    </SectionContainer>
  );
}
