"use client";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/queries/front-page-query";
import { FrontPageRecord } from "./dato/generated/graphql";
import { Image } from "react-datocms";
import Button from "./components/button";
import Link from "next/link";
import { ArrowRightIcon } from "./components/icons";
import { withRouter } from "next/router";

export default function Home() {
  const { loading, error, data } = useQuery<{ frontPage: FrontPageRecord }>(
    GET_FRONT_PAGE,
  );

  console.log("frontpage data", data, error, loading);

  const { products, productsIsLoading } = useProducts({});

  return (
    <SectionContainer>
      {data?.frontPage.contentSection.map((section) => (
        <div
          key={section.id}
          className="mt-fluid-bottom flex h-fit bg-grey01 shadow-md"
        >
          <div className="flex w-1/3 flex-col justify-between p-40 text-black05">
            <h3 className="font-inter text-h4 font-bold lg:text-h3">
              {section?.infoBlock?.heading}
            </h3>

            <p className="text-base leading-10 lg:text-lg">
              {section?.infoBlock?.description}
            </p>
            <Link
              className="bottom-0 w-fit"
              href={section?.infoBlock?.buttonLink?.linkUrl || ""}
            >
              <Button
                key={section?.infoBlock?.buttonLink?.id}
                color="default"
                shape="square"
                className="px-0"
                ariaLabel={
                  "Navigate to" + section?.infoBlock?.buttonLink?.linkTitle ||
                  ""
                }
                label={section?.infoBlock?.buttonLink?.linkTitle || ""}
              />
            </Link>
          </div>
          <div className="w-2/3">
            {section?.infoBlock?.image?.responsiveImage && (
              <Image
                objectFit="cover"
                data={section?.infoBlock?.image?.responsiveImage}
                className="w-full"
              />
            )}
          </div>
        </div>
      ))}
    </SectionContainer>
  );
}
