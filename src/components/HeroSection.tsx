'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-8">
            Find Your Perfect RV
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto font-medium">
            Compare RVs, check maintenance records, and get our exclusive RV Grader Score 
            to make the best decision for your next adventure.
          </p>
          
          {/* Main Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by RV model, brand, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-6 text-xl border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FF5C00] text-white px-10 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold text-lg"
            >
              Search
            </button>
          </form>

          <p className="text-gray-500 text-sm">
            Popular searches: Class A Motorhomes, Travel Trailers, Fifth Wheels
          </p>
        </div>
      </div>
    </section>
  );
}
