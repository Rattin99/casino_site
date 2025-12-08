import React, { Suspense } from 'react';
import TitleSection from "@/components/TitleSection";
import CasinoOffers from "@/components/CasinoOffers";

const OffersPage = () => {
  const props = {
    title: "Best Offers",
    description:
      "Discover Free Bets, Bonus Spins, Enhanced Odds, And More - All Designed To Elevate Your Free Betting Experience. Find Your Perfect Offer And Take Your Game To The Next Level!",
    image: "/offer-hero.png",
  };
  
  return (
    <>
      <TitleSection
        title={props.title}
        description={props.description}
        image={props.image}
      />
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <CasinoOffers />
      </Suspense>
    </>
  );
};

export default OffersPage;