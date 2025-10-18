'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [distance, setDistance] = useState('');
  const [mpg, setMpg] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [fuelType, setFuelType] = useState('gasoline');
  const [rvType, setRvType] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // RV MPG estimates by type
  const rvMpgEstimates = {
    'class-a-gas': { min: 6, max: 10, avg: 8 },
    'class-a-diesel': { min: 8, max: 12, avg: 10 },
    'class-b': { min: 15, max: 25, avg: 20 },
    'class-c': { min: 8, max: 14, avg: 11 },
    'travel-trailer': { min: 12, max: 18, avg: 15 },
    'fifth-wheel': { min: 8, max: 12, avg: 10 },
    'toy-hauler': { min: 7, max: 11, avg: 9 }
  };

  const handleRvTypeChange = (type: string) => {
    setRvType(type);
    if (type && rvMpgEstimates[type as keyof typeof rvMpgEstimates]) {
      setMpg(rvMpgEstimates[type as keyof typeof rvMpgEstimates].avg.toString());
    }
  };

  const calculateFuelCost = () => {
    const distanceNum = parseFloat(distance);
    const mpgNum = parseFloat(mpg);
    const priceNum = parseFloat(fuelPrice);

    if (distanceNum && mpgNum && priceNum) {
      const gallonsNeeded = distanceNum / mpgNum;
      const totalCost = gallonsNeeded * priceNum;
      setResult(totalCost);
    }
  };

  const resetCalculator = () => {
    setDistance('');
    setMpg('');
    setFuelPrice('');
    setFuelType('gasoline');
    setRvType('');
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          RV Fuel Cost Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Plan your RV adventure with confidence. Calculate fuel costs for your trip based on 
          your RV's efficiency, trip distance, and current fuel prices.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Calculate Your Trip Fuel Cost</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* RV Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                RV Type (Optional - Auto-fills MPG estimate)
              </label>
              <select
                value={rvType}
                onChange={(e) => handleRvTypeChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              >
                <option value="">Select RV Type</option>
                <option value="class-a-gas">Class A Motorhome (Gas)</option>
                <option value="class-a-diesel">Class A Motorhome (Diesel)</option>
                <option value="class-b">Class B Motorhome (Van)</option>
                <option value="class-c">Class C Motorhome</option>
                <option value="travel-trailer">Travel Trailer</option>
                <option value="fifth-wheel">Fifth Wheel</option>
                <option value="toy-hauler">Toy Hauler</option>
              </select>
            </div>

            {/* Trip Distance */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Trip Distance (miles)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Enter total miles"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              />
            </div>

            {/* Fuel Efficiency */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Efficiency (MPG)
              </label>
              <input
                type="number"
                step="0.1"
                value={mpg}
                onChange={(e) => setMpg(e.target.value)}
                placeholder="Miles per gallon"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              />
              {rvType && rvMpgEstimates[rvType as keyof typeof rvMpgEstimates] && (
                <p className="text-sm text-gray-600 mt-1">
                  Typical range: {rvMpgEstimates[rvType as keyof typeof rvMpgEstimates].min}-{rvMpgEstimates[rvType as keyof typeof rvMpgEstimates].max} MPG
                </p>
              )}
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              >
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
              </select>
            </div>

            {/* Fuel Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Price (per gallon)
              </label>
              <input
                type="number"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="$4.50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-600 mt-1">
                Check current prices at{' '}
                <a href="https://gasprices.aaa.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF5C00] hover:underline">
                  AAA Gas Prices
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateFuelCost}
                className="flex-1 bg-[#FF5C00] text-white px-6 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
              >
                Calculate Cost
              </button>
              <button
                onClick={resetCalculator}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-4">Trip Cost Breakdown</h3>
            
            {result !== null ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#FF5C00] mb-2">
                      ${result.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Total Fuel Cost</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Distance:</span>
                    <span className="font-medium">{distance} miles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Efficiency:</span>
                    <span className="font-medium">{mpg} MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Price:</span>
                    <span className="font-medium">${fuelPrice}/gallon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gallons Needed:</span>
                    <span className="font-medium">{(parseFloat(distance) / parseFloat(mpg)).toFixed(1)} gallons</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Add 10-15% buffer for unexpected detours, traffic, or varying driving conditions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">⛽</div>
                <p>Enter your trip details to calculate fuel costs</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RV Fuel Efficiency Guide */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">RV Fuel Efficiency Guide</h2>
        <p className="text-gray-600 mb-6">
          Don't know your RV's fuel efficiency? Use these typical ranges as a starting point. 
          Actual mileage varies based on driving conditions, RV weight, and maintenance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(rvMpgEstimates).map(([type, data]) => {
            const typeNames = {
              'class-a-gas': 'Class A Gas',
              'class-a-diesel': 'Class A Diesel',
              'class-b': 'Class B Van',
              'class-c': 'Class C',
              'travel-trailer': 'Travel Trailer',
              'fifth-wheel': 'Fifth Wheel',
              'toy-hauler': 'Toy Hauler'
            };
            
            return (
              <div key={type} className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2">
                  {typeNames[type as keyof typeof typeNames]}
                </h3>
                <div className="text-2xl font-bold text-[#FF5C00] mb-1">
                  {data.min}-{data.max} MPG
                </div>
                <div className="text-sm text-gray-600">
                  Average: {data.avg} MPG
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Fuel Saving Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Driving Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Maintain steady speeds between 55-65 mph</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Avoid rapid acceleration and hard braking</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Use cruise control on highways when possible</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Plan routes to avoid heavy traffic and hills</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Maintenance Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Keep tires properly inflated</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Regular engine tune-ups and oil changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Remove unnecessary weight and cargo</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Check and replace air filters regularly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-black mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              How accurate is this RV fuel calculator?
            </h3>
            <p className="text-gray-700">
              Our calculator provides estimates based on the information you provide. Actual fuel consumption 
              can vary by 10-20% depending on driving conditions, weather, RV weight, and maintenance. 
              We recommend adding a 15% buffer to your calculations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Should I use different calculations for diesel vs gas RVs?
            </h3>
            <p className="text-gray-700">
              Yes, diesel RVs typically get better fuel efficiency but diesel fuel costs more per gallon. 
              Our calculator accounts for both fuel type pricing and the different efficiency ranges. 
              Diesel RVs generally get 20-30% better mileage than gas equivalents.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              How do I find current fuel prices for my route?
            </h3>
            <p className="text-gray-700">
              Check AAA Gas Prices, GasBuddy, or fuel station apps for current pricing. For long trips, 
              use an average price along your route as fuel costs can vary significantly by region. 
              Rural areas and highways typically have higher prices.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              What factors affect RV fuel efficiency the most?
            </h3>
            <p className="text-gray-700">
              The biggest factors are RV size/weight, driving speed, terrain, and weather conditions. 
              Headwinds, hills, and stop-and-go traffic significantly reduce efficiency. Proper maintenance, 
              tire pressure, and driving habits can improve mileage by 10-15%.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-4">Ready to plan your RV adventure?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Now that you know your fuel costs, explore our RV database to find the perfect 
          motorhome or trailer for your next journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/compare"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Compare RVs
          </Link>
          <Link 
            href="/blog"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Read RV Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
