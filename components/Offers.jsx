import React from "react";

const Offers = () => {
  // Data for Casino Slot Offers
  const casinoOffers = [
    {
      id: 1,
      title: "Baji",
      description: "250 BDT Deposit Bonus",
      label: "CLAIM",
      rating: 5.0,
      logo: "/22bet.png", // Path to logo in public folder
    },
    {
      id: 2,
      title: "Mostbet",
      description: "25 000 BDT +250FS For First Deposit",
      label: "CLAIM",
      rating: 5.0,
      logo: "/mostbet.png",
    },
    {
      id: 3,
      title: "Betwinner",
      description: "Bonus Up To 16 Lakh + 150 For New Players",
      label: "CLAIM",
      rating: 4.6,
      logo: "/betwinner.png",
    },
    {
      id: 4,
      title: "Parimatch",
      description: "Get 160% Bonus On First Deposit Up To TR 120000",
      label: "CLAIM",
      rating: 4.8,
      logo: "/parimatch.png",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 flex justify-center">
      {/* Casino Slot Offers Section */}
      <section className="w-full md:w-4/5">
        <h1 className="text-5xl text-orange-500 font-extrabold text-center mb-6">
          Casino Slot Offers
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Lights, Camera, Casino Action! Give into exclusive offers on your
          favorite slots and table games.
        </p>
        <div className="space-y-6 flex-col items center">
          {casinoOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white w-4/5 sm:w-2/3 mx-auto rounded-lg shadow-md py-8 px-12 flex flex-col sm:flex-row sm:justify-evenly sm:items-center "
            >
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={offer.logo}
                  alt={offer.title}
                  className="w-32 h-24 object-contain"
                />
                <div className="flex flex-col items-center">
                  <span className="text-black text-sm">{offer.title}</span>
                  <div>
                    {Array.from(
                      { length: Math.floor(offer.rating) },
                      (_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <p className="text-gray-700 text-center">{offer.description}</p>
              </div>

              {/* Image and Star Rating (Aligned Vertically) */}
              {/* CLAIM Button */}
              <button className="bg-orange-500 text-white px-12 py-2 rounded-sm">
                {offer.label}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Offers;
