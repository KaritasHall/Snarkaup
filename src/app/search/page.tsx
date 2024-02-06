"use client";

import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "../components/section-container";
import ProductGrid from "../components/product-grid";

const limit = 4;

export default function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { products } = useProducts({});

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );

  const currentProducts = filteredProducts?.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  return (
    <div>
      <SectionContainer>
        <h2 className="pb-24 text-2xl font-bold">Results</h2>
        <ProductGrid products={currentProducts ?? []} />
      </SectionContainer>
    </div>
  );
}
