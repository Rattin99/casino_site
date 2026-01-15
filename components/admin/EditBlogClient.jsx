"use client";
import React, { useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { useParams } from "next/navigation";

const EditBlogClient = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (blogId) => {
    try {
      const res = await fetch(`/api/blogs/read.php?id=${blogId}`);
      if (res.ok) {
        const data = await res.json();
        // data might be array or object depending on api
        setBlog(Array.isArray(data) ? data[0] : data);
      }
    } catch (error) {
      console.error("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog</h1>
      </div>
      {blog && <BlogForm initialData={blog} />}
    </div>
  );
};

export default EditBlogClient;
