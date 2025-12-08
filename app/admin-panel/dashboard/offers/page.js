"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Trash2, Plus, ExternalLink } from "lucide-react";

const OffersPage = () => {
  const { loading: authLoading } = useAdminAuth();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetch("/api/offers/read.php");
      if (res.ok) {
        const data = await res.json();
        setOffers(data);
      }
    } catch (error) {
      console.error("Failed to fetch offers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;

    try {
      const res = await fetch("/api/offers/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setOffers(offers.filter((offer) => offer.id !== id));
      } else {
        alert("Failed to delete offer");
      }
    } catch (error) {
      alert("Error deleting offer");
    }
  };

  if (authLoading || loading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Offers</h1>
        <Link
          href="/admin-panel/dashboard/offers/create"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add New</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No offers found.
                </td>
              </tr>
            ) : (
              offers.map((offer) => (
                <tr key={offer.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        {offer.company_logo && (
                            <img src={offer.company_logo} alt="" className="h-8 w-8 mr-3 object-contain rounded" />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                        {offer.company_name}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {offer.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        offer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : offer.status === "inactive" 
                            ? "bg-gray-100 text-gray-800" 
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={offer.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                          Visit <ExternalLink size={14} />
                      </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Edit is not implemented yet, so hiding it or could add link later */}
                    <button
                      onClick={() => handleDelete(offer.id)}
                      className="text-red-600 hover:text-red-900 inline-block"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OffersPage;
