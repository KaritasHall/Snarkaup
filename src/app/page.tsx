"use client";
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-card";
import CartCard from "./components/cart-card";
import { useCart, CartItem } from "./hooks/useCart";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({});
  const { cart, addToCart } = useCart();

  return (
    <>
      <SectionContainer>
        <div className="flex gap-[150px]">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            {products?.map((product, index) => (
              <div key={product.id}>
                <ProductCard product={product} />
                <button
                  key={index}
                  onClick={() => addToCart(product?.id ?? 0, 1)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="w-fit outline">
            <h2 className="text-2xl font-bold">Cart</h2>
            {cart.map((cartItem, index) => (
              <CartCard key={index} cartItem={cartItem} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </>
  );
}
