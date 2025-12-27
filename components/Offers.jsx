import React from "react";
import { useSearchParams } from "next/navigation";

const Offers = () => {
  const searchParams = useSearchParams();
  const selectedCountry = searchParams.get("country");

  // Data for Casino Slot Offers
  const casinoOffers = [
    {
      id: 1,
      title: "Baji",
      description: "250 BDT Deposit Bonus",
      label: "CLAIM",
      rating: 5.0,
      logo: "/22bet.png", // Path to logo in public folder
      country: "USA"
    },
    {
      id: 2,
      title: "Mostbet",
      description: "25 000 BDT +250FS For First Deposit",
      label: "CLAIM",
      rating: 5.0,
      logo: "/mostbet.png",
      country: "UK"
    },
    {
      id: 3,
      title: "Betwinner",
      description: "Bonus Up To 16 Lakh + 150 For New Players",
      label: "CLAIM",
      rating: 4.6,
      logo: "/betwinner.png",
      country: "Canada"
    },
    {
      id: 4,
      title: "Parimatch",
      description: "Get 160% Bonus On First Deposit Up To TR 120000",
      label: "CLAIM",
      rating: 4.8,
      logo: "/parimatch.png",
      country: "USA"
    },
  ];

  const filteredOffers = selectedCountry 
    ? casinoOffers.filter(offer => offer.country === selectedCountry)
    : casinoOffers;

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

        {selectedCountry && (
             <div className="text-center mb-6">
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded border border-orange-400">
                    Showing offers for: {selectedCountry}
                </span>
             </div>
        )}

        <div className="space-y-6 flex-col items center">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
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
                <p className="text-gray-400 text-xs text-center mt-1">Available in: {offer.country}</p>
              </div>

              {/* Image and Star Rating (Aligned Vertically) */}
              {/* CLAIM Button */}
              <button className="bg-orange-500 text-white px-12 py-2 rounded-sm">
                {offer.label}
              </button>
            </div>
          ))
          ) : (
             <div className="text-center text-gray-500 py-8">
                No offers available for {selectedCountry}.
             </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Offers;
