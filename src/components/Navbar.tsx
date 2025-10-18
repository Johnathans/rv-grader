'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <span className="text-teal-500 text-3xl font-bold">✓</span>
            </div>
            <Link href="/" className="text-4xl font-black text-black">
              RV Grader
            </Link>
          </div>

          {/* Search Bar - Hidden on homepage */}
          {!isHomepage && (
            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search RV models, brands, or types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-20 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none shadow-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FF5C00] text-white px-4 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-semibold shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Manufacturers Dropdown */}
            <div className="relative group">
              <button className="text-black hover:text-[#FF5C00] transition-colors font-bold text-lg flex items-center">
                Manufacturers
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link href="/manufacturers/class-a" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Class A Motorhomes
                  </Link>
                  <Link href="/manufacturers/class-b" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Class B Motorhomes
                  </Link>
                  <Link href="/manufacturers/class-c" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Class C Motorhomes
                  </Link>
                  <Link href="/manufacturers/travel-trailers" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Travel Trailers
                  </Link>
                  <Link href="/manufacturers/fifth-wheels" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50 last:border-0">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Fifth Wheels
                  </Link>
                  <Link href="/manufacturers/toy-haulers" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Toy Haulers
                  </Link>
                </div>
              </div>
            </div>

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="text-black hover:text-[#FF5C00] transition-colors font-bold text-lg flex items-center">
                Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link href="/compare" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Compare RVs
                  </Link>
                  <Link href="/calculator" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Fuel Cost Calculator
                  </Link>
                  <Link href="/depreciation" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Depreciation Calculator
                  </Link>
                  <Link href="/events" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    RV Shows & Events
                  </Link>
                  <Link href="/brands-to-avoid" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Brands to Avoid
                  </Link>
                  <Link href="/seat-belt-laws" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Seat Belt Laws by State
                  </Link>
                  <Link href="/checklist" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Buying Checklist
                  </Link>
                  <Link href="/maintenance" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Maintenance Guide
                  </Link>
                  <Link href="/warranties" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors border-b border-gray-50">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    Warranty Lookup
                  </Link>
                  <Link href="/scoring" className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 hover:text-[#FF5C00] transition-colors">
                    <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                    RV Grader Score
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
