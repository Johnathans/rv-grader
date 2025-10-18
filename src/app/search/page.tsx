'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Sample RV data - in a real app, this would come from an API
const sampleRVs = [
  {
    id: 1,
    name: 'Winnebago View 24J',
    brand: 'Winnebago',
    type: 'Class C Motorhomes',
    price: 125000,
    length: 24.5,
    sleeps: 4,
    fairRVScore: 8.5,
    image: '/api/placeholder/300/200',
    features: ['Generator', 'Solar Ready', 'Backup Camera'],
    mpg: 12
  },
  {
    id: 2,
    name: 'Forest River Cherokee 274RK',
    brand: 'Forest River',
    type: 'Travel Trailers',
    price: 35000,
    length: 31.2,
    sleeps: 6,
    fairRVScore: 7.8,
    image: '/api/placeholder/300/200',
    features: ['Kitchen Island', 'Outdoor Kitchen', 'Fireplace'],
    mpg: null
  },
  {
    id: 3,
    name: 'Newmar Dutch Star 4018',
    brand: 'Newmar',
    type: 'Class A Motorhomes',
    price: 450000,
    length: 40.2,
    sleeps: 4,
    fairRVScore: 9.2,
    image: '/api/placeholder/300/200',
    features: ['Washer/Dryer', 'Residential Fridge', 'King Bed'],
    mpg: 8
  },
  {
    id: 4,
    name: 'Airstream Flying Cloud 25FB',
    brand: 'Airstream',
    type: 'Travel Trailers',
    price: 85000,
    length: 25,
    sleeps: 4,
    fairRVScore: 9.0,
    image: '/api/placeholder/300/200',
    features: ['Aluminum Construction', 'Premium Interior', 'Panoramic Window'],
    mpg: null
  },
  {
    id: 5,
    name: 'Grand Design Momentum 376TH',
    brand: 'Grand Design',
    type: 'Toy Haulers',
    price: 75000,
    length: 41.5,
    sleeps: 6,
    fairRVScore: 8.3,
    image: '/api/placeholder/300/200',
    features: ['12ft Garage', 'Fuel Station', 'Ramp Door'],
    mpg: null
  },
  {
    id: 6,
    name: 'Roadtrek Zion',
    brand: 'Roadtrek',
    type: 'Class B Motorhomes',
    price: 180000,
    length: 19.5,
    sleeps: 2,
    fairRVScore: 8.7,
    image: '/api/placeholder/300/200',
    features: ['Lithium Battery', 'Wet Bath', 'Swivel Seats'],
    mpg: 18
  }
];

