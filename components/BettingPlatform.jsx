import React from "react";
import Image from "next/image";

const BettingPlatform = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-16">
        {/* Left Side with Image */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <div className="relative rounded-full bg-orange-50 p-8 w-full max-w-md">
            <Image
              src="/meeting.png"
              alt="Team discussing betting strategies"
              width={400}
              height={300}
              layout="responsive"
            />
            <div className="absolute bottom-4 right-4">
              <Image src="/play button.png" alt="Play" width={64} height={64} />
            </div>
          </div>
        </div>

        {/* Right Side with Text */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-orange-500 text-xl font-bold">
            Free Play, Big Wins: We Fuel Your Betting Passion!
          </h2>
          <h3 className="text-gray-800 text-2xl font-bold">
            We're more than just free games - we're your training ground for
            future success!
          </h3>
          <p className="text-gray-600 text-sm">
            Safe, secure, and endlessly entertaining. Explore the world of free
            betting at your own pace. Sharpen your skills, experiment with
            strategies, and unlock a world of free betting possibilities.
            Unleash your inner gaming champion with exclusive offers across
            Casino, Crypto, Lottery, and Sports.
          </p>

          {/* Stats */}
          <div className="flex space-x-16 mt-6">
            <div>
              <h4 className="text-orange-500 text-2xl font-bold">1475+</h4>
              <p className="text-gray-600 text-sm">Premium Offers!</p>
            </div>
            <div>
              <h4 className="text-orange-500 text-2xl font-bold">7/24</h4>
              <p className="text-gray-600 text-sm">Industry Best Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-12">
        <h3 className="text-orange-500 text-xl font-bold mb-4">
          Why Choose Us
        </h3>
        <h2 className="text-gray-800 text-2xl md:text-3xl font-bold mb-4">
          Stop chasing shadows and start winning big!
          <br />
          Here's why you should choose us for your betting adventures!
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore a vast selection of Casino, Crypto, Lottery, and Sports
          betting options. We constantly update our platform with exciting
          games, offers, and features. Sharpen your skills and become a betting
          pro without risking a dime.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image src="/crown.png" alt="Crown icon" width={64} height={64} />{" "}
          </div>
          <h3 className="font-bold text-lg mb-2">Endless Possibilities</h3>
          <p className="text-gray-600 text-sm">
            Get a vast library of free betting options, exclusive offers, and a
            platform built to hone your skills. It's the ultimate free play
            experience!
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image src="/badge.png" alt="Medal icon" width={64} height={64} />{" "}
          </div>
          <h3 className="font-bold text-lg mb-2">Exclusive Deals</h3>
          <p className="text-gray-600 text-sm">
            We source the hottest offers you won't find anywhere else, giving
            you a clear edge over the competition.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/platform-icon.png"
              alt="Platform icon"
              width={64}
              height={64}
            />
          </div>
          <h3 className="font-bold text-lg mb-2">All-In-One Platform</h3>
          <p className="text-gray-600 text-sm">
            Ditch the endless browsing! We've curated everything you need in one
            streamlined platform.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image src="/new-icon.png" alt="New icon" width={64} height={64} />
          </div>
          <h3 className="font-bold text-lg mb-2">Something New</h3>
          <p className="text-gray-600 text-sm">
            We constantly update our platform with exciting games, offers, and
            features.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/games-icon.png"
              alt="Games icon"
              width={64}
              height={64}
            />
          </div>
          <h3 className="font-bold text-lg mb-2">Free Games To Play</h3>
          <p className="text-gray-600 text-sm">
            Take a break from the action and unwind with our collection of fun
            betting games.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/secure-icon.png"
              alt="Security icon"
              width={64}
              height={64}
            />
          </div>
          <h3 className="font-bold text-lg mb-2">Secure And Private</h3>
          <p className="text-gray-600 text-sm">
            We don't collect sensitive private information such as bank
            accounts, which makes your stay with us safe and private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BettingPlatform;
