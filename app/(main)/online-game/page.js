import React from "react";
import Image from "next/image";
import TitleSection from "@/components/TitleSection";

const OnlineGames = () => {
  // Generate sequential game image paths
  const games = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    image: `/game${index + 1}.png`,
  }));

  const props = {
    title: "Online Games",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal",
    image: "/online-hero.png",
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="relative bg-gradient-to-b from-purple-600 to-blue-500 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              >
                {/* Reduced size with smaller aspect ratio */}
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "100%" }}
                >
                  <Image
                    src={game.image}
                    alt={`Game ${game.id}`}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 768px) 28vw, (max-width: 1024px) 20vw, 16vw"
                    className="rounded-lg object-cover"
                  />
                  {/* Smaller play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-orange-500 rounded-full p-1.5 opacity-90">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-8 rounded-md transition-colors">
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineGames;
