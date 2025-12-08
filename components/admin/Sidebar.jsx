"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PlusCircle, LogOut } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-orange-500">Admin Panel</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          href="/admin-panel/dashboard"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Content
        </div>
        <Link
          href="/admin-panel/dashboard/blogs"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard/blogs")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <FileText size={20} />
          <span>All Blogs</span>
        </Link>
        <Link
          href="/admin-panel/dashboard/categories"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard/categories")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <FileText size={20} />
          <span>Categories</span>
        </Link>
        <Link
          href="/admin-panel/dashboard/blogs/create"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard/blogs/create")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <PlusCircle size={20} />
          <span>Add New Blog</span>
        </Link>
        <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Offers
        </div>
        <Link
          href="/admin-panel/dashboard/offers"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard/offers")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <FileText size={20} />
          <span>All Offers</span>
        </Link>
        <Link
          href="/admin-panel/dashboard/offers/create"
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            isActive("/admin-panel/dashboard/offers/create")
              ? "bg-orange-600 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          <PlusCircle size={20} />
          <span>Add New Offer</span>
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={async () => {
             await fetch("/api/logout.php");
             window.location.href = "/admin-panel";
          }}
          className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
