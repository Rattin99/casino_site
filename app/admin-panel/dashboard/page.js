"use client";
import React from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Dashboard = () => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Welcome back, {user?.username}!
        </h2>
        <p className="text-gray-500 mt-2">
          Use the sidebar to manage your blogs and categories.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
