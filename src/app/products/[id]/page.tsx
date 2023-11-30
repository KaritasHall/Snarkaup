"use client";
import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";

export default function Page({ params }: { params: { id: string } }) {
  const { product } = useProducts({
    id: params.id,
  });

  return (
    <SectionContainer>
      <h2>This is a slug!</h2>
      <p className="text-black">{params.id}</p>
      <p className="text-black">{product?.title}</p>
    </SectionContainer>
  );
}
