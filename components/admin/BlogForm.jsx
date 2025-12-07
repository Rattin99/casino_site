"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BlogForm = ({ initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    status: "draft",
    featured_image: "",
    category_ids: [],
  });

  useEffect(() => {
    fetchCategories();
    if (initialData) {
      setFormData({
        ...initialData,
        category_ids: initialData.category_ids
          ? initialData.category_ids.split(",").map(Number)
          : [],
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories/read.php");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(Number(options[i].value));
      }
    }
    setFormData((prev) => ({ ...prev, category_ids: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload.php", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, featured_image: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = initialData
      ? "/api/blogs/update.php"
      : "/api/blogs/create.php";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialData ? { ...formData, id: initialData.id } : formData),
      });

      if (res.ok) {
        router.push("/admin-panel/dashboard/blogs");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Slug (Optional)</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="col-span-2">
           <label className="block text-sm font-medium text-gray-700">Featured Image</label>
           <div className="flex items-center gap-4 mt-1">
             <input
               type="file"
               onChange={handleImageUpload}
               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
             />
             {formData.featured_image && (
               <img src={formData.featured_image} alt="Preview" className="h-20 w-20 object-cover rounded" />
             )}
           </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            required
            rows={10}
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            name="excerpt"
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2">
           <label className="block text-sm font-medium text-gray-700">Categories</label>
           <select
             multiple
             name="category_ids"
             value={formData.category_ids}
             onChange={handleCategoryChange}
             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 h-32"
           >
             {categories.map((cat) => (
               <option key={cat.id} value={cat.id}>{cat.name}</option>
             ))}
           </select>
           <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple options.</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
