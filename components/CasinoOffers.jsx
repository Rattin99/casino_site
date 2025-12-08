'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const CasinoOffers = () => {
  const searchParams = useSearchParams();
  const offerType = searchParams.get('type');
  
  const [activeTab, setActiveTab] = useState('casino');
  const [state, setState] = useState({
    items: [],
    page: 1,
    limit: 10,
    loading: false,
    hasMore: true
  });

  const tabs = [
    { id: 'casino', name: 'Casino' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'lottery', name: 'Lottery' },
    { id: 'sports', name: 'Sports' }
  ];

  useEffect(() => {
    if (offerType && tabs.find(tab => tab.id === offerType)) {
      setActiveTab(offerType);
    }
  }, [offerType]);

  useEffect(() => {
    setState({
      items: [],
      page: 1,
      limit: 10,
      loading: false,
      hasMore: true
    });
  }, [activeTab]);

  useEffect(() => {
    // Only fetch if we have empty items to avoid duplicates on strict mode or re-renders, 
    // unless we are loading more, which is handled by handleLoadMore
    if (state.items.length === 0) {
      fetchItems();
    }
  }, [state.page, activeTab]);

  function fetchItems() {
    if (state.loading) return; // Prevent multiple requests

    setState(prev => ({ ...prev, loading: true }));

    axios
      .get(`/api/offers/read.php`, {
        params: {
          "category": activeTab,
          "status": "active",
          "page": state.page,
          "limit": state.limit,
          // "country": localStorage.getItem("lang") || "us" // Not used by PHP yet
        }
      })
      .then((response) => {
        const newItems = response.data || [];
        let nextPage = state.page + 1;

        setState(prev => ({
          ...prev,
          items: state.page === 1 ? newItems : [...prev.items, ...newItems],
          page: nextPage,
          loading: false,
          hasMore: newItems.length === prev.limit
        }));
      })
      .catch((error) => {
        console.error('Offer Fetching failed:', error);
        setState(prev => ({ ...prev, loading: false }));
      });
  }

  const handleLoadMore = () => {
    // Just triggering state update will cause effect to run if we depend on page
    // But effect checks items.length === 0.
    // Let's call fetchItems directly for load more.
    fetchItems();
  };

  return (
    <div className="w-full bg-white pb-12">
      <div className="max-w-6xl mx-auto px-4 text-center pt-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
          Unlock Your Winning Edge: <br /> Explore Our Best Offers!
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
          Discover Free Bets, Bonus Spins, Enhanced Odds, And More - All
          Designed To Elevate Your Free Betting Experience. Find Your Perfect
          Offer And Take Your Game To The Next Level!
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mt-8 mb-8 gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 border ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-md border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:text-orange-600 hover:border-orange-400'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Offers List */}
        <div className="space-y-6">
          {state.items.length > 0 ? (
            state.items.map((offer, index) => (
              <div
                                                                key={`${offer.id || index}`}
                                                                className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center hover:shadow-lg transition-shadow"
                                                              >
                                                                {/* Left Section: Logo, Name, Rating */}
                                                                <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                                                                  {offer.company_logo && (
                                                                    <img
                                                                      src={offer.company_logo}
                                                                      alt={offer.company_name || 'Offer'}
                                                                      className="w-20 h-20 object-contain mr-4"
                                                                    />
                                                                  )}
                                                                  <div className="flex flex-col text-left">
                                                                    <h3 className="text-xl font-bold text-gray-800 leading-tight">
                                                                      {offer.company_name || 'Special Offer'}
                                                                    </h3>
                                                                    <div className="flex items-center mt-1">
                                                                      {Array.from({ length: Math.floor(Math.random() * 2) + 4 }, (_, i) => (
                                                                        <span key={i} className="text-yellow-400 text-sm">★</span>
                                                                      ))}
                                                                      <span className="ml-1 text-xs text-gray-500">({(Math.random() * 1).toFixed(1) + 4})</span>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                
                                                                {/* Middle Section: Description */}
                                                                <div className="flex-1 px-4 text-center mb-4 sm:mb-0 w-full sm:w-auto">
                                                                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                                                                    {offer.description || 'Great offer available!'}
                                                                  </p>
                                                                </div>
                                                
                                                                {/* Right Section: Button */}
                                                                <div className="w-full sm:w-auto">
                                                                  <a
                                                                    href={offer.redirect_url || '#'}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors block text-center whitespace-nowrap"
                                                                  >
                                                                    CLAIM BONUS
                                                                  </a>
                                                                </div>
                                                              </div>
            ))
          ) : (
            !state.loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No offers available for {activeTab} at the moment.</p>
                <p className="text-gray-400 text-sm mt-2">Please check back later or try a different category.</p>
              </div>
            )
          )}
        </div>

        {/* Loading State */}
        {state.loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <p className="text-gray-500 mt-2">Loading offers...</p>
          </div>
        )}

        {/* Load More Button */}
        {state.hasMore && !state.loading && state.items.length > 0 && (
          <button
            onClick={handleLoadMore}
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Load More Offers
          </button>
        )}
      </div>

      {/* About Section */}
      <div className="bg-orange-100 mt-12 py-12 text-center px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-600">
          About Us
        </h2>
        <p className="text-lg font-bold text-gray-800 mt-2">
          Free Play. Big Fun. Unleash Your Inner Champion!
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4">
          Your One-Stop Shop For Free Betting Thrills! Explore A World Of
          Exclusive Offers On Casino, Crypto, Lottery, And Sports. Join The
          Action Today!
        </p>
      </div>
    </div>
  );
};

export default CasinoOffers;