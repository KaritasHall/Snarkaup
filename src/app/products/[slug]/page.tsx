"use client";
import { useProducts } from "@/app/hooks/useProducts";
import SectionContainer from "@/app/components/section-container";
import Image from "next/image";
import Button from "@/app/components/button";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/utils/format-price";
import { ProductCarousel } from "@/app/components/product-carousel";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product } = useProducts({
    id: params.slug,
  });
  const { addToCart } = useCart();

  const image = product?.content;
  const price = product?.variants[0].price ?? 0;

  if (!product) {
    return null;
  }

  // console.log(product, "price", product?.variants[0].price);

  return (
    <SectionContainer>
      <div className="flex flex-col items-center gap-[65px] lg:flex-row lg:items-start">
        <div className="flex w-1/2 flex-col gap-8">
          {/* Photo carousel */}
          {image && (
            <ProductCarousel
              carouselImages={image?.map((img) => img.listUrl)}
              title={product.title}
            />
          )}
        </div>
        <div className="flex w-1/2 flex-col">
          <div className="text-black07">
            <h2 className="pb-16 font-poppins text-h3 text-black">
              {product?.title}
            </h2>
            <p className="py-16 font-inter text-base text-black04">
              {product?.description}
            </p>

            <h3 className="">{formatPrice(price)}</h3>
          </div>
          <Button
            ariaLabel="Add to Cart"
            label="Add to Cart"
            stretch={true}
            onClick={() => addToCart(product?.id ?? 0, 1)}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
