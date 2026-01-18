import BettingOffers from "@/components/BettingOffers";
import Reviews from "@/components/Reviews";
import { Suspense } from "react";
import BettingGames from "@/components/BettingGames";

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading games...</div>}>
        <BettingGames />
      </Suspense>
      <BettingOffers />
      <Reviews />
    </>
  );
};

export default Home;
