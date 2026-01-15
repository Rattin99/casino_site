"use client";
import React from "react";
import OnlineGameForm from "@/components/admin/OnlineGameForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const CreateOnlineGamePage = () => {
  const { loading: authLoading } = useAdminAuth();

  if (authLoading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Online Game</h1>
      <OnlineGameForm />
    </div>
  );
};

export default CreateOnlineGamePage;
