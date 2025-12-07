"use client";
import React from "react";
import BlogForm from "@/components/admin/BlogForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const CreateBlogPage = () => {
  const { loading: authLoading } = useAdminAuth();

  if (authLoading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      <BlogForm />
    </div>
  );
};

export default CreateBlogPage;
