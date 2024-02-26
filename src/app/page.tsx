"use client";
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-cards/product-card";
import { useCart } from "./hooks/useCart";
import ProductGrid from "./components/product-grid";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products } = useProducts({});
  const { addToCart } = useCart();

  return (
    <>
      <SectionContainer>
        <div>
          {products &&
            products.map((product) => (
              <div key={product.id}>
                <ProductGrid products={products} />
              </div>
            ))}
        </div>
      </SectionContainer>
    </>
  );
}
