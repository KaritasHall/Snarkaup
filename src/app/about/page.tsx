"use client";

import SectionContainer from "../components/section-container";
import { useQuery } from "@apollo/client";
import { GET_ABOUT_PAGE } from "../dato/about-page-query";
import { AboutRecord } from "../dato/generated/graphql";
import { Image } from "react-datocms";

export default function AboutPage() {
  const { loading, error, data } = useQuery<{ about: AboutRecord }>(
    GET_ABOUT_PAGE,
  );

  return (
    <SectionContainer>
      <h1 className="mb-12 text-h3 lg:text-h1">{data?.about.heading}</h1>
      <div className="lg:text-wrap flex flex-col gap-12 lg:flex-row-reverse lg:gap-64">
        {data?.about.hero && data?.about.hero.responsiveImage && (
          <Image
            objectFit="cover"
            data={data?.about?.hero?.responsiveImage}
            className="w-full rounded-md"
          />
        )}
        <p className="whitespace-pre-wrap pt-10 text-sm leading-6 lg:w-2/3 lg:text-base">
          {data?.about.description}
        </p>
      </div>
    </SectionContainer>
  );
}
