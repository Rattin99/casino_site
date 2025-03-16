import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming your Shadcn UI Card components are in this path

const Reviews = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Reviews
        </h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
          {/* Review 1 */}
          <Card className="w-full bg-orange-500 text-white md:w-80 h-96">
            <CardHeader className="p-4 flex items-center">
              <img
                className="h-12 w-12 rounded-full mr-4"
                src="/user.jpg" // Replace with your image path
                alt="John S."
              />
              <div>
                <CardTitle className="text-lg font-semibold">John S.</CardTitle>
                <CardDescription className="text-sm text-white">
                  Sports Fan
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm mb-4">
                This website is a lifesaver for casino lovers like me! I can
                play all my favorite slots and table games, which is amazing.
                They also have some really cool exclusive bonuses that give you
                extra spins or chips to play with. It's a great way to relax and
                have some fun!
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs">2 hour ago</p>
              </div>
            </CardContent>
          </Card>

          {/* Review 2 (Middle - Taller) */}
          <Card className="w-full bg-orange-500 text-white md:w-80 h-[400px]">
            <CardHeader className="p-4 flex items-center">
              <img
                className="h-12 w-12 rounded-full mr-4"
                src="/user.jpg" // Replace with your image path
                alt="John S."
              />
              <div>
                <CardTitle className="text-lg font-semibold">John S.</CardTitle>
                <CardDescription className="text-sm text-white">
                  Sports Fan
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm mb-4">
                This website is a lifesaver for casino lovers like me! I can
                play all my favorite slots and table games, which is amazing.
                They also have some really cool exclusive bonuses that give you
                extra spins or chips to play with. It's a great way to relax and
                have some fun!
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs">2 hour ago</p>
              </div>
            </CardContent>
          </Card>

          {/* Review 3 */}
          <Card className="w-full bg-orange-500 text-white md:w-80 h-96">
            <CardHeader className="p-4 flex items-center">
              <img
                className="h-12 w-12 rounded-full mr-4"
                src="/user.jpg" // Replace with your image path
                alt="John S."
              />
              <div>
                <CardTitle className="text-lg font-semibold">John S.</CardTitle>
                <CardDescription className="text-sm text-white">
                  Sports Fan
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm mb-4">
                This website is a lifesaver for casino lovers like me! I can
                play all my favorite slots and table games, which is amazing.
                They also have some really cool exclusive bonuses that give you
                extra spins or chips to play with. It's a great way to relax and
                have some fun!
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs">2 hour ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          <button className="h-2 w-4 rounded-full bg-gray-300"></button>
          <button className="h-2 w-4 rounded-full bg-orange-500"></button>
          <button className="h-2 w-4 rounded-full bg-gray-300"></button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
