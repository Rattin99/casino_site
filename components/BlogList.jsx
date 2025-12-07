"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs/read.php?status=published");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white pb-12 flex justify-center pt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

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

        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No articles found. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {blog.featured_image ? (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/logo.png"
                      alt="Placeholder"
                      className="h-16 opacity-50"
                    />
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {blog.category_names
                        ? blog.category_names.split(",")[0]
                        : "General"}
                    </span>
                    <span>
                      {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="text-orange-500 font-bold hover:text-orange-600 self-start mt-auto flex items-center gap-1 transition-colors"
                  >
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
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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