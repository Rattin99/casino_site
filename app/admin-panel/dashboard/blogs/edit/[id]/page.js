"use client";
import React, { useEffect, useState } from "react";
import BlogForm from "@/components/admin/BlogForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useParams } from "next/navigation";

const EditBlogPage = () => {
  const { loading: authLoading } = useAdminAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/read.php?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          setBlog(data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <div className="p-8">Loading...</div>;
  if (!blog) return <div className="p-8">Blog not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} />
    </div>
  );
};

export default EditBlogPage;
