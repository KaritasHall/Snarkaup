"use client"; // "use interactive"
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductCard from "./components/product-card";
import Button from "./components/button";
import { HeartIcon } from "@icons";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({});

  return (
    <>
      <SectionContainer>
        <div className="p-20">
          <Button
            label="Hello"
            shape="square"
            stretch
            onClick={() => console.log("Button clicked!")}
          />
        </div>
        <div className="p-20">
          <Button
            label="Wishlist"
            icon={HeartIcon}
            shape="soft"
            color="white"
          />
        </div>
        <div className="p-20">
          <Button label="Hello" shape="soft" color="blue" />
        </div>
        <div className="p-20">
          <Button label="Hello" shape="square" color="green" />
        </div>
        <div className="grid grid-cols-1 gap-[64px] lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </SectionContainer>
    </>
  );
}