const rvTypes = ['Class A Motorhomes', 'Class B Motorhomes', 'Class C Motorhomes', 'Travel Trailers', 'Fifth Wheels', 'Toy Haulers'];
const brands = ['Winnebago', 'Forest River', 'Newmar', 'Airstream', 'Grand Design', 'Roadtrek'];
const features = [
  { 
    name: 'Bathroom', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
  },
  { 
    name: 'Kitchen', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  },
  { 
    name: 'Generator', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  },
  { 
    name: 'Solar Ready', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
  },
  { 
    name: 'Washer/Dryer', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
  },
  { 
    name: 'Fireplace', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 4-4 1.657 0 3 .895 3 2 0 1-1 2-1 2s1.5.5 2 2c.5 1.5-.5 3.5-2.5 3.5-1 0-1.5-.5-2-1z" /></svg>
  },
  { 
    name: 'Air Conditioning', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l1.5-1.5L12 19l1.5-1.5L15 19" /></svg>
  },
  { 
    name: 'Awning', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" /></svg>
  },
  { 
    name: 'Slide Out', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
  },
  { 
    name: 'Outdoor Kitchen', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  },
  { 
    name: 'Entertainment Center', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  },
  { 
    name: 'WiFi Ready', 
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /></svg>
  }
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [filteredRVs, setFilteredRVs] = useState(sampleRVs);
  const [filters, setFilters] = useState({
    query: searchParams.get('q') || '',
    type: searchParams.get('category') || '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    minLength: '',
    maxLength: '',
    sleeps: '',
    features: [] as string[]
  });

  useEffect(() => {
    let filtered = sampleRVs;

    // Filter by search query
    if (filters.query) {
      filtered = filtered.filter(rv => 
        rv.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        rv.brand.toLowerCase().includes(filters.query.toLowerCase()) ||
        rv.type.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(rv => rv.type.toLowerCase() === filters.type.toLowerCase());
    }

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(rv => rv.brand === filters.brand);
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(rv => rv.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(rv => rv.price <= parseInt(filters.maxPrice));
    }

    // Filter by length range
    if (filters.minLength) {
      filtered = filtered.filter(rv => rv.length >= parseFloat(filters.minLength));
    }
    if (filters.maxLength) {
      filtered = filtered.filter(rv => rv.length <= parseFloat(filters.maxLength));
    }

    // Filter by sleeping capacity
    if (filters.sleeps) {
      filtered = filtered.filter(rv => rv.sleeps >= parseInt(filters.sleeps));
    }

    setFilteredRVs(filtered);
  }, [filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: searchParams.get('q') || '',
      type: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      minLength: '',
      maxLength: '',
      sleeps: '',
      features: []
    });
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const getDynamicTitle = () => {
    if (filters.query) {
      return `Search Results for "${filters.query}"`;
    }
    
    const parts = [];
    if (filters.type) {
      const typeMap: { [key: string]: string } = {
        'class a motorhomes': 'Class A Motorhomes',
        'class b motorhomes': 'Class B Motorhomes', 
        'class c motorhomes': 'Class C Motorhomes',
        'travel trailers': 'Travel Trailers',
        'fifth wheels': 'Fifth Wheels',
        'toy haulers': 'Toy Haulers'
      };
      parts.push(typeMap[filters.type] || filters.type);
    }
    
    if (filters.brand) {
      parts.push(`by ${filters.brand}`);
    }
    
    if (filters.minPrice || filters.maxPrice) {
      if (filters.minPrice && filters.maxPrice) {
        parts.push(`$${parseInt(filters.minPrice).toLocaleString()} - $${parseInt(filters.maxPrice).toLocaleString()}`);
      } else if (filters.minPrice) {
        parts.push(`Over $${parseInt(filters.minPrice).toLocaleString()}`);
      } else if (filters.maxPrice) {
        parts.push(`Under $${parseInt(filters.maxPrice).toLocaleString()}`);
      }
    }
    
    return parts.length > 0 ? parts.join(' ') : 'All RVs';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-black">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-[#FF5C00] hover:text-[#E64A00] text-sm font-bold transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Popular Selections */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Popular Selections</h3>
              <div className="space-y-3">
                <div 
                  onClick={() => handleFilterChange('type', 'travel trailers')}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-[#FF5C00] transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#FF5C00] transition-colors">Travel Trailers</h4>
                      <p className="text-xs text-gray-600">Most popular category</p>
                    </div>
                    <div className="w-8 h-8 bg-[#FF5C00] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleFilterChange('type', 'class c motorhomes')}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-[#FF5C00] transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#FF5C00] transition-colors">Class C Motorhomes</h4>
                      <p className="text-xs text-gray-600">Great for families</p>
                    </div>
                    <div className="w-8 h-8 bg-[#FF5C00] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => handleFilterChange('type', 'class b motorhomes')}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-[#FF5C00] transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-[#FF5C00] transition-colors">Class B Motorhomes</h4>
                      <p className="text-xs text-gray-600">Compact & efficient</p>
                    </div>
                    <div className="w-8 h-8 bg-[#FF5C00] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RV Type Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">RV Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
              >
                <option value="">All Types</option>
                {rvTypes.map(type => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Price Range</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Length Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Length (ft)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minLength}
                  onChange={(e) => handleFilterChange('minLength', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxLength}
                  onChange={(e) => handleFilterChange('maxLength', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Sleeping Capacity */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Minimum Sleeps</label>
              <select
                value={filters.sleeps}
                onChange={(e) => handleFilterChange('sleeps', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent bg-white shadow-sm font-medium"
              >
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="4">4+</option>
                <option value="6">6+</option>
                <option value="8">8+</option>
              </select>
            </div>

            {/* Features */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Features</label>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <button
                    key={feature.name}
                    onClick={() => toggleFeature(feature.name)}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                      filters.features.includes(feature.name)
                        ? 'border-[#FF5C00] bg-[#FF5C00] text-white shadow-md'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-[#FF5C00] hover:bg-orange-50'
                    }`}
                  >
                    <span className="mr-2">{feature.icon}</span>
                    <span className="text-xs font-medium text-center leading-tight">{feature.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-black mb-2">
              {getDynamicTitle()}
            </h1>
            <p className="text-gray-600 font-medium">{filteredRVs.length} RVs found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRVs.map((rv) => (
              <div key={rv.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">RV Image</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-black hover:text-primary">
                      <Link href={`/rv/${rv.id}`}>
                        {rv.name}
                      </Link>
                    </h3>
                    <div className="flex items-center bg-[#FF5C00] text-white px-2 py-1 rounded-md text-sm font-bold">
                      {rv.fairRVScore}/10
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{rv.type}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium ml-1">${rv.price.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Length:</span>
                      <span className="font-medium ml-1">{rv.length} ft</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sleeps:</span>
                      <span className="font-medium ml-1">{rv.sleeps}</span>
                    </div>
                    {rv.mpg && (
                      <div>
                        <span className="text-gray-500">MPG:</span>
                        <span className="font-medium ml-1">{rv.mpg}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {rv.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={`/rv/${rv.id}`}
                      className="flex-1 bg-[#FF5C00] text-white text-center py-2 rounded-md hover:bg-[#E64A00] transition-colors font-bold"
                    >
                      View Details
                    </Link>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRVs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No RVs found matching your criteria</p>
              <button
                onClick={clearFilters}
                className="bg-[#FF5C00] text-white px-6 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
