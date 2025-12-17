import BettingOffers from "@/components/BettingOffers";
import Reviews from "@/components/Reviews";

const { default: BettingGames } = require("@/components/BettingGames");

const Home = () => {
  return (
    <>
      <BettingGames />
      <BettingOffers />
      <Reviews />
    </>
  );
};

export default Home;
