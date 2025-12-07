import React from "react";

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 10 Strategies for Online Betting",
      excerpt:
        "Master the art of online betting with these proven strategies. Learn how to manage your bankroll and spot the best odds.",
      image: "/game1.png",
      date: "Oct 12, 2023",
      category: "Strategy",
    },
    {
      id: 2,
      title: "The Future of Crypto Casinos",
      excerpt:
        "Cryptocurrency is revolutionizing the online casino industry. Discover the benefits of using Bitcoin and Ethereum for gambling.",
      image: "/crypto.png",
      date: "Oct 15, 2023",
      category: "Crypto",
    },
    {
      id: 3,
      title: "Understanding Casino Odds",
      excerpt:
        "Don't just play blindly. Understand how casino odds work and improve your chances of winning at your favorite games.",
      image: "/casino.png",
      date: "Oct 20, 2023",
      category: "Guides",
    },
    {
      id: 4,
      title: "Safe Gambling Practices",
      excerpt:
        "Gambling should be fun, not a problem. Read our guide on how to gamble responsibly and stay in control.",
      image: "/secure-icon.png",
      date: "Oct 25, 2023",
      category: "Safety",
    },
    {
      id: 5,
      title: "New Game Releases This Month",
      excerpt:
        "Check out the hottest new slot games and table games hitting the online casinos this month. Don't miss out!",
      image: "/new-icon.png",
      date: "Nov 01, 2023",
      category: "News",
    },
    {
      id: 6,
      title: "Mobile Betting: A Comprehensive Guide",
      excerpt:
        "Bet on the go! Learn everything you need to know about mobile betting apps and how to get the best experience on your phone.",
      image: "/platform-icon.png",
      date: "Nov 05, 2023",
      category: "Technology",
    },
  ];

  return (
    <div className="w-full bg-white pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
            Latest Insights & News
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Stay ahead of the game with our latest articles, guides, and updates
            from the world of online betting and casinos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full object-contain"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                  {blog.excerpt}
                </p>
                <button className="text-orange-500 font-bold hover:text-orange-600 self-start mt-auto flex items-center gap-1 transition-colors">
                  Read Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg">
            View All Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
