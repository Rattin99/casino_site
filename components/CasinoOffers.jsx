'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

const CasinoOffers = ({ params }) => {
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
    if (params?.offerType && tabs.find(tab => tab.id === params.offerType)) {
      setActiveTab(params.offerType);
    }
  }, [params]);

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
    if (state.page === 1 && state.items.length === 0) {
      fetchItems();
    }
  }, [state.page, state.items.length, activeTab]);

  function fetchItems() {
    if (state.loading || !state.hasMore) return;

    setState(prev => ({ ...prev, loading: true }));

    axios
      .get(`/api/offers/${activeTab}`, {
        params: {
          "page": state.page,
          "limit": state.limit,
          "country": localStorage.getItem("lang") || "us"
        }
      })
      .then((response) => {
        const newItems = response.data || [];
        let nextPage = state.page + 1;

        setState(prev => ({
          ...prev,
          items: [...prev.items, ...newItems],
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
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  {offer.logo && (
                    <img
                      src={offer.logo}
                      alt={offer.title || 'Offer'}
                      className="w-20 h-16 object-contain mx-auto sm:mx-0"
                    />
                  )}
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold text-gray-800">
                      {offer.title || 'Special Offer'}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {offer.description || offer.desc || 'Great offer available!'}
                    </p>
                    {offer.rating && (
                      <div className="flex justify-center sm:justify-start mt-2">
                        {Array.from({ length: Math.floor(offer.rating) }, (_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        <span className="ml-1 text-sm text-gray-500">({offer.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg mt-4 sm:mt-0 transition-colors">
                  {offer.label || 'CLAIM'}
                </button>
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
