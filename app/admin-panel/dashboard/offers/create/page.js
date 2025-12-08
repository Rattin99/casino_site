"use client";
import React from "react";
import OfferForm from "@/components/admin/OfferForm";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const CreateOfferPage = () => {
  const { loading: authLoading } = useAdminAuth();

  if (authLoading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Offer</h1>
      <OfferForm />
    </div>
  );
};

export default CreateOfferPage;
