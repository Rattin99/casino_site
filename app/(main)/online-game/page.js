"use client";
import React, { useEffect, useState } from "react";
import TitleSection from "@/components/TitleSection";

const OnlineGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const props = {
    title: "Online Games",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    image: "/online-hero.png",
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/online-games/read.php");
        if (res.ok) {
          const data = await res.json();
          setGames(data);
        }
      } catch (error) {
        console.error("Failed to fetch games", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="">
      <TitleSection
        title={props.title}
        description={props.description}
        image={props.image}
      />
      {/* Games Grid - Made slimmer with max-width and centered */}
      <div className="w-full bg-orange-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {games.map((game) => (
                <a
                  key={game.id}
                  href={game.url || "#"}
                  target={game.url ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="relative bg-gradient-to-b from-purple-600 to-blue-500 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 block"
                >
                  {/* Reduced size with smaller aspect ratio */}
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
                    
                    {/* Smaller play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-orange-500 rounded-full p-1.5 opacity-90 hover:opacity-100 transition-opacity shadow-lg">
                        <div className="w-6 h-6 flex items-center justify-center pl-1">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Optional: Show name below or overlay? Design didn't have it, but for accessibility alt is there. 
                      The original design didn't have text. I'll stick to original design. 
                   */}
                </a>
              ))}
            </div>
          )}

          {/* Load More Button - Removed as no pagination is implemented yet */}
        </div>
      </div>
    </div>
  );
};

export default OnlineGames;
