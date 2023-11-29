"use client"; // "use interactive"
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-card";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({
    id: 1,
  });
  console.log("product", product);

  return (
    <>
      <SectionContainer>
        <div className="grid grid-cols-1 gap-[64px] lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
