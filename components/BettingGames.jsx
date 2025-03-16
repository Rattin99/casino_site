import React from "react";

const BettingGames = () => {
  return (
    <div className="w-full bg-white pb-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 text-center pt-12 relative flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
            Play & Win!
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-800 mt-2">
            Discover exclusive deals on your favorite betting categories
          </p>
          <p className="text-gray-600 max-w-2xl mt-4">
            Explore exclusive offers on casino games, crypto, lottery, and
            sports betting. Dive into our world of free online games – all
            without spending a dime!
          </p>
          <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
              Free Thrills, No Spills!
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
              Exclusive Bonuses
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/casino-hero.png"
            alt="Casino Hero"
            className="w-full max-w-sm md:max-w-md"
          />
        </div>
      </div>

      {/* Online Games Section */}
      <div className="bg-orange-100 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">
            Online Game
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Dive into a world where every click brings new thrills and
            challenges, where the next big win is just a spin away. Whether
            you're a seasoned gamer or a casual player looking for some fun, our
            diverse collection has something for everyone.
          </p>

          {/* Game Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 px-4 md:px-0">
            {[
              { name: "Coin Battles", image: "/game1.png" },
              { name: "Coinflip", image: "/game2.png" },
              { name: "Dice", image: "/game3.png" },
              { name: "Wheel", image: "/game4.png" },
              { name: "Sweet Bonanza", image: "/game5.png" },
            ].map((game, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg flex flex-col items-center text-center"
              >
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
            All Games
          </button>
        </div>
      </div>
    </div>
  );
};

export default BettingGames;
