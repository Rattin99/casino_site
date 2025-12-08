"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const OfferForm = ({ initialData = null }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    category: "",
    company_name: "",
    company_logo: "",
    description: "",
    redirect_url: "",
    status: "active",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setFormData((prev) => ({ ...prev, company_logo: data.url }));
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
      ? "/api/offers/update.php"
      : "/api/offers/create.php"; // update.php not created yet, but preparing for it.

    // If update.php doesn't exist, this will fail for updates, but right now we focus on create.
    if (initialData && !url.includes("update")) {
         // Placeholder for update logic if I were to add it now
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(initialData ? { ...formData, id: initialData.id } : formData),
      });

      if (res.ok) {
        router.push("/admin-panel/dashboard/offers");
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
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="company_name"
            required
            value={formData.company_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Casino, Sport, Crypto"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
          <input
            type="url"
            name="redirect_url"
            required
            value={formData.redirect_url}
            onChange={handleChange}
            placeholder="https://example.com/offer"
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <div className="col-span-2">
           <label className="block text-sm font-medium text-gray-700">Company Logo</label>
           <div className="flex items-center gap-4 mt-1">
             <input
               type="file"
               onChange={handleImageUpload}
               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
             />
             {formData.company_logo && (
               <img src={formData.company_logo} alt="Preview" className="h-20 w-20 object-contain rounded border" />
             )}
           </div>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Offer"}
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
