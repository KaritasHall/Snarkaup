import { StructuredText } from "react-datocms";

interface LandingHeroProps {
  heroTitle: string;
  heroDescription: any;
  heroImage: string;
  heroCta: string;
}

export const LandingHero = ({
  heroTitle,
  heroDescription,
  heroImage,
  heroCta,
}: LandingHeroProps) => {
  // console.log(heroTitle, heroDescription, heroImage, heroCta);
  return (
    <div>
      {/* <h1 className="text-black">{heroTitle}</h1>
      <StructuredText data={heroDescription} /> */}
    </div>
  );
};
