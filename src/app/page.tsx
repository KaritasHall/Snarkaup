"use client";
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-cards/product-card";
import { useCart } from "./hooks/useCart";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products } = useProducts({});
  const { addToCart } = useCart();

  return (
    <>
      <SectionContainer>
        <div className="flex gap-[150px]">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            {products?.map((product, index) => (
              <div>
                <ProductCard key={product.id} product={product} />
                <button
                  key={index}
                  onClick={() => addToCart(product?.id ?? 0, 1)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
