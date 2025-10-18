'use client';

import { useState } from 'react';
import Link from 'next/link';

// Sample RV data for comparison
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
    mpg: 12,
    engine: 'Mercedes-Benz 3.0L V6 Turbo Diesel',
    freshWater: 44,
    warranty: '3 years structural',
    features: ['Generator', 'Solar Ready', 'Backup Camera']
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
    mpg: null,
    engine: 'N/A (Towable)',
    freshWater: 43,
    warranty: '2 years structural',
    features: ['Kitchen Island', 'Outdoor Kitchen', 'Fireplace']
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
    mpg: 8,
    engine: 'Caterpillar C7 350HP',
    freshWater: 100,
    warranty: '5 years structural',
    features: ['Washer/Dryer', 'Residential Fridge', 'King Bed']
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
    mpg: null,
    engine: 'N/A (Towable)',
    freshWater: 39,
    warranty: '3 years structural',
    features: ['Aluminum Construction', 'Premium Interior', 'Panoramic Window']
  }
];

export default function ComparePage() {
  const [selectedRVs, setSelectedRVs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRVs = sampleRVs.filter(rv =>
    rv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rv.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRVSelection = (rvId: number) => {
    if (selectedRVs.includes(rvId)) {
      setSelectedRVs(selectedRVs.filter(id => id !== rvId));
    } else if (selectedRVs.length < 3) {
      setSelectedRVs([...selectedRVs, rvId]);
    }
  };

  const selectedRVData = selectedRVs.map(id => sampleRVs.find(rv => rv.id === id)!);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black mb-4">Compare RVs</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Select up to 3 RVs to compare their features, specifications, and Fair RV scores side by side
        </p>
      </div>

      {/* RV Selection */}
      <div className="mb-12">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search RVs to compare..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredRVs.map((rv) => (
            <div
              key={rv.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedRVs.includes(rv.id)
                  ? 'border-[#FF5C00] bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRVSelection(rv.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{rv.name}</h3>
                <div className="flex items-center">
                  {selectedRVs.includes(rv.id) && (
                    <span className="text-teal-500 text-sm font-bold">✓</span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{rv.brand} • {rv.type}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">${rv.price.toLocaleString()}</span>
                <span className="bg-[#FF5C00] text-white px-2 py-1 rounded text-xs font-bold">
                  {rv.fairRVScore}/10
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Selected: {selectedRVs.length}/3 RVs
        </p>
      </div>

      {/* Comparison Table */}
      {selectedRVData.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Specification</th>
                  {selectedRVData.map((rv) => (
                    <th key={rv.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900 min-w-48">
                      <div>
                        <p className="font-semibold">{rv.name}</p>
                        <p className="text-xs text-gray-500 font-normal">{rv.brand}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Fair RV Score</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center">
                      <span className="bg-[#FF5C00] text-white px-3 py-1 rounded-full text-sm font-black">
                        {rv.fairRVScore}/10
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm font-semibold">
                      ${rv.price.toLocaleString()}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Type</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.type}
                    </td>
                  ))}
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Length</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.length} ft
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Sleeps</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.sleeps} people
                    </td>
                  ))}
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">MPG</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.mpg || 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Engine</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.engine}
                    </td>
                  ))}
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Fresh Water</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.freshWater} gal
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Warranty</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      {rv.warranty}
                    </td>
                  ))}
                </tr>
                <tr className="bg-orange-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Key Features</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center text-sm">
                      <div className="space-y-1">
                        {rv.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="text-xs bg-orange-100 px-2 py-1 rounded">
                            {feature}
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Actions</td>
                  {selectedRVData.map((rv) => (
                    <td key={rv.id} className="px-6 py-4 text-center">
                      <div className="space-y-2">
                        <Link
                          href={`/rv/${rv.id}`}
                          className="block bg-[#FF5C00] text-white px-4 py-2 rounded-md hover:bg-[#E64A00] transition-colors text-sm font-bold"
                        >
                          View Details
                        </Link>
                        <button className="block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                          Get Quote
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedRVData.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg mb-4">Select RVs above to start comparing</p>
          <p className="text-gray-400">Choose up to 3 RVs to see a detailed side-by-side comparison</p>
        </div>
      )}
    </div>
  );
}
