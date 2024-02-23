"use client";

import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "../components/section-container";
import ProductGrid from "../components/product-grid";

const limit = 4;

import { useThrottle } from "react-use";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // TODO: Implement search functionality, use useThrottle to throttle the query
  // Create Search Hook, useSearch, that handles the search functionality and returns the products
  // endpoint is search/:query, example: /api/search/Eco
  const throttledQuery = useThrottle(searchParams?.query, 3000) || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { products } = useProducts({});

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(throttledQuery.toLowerCase()),
  );

  try {
    console.log({
      products,
      filteredProducts,
      currentPage,
      limit,
      throttledQuery,
    });
  } catch (e) {
    console.error(e);
  }

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
