"use client"; // "use interactive"
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-card";
import CartCard from "./components/cart-card";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({});
  console.log("products", products);

  return (
    <>
      <SectionContainer>
        {products?.map((product) => (
          <div className="p-10" key={product?.id}>
            <CartCard key={product?.id} product={product} />
          </div>
        ))}
      </SectionContainer>
    </>
  );
}
