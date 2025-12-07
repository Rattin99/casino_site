import TitleSection from "@/components/TitleSection";
import CasinoOffers from "@/components/CasinoOffers";

const OffersPage = ({ searchParams }) => {
  const props = {
    title: "Best Offers",
    description:
      "Discover Free Bets, Bonus Spins, Enhanced Odds, And More - All Designed To Elevate Your Free Betting Experience. Find Your Perfect Offer And Take Your Game To The Next Level!",
    image: "/offer-hero.png",
  };
  
  // Extract offer type from search params (e.g., /offers?type=casino)
  const offerType = searchParams?.type || 'casino';
  
  return (
    <>
      <TitleSection
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <CasinoOffers params={{ offerType }} />
    </>
  );
};

export default OffersPage;
