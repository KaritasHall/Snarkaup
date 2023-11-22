"use client"; // "use interactive"
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { LandingHero } from "./components/LandingHero";
import { useProducts } from "./hooks/useProducts";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({
    id: 5,
    category: "electronics",
  });

  return (
    <>
      <h1>hello</h1>
      <h2>Products</h2>
      <LandingHero {...data?.frontpage} />
    </>
  );
}
