"use client"; // "use interactive"
import { useQuery } from "@apollo/client";
import { GET_FRONT_PAGE } from "./dato/front-page-query";
import { useProducts } from "./hooks/useProducts";
import SectionContainer from "./components/section-container";

export default function Home() {
  const { loading, error, data } = useQuery(GET_FRONT_PAGE);

  const { products, product, categories, productsByCategory } = useProducts({
    id: 5,
    category: "electronics",
  });

  return (
    <>
      <SectionContainer>
        <div className="h-full bg-green-100">
          <h1>MAIN</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            magna orci, tempor et commodo porttitor, ornare eu ligula. Integer
            iaculis sagittis lectus ut vestibulum. Maecenas venenatis ligula ut
            erat consectetur, sit amet pretium odio facilisis. Vestibulum ut
            tincidunt tellus, eu tempus mi. Phasellus neque quam, vestibulum
            vitae turpis ac, efficitur varius dolor. Donec cursus metus
            vestibulum porttitor fringilla. Morbi libero dui, faucibus at est
            non, aliquet porta nisi. Duis vulputate eros in eros laoreet, sit
            amet tristique turpis cursus. Nullam id erat quis magna finibus
            finibus. Fusce orci nisl, luctus laoreet nunc at, tempor finibus
            diam. Sed non felis auctor, lacinia nisi at, ultrices tortor. Morbi
            sit amet arcu nec est eleifend porttitor. Phasellus blandit, nunc ac
            rutrum blandit, elit lorem vestibulum libero, in blandit dui justo
            et ex. Donec accumsan neque dui, eget aliquet lectus accumsan et.
          </p>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="bg-purple-300 p-20">
          <h2>Products</h2>
          <p>wow</p>
        </div>
      </SectionContainer>
    </>
  );
}
