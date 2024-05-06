"use client";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import ProductGrid from "./components/product-grid";
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/queries/front-page-query";
import { FrontPageRecord } from "./dato/generated/graphql";
import { Image } from "react-datocms";

export default function Home() {
  const { loading, error, data } = useQuery<{ frontPage: FrontPageRecord }>(
    GET_FRONT_PAGE,
  );

  console.log("frontpage data", data, error, loading);

  const { products, productsIsLoading } = useProducts({});

  return (
    <SectionContainer>
      {data?.frontPage.contentSection.map((section) => (
        <div key={section.id} className="lg:w-1/2">
          <h3 className="text-h4 lg:text-h3">{section?.infoBlock?.heading}</h3>
          <p className="text-body lg:text-body-lg mt-4">
            {section?.infoBlock?.description}
          </p>
          {section?.infoBlock?.image?.responsiveImage && (
            <Image
              objectFit="cover"
              data={section?.infoBlock?.image?.responsiveImage}
              className="w-full rounded-md"
            />
          )}
        </div>
      ))}
    </SectionContainer>
  );
}
