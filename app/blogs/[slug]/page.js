"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug);
    }
  }, [slug]);

  const fetchBlogBySlug = async (blogSlug) => {
    try {
      const res = await fetch(
        `/api/blogs/read.php?slug=${blogSlug}&status=published`
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setBlog(data[0]);
        } else {
          setError("Blog not found or not published.");
        }
      } else {
        setError("Failed to fetch blog.");
      }
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-500">Blog not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {blog.featured_image && (
          <div className="relative w-full h-80">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}
        <div className="p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm mb-6">
            <span className="mr-4">
              By <span className="font-semibold">{blog.author_name || "Admin"}</span>
            </span>
            <span>
              Published on{" "}
              <span className="font-semibold">
                {new Date(blog.published_at || blog.created_at).toLocaleDateString()}
              </span>
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.category_names && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.category_names.split(",").map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {category.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
