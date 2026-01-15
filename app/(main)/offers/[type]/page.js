import { Suspense } from "react";
import TitleSection from "@/components/TitleSection";
import CasinoOffers from "@/components/CasinoOffers";

export async function generateStaticParams() {
  const validTypes = ['casino', 'crypto', 'lottery', 'sports'];
  return validTypes.map((type) => ({
    type: type,
  }));
}

const DynamicOffersPage = ({ params }) => {
  const offerType = params.type;
  
  // Validate offer type
  const validTypes = ['casino', 'crypto', 'lottery', 'sports'];
  const currentType = validTypes.includes(offerType) ? offerType : 'casino';
  
  const props = {
    title: `${currentType.charAt(0).toUpperCase() + currentType.slice(1)} Offers`,
    description: `Discover the best ${currentType} offers and deals. Find exclusive bonuses, promotions, and special deals tailored for ${currentType} enthusiasts.`,
    image: "/offer-hero.png",
  };
  
  return (
    <>
      <TitleSection
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <Suspense fallback={<div>Loading offers...</div>}>
        <CasinoOffers params={{ offerType: currentType }} />
      </Suspense>
    </>
  );
};

export default DynamicOffersPage;
