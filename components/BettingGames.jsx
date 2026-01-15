"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BettingGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const countryFilter = searchParams.get("country");

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        let url = "/api/online-games/read.php";
        if (countryFilter) {
          url += `?country=${encodeURIComponent(countryFilter)}`;
        }
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setGames(data);
          } else {
            console.error("API response is not an array:", data);
            setGames([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch games", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [countryFilter]);

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

          {countryFilter && (
            <div className="mt-4 text-center">
               <span className="bg-orange-200 text-orange-800 text-sm font-medium px-2.5 py-0.5 rounded border border-orange-400">
                  Showing games for: {countryFilter}
               </span>
            </div>
          )}

          {/* Game Cards */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 px-4 md:px-0">
              {games.slice(0, 10).map((game) => (
                <a
                  key={game.id}
                  href={game.url || "#"}
                  target={game.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="relative bg-gradient-to-b from-purple-600 to-blue-500 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 block"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "100%" }}
                  >
                    {game.image_url ? (
                      <img
                        src={game.image_url}
                        alt={game.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-white font-bold bg-gray-400">
                          {game.name}
                       </div>
                    )}
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-full p-1.5 opacity-90 hover:opacity-100 transition-opacity shadow-lg">
                        <div className="w-6 h-6 flex items-center justify-center pl-1">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          <Link href="/online-game">
            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">
              All Games
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BettingGames;