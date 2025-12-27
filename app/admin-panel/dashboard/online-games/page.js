"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Trash2, Plus, ExternalLink } from "lucide-react";

const OnlineGamesPage = () => {
  const { loading: authLoading } = useAdminAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch("/api/online-games/read.php");
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      }
    } catch (error) {
      console.error("Failed to fetch games", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this game?")) return;

    try {
      const res = await fetch("/api/online-games/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setGames(games.filter((game) => game.id !== id));
      } else {
        alert("Failed to delete game");
      }
    } catch (error) {
      alert("Error deleting game");
    }
  };

  if (authLoading || loading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Online Games</h1>
        <Link
          href="/admin-panel/dashboard/online-games/create"
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
                Game
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
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
            {games.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No games found.
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        {game.image_url && (
                            <img src={game.image_url} alt="" className="h-8 w-8 mr-3 object-contain rounded" />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                        {game.name}
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {game.country || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {game.url && (
                        <a href={game.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                            Visit <ExternalLink size={14} />
                        </a>
                      )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(game.id)}
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

export default OnlineGamesPage;
