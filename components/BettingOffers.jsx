import React from "react";

const BettingOffers = () => {
  return (
    <div className="w-full bg-white pb-12">
      {/* Offers Section */}
      <div className="max-w-6xl mx-auto px-4 text-center pt-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
          Unlock Your Winning Edge: <br /> Explore Our Best Offers!
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Discover Free Bets, Bonus Spins, Enhanced Odds, And More - All
          Designed To Elevate Your Free Betting Experience. Find Your Perfect
          Offer And Take Your Game To The Next Level!
        </p>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            {
              name: "Crypto",
              image: "/crypto.png",
              desc: "Ride the crypto wave! Enjoy exclusive offers for your favorite coins.",
            },
            {
              name: "Casino",
              image: "/casino.png",
              desc: "Lights, camera, casino action! Enjoy special deals on your favorite games.",
            },
            {
              name: "Sports",
              image: "/sports.png",
              desc: "Dominate the odds! Unleash your game with action-packed sports betting offers.",
            },
            {
              name: "Lottery",
              image: "/lotto.png",
              desc: "Your lottery fun trip has it all! Latest Scratchings Virtual & Instant!",
            },
          ].map((offer, index) => (
            <div
              key={index}
              className="bg-orange-500 relative py-24 px-8 rounded-lg text-white flex flex-col items-start text-left"
            >
              <h2 className="text-3xl text-left font-bold">{offer.name}</h2>
              <p className="mt-2 w-2/3  text-md">{offer.desc}</p>
              <div className="absolute bottom-[-10] right-[-10]">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
          View All
        </button>
      </div>

      {/* About Section */}
      <div className="bg-orange-100 mt-12 py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">
          About Us
        </h2>
        <p className="text-lg font-bold text-gray-800 mt-2">
          Free Play. Big Fun. Unleash Your Inner Champion!
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4">
          Your One-Stop Shop For Free Betting Thrills! Explore A World Of
          Exclusive Offers On Casino, Crypto, Lottery, And Sports. Join The
          Action Today!
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-3xl mx-auto">
          {[
            { name: "Instant Claim", icon: "/file.png" },
            { name: "Exclusive Deals", icon: "/relationship.png" },
            { name: "Play And Get Win", icon: "/success.png" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={feature.icon}
                alt={feature.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-lg font-bold text-orange-600">
                {feature.name}
              </p>
            </div>
          ))}
        </div>

        <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default BettingOffers;
