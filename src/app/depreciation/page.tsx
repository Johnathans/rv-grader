'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DepreciationPage() {
  const [purchasePrice, setPurchasePrice] = useState('');
  const [rvType, setRvType] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [result, setResult] = useState<{currentValue: number, totalDepreciation: number, depreciationPercent: number} | null>(null);

  // Depreciation rates by RV type and age (combined data from both sources)
  const depreciationRates = {
    'class-a': {
      1: 20, 2: 25, 3: 27, 4: 30, 5: 35, 6: 40, 7: 45, 8: 50, 9: 55, 10: 60, 
      11: 65, 12: 68, 13: 70, 14: 72, 15: 74, 16: 76, 17: 78, 18: 80, 19: 82, 20: 85
    },
    'class-b': {
      1: 22, 2: 28, 3: 33, 4: 38, 5: 49, 6: 52, 7: 55, 8: 58, 9: 60, 10: 62,
      11: 64, 12: 66, 13: 68, 14: 70, 15: 72, 16: 74, 17: 76, 18: 78, 19: 80, 20: 82
    },
    'class-c': {
      1: 18, 2: 22, 3: 27, 4: 32, 5: 38, 6: 42, 7: 46, 8: 48, 9: 50, 10: 52,
      11: 54, 12: 56, 13: 58, 14: 60, 15: 62, 16: 64, 17: 66, 18: 68, 19: 70, 20: 72
    },
    'travel-trailer': {
      1: 21, 2: 23, 3: 25, 4: 30, 5: 37, 6: 39, 7: 41, 8: 43, 9: 44, 10: 45,
      11: 50, 12: 55, 13: 60, 14: 65, 15: 70, 16: 73, 17: 76, 18: 79, 19: 82, 20: 85
    },
    'fifth-wheel': {
      1: 19, 2: 22, 3: 25, 4: 28, 5: 37, 6: 40, 7: 43, 8: 46, 9: 48, 10: 45,
      11: 48, 12: 52, 13: 58, 14: 62, 15: 66, 16: 68, 17: 70, 18: 72, 19: 74, 20: 76
    },
    'toy-hauler': {
      1: 20, 2: 26, 3: 30, 4: 35, 5: 40, 6: 45, 7: 50, 8: 54, 9: 58, 10: 50,
      11: 55, 12: 60, 13: 65, 14: 68, 15: 71, 16: 74, 17: 76, 18: 78, 19: 80, 20: 82
    }
  };

  const calculateDepreciation = () => {
    const price = parseFloat(purchasePrice);
    const years = parseInt(ageYears);

    if (price && rvType && years && years <= 20) {
      const rates = depreciationRates[rvType as keyof typeof depreciationRates];
      const depreciationPercent = rates[years as keyof typeof rates] || 0;
      const totalDepreciation = (price * depreciationPercent) / 100;
      const currentValue = price - totalDepreciation;

      setResult({
        currentValue,
        totalDepreciation,
        depreciationPercent
      });
    }
  };

  const resetCalculator = () => {
    setPurchasePrice('');
    setRvType('');
    setAgeYears('');
    setResult(null);
  };

  // Depreciation table data
  const tableData = [
    { type: 'Class A Motorhome', year1: '20%', year3: '27%', year5: '35%', year10: '60%', avgPrice: '$120,000' },
    { type: 'Class B Motorhome', year1: '22%', year3: '33%', year5: '49%', year10: '62%', avgPrice: '$85,000' },
    { type: 'Class C Motorhome', year1: '18%', year3: '27%', year5: '38%', year10: '52%', avgPrice: '$80,000' },
    { type: 'Travel Trailer', year1: '21%', year3: '25%', year5: '37%', year10: '45%', avgPrice: '$25,000' },
    { type: 'Fifth Wheel', year1: '19%', year3: '25%', year5: '37%', year10: '45%', avgPrice: '$50,000' },
    { type: 'Toy Hauler', year1: '20%', year3: '30%', year5: '40%', year10: '50%', avgPrice: '$45,000' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          RV Depreciation Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Understand your RV's current market value and depreciation over time. 
          Make informed decisions about buying, selling, or trading your recreational vehicle.
        </p>
      </div>

      {/* Calculator */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Calculate Your RV's Current Value</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Original Purchase Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Purchase Price
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="$75,000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-600 mt-1">
                Enter the price you paid (not MSRP)
              </p>
            </div>

            {/* RV Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                RV Type
              </label>
              <select
                value={rvType}
                onChange={(e) => setRvType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              >
                <option value="">Select RV Type</option>
                <option value="class-a">Class A Motorhome</option>
                <option value="class-b">Class B Motorhome (Van)</option>
                <option value="class-c">Class C Motorhome</option>
                <option value="travel-trailer">Travel Trailer</option>
                <option value="fifth-wheel">Fifth Wheel</option>
                <option value="toy-hauler">Toy Hauler</option>
              </select>
            </div>

            {/* Age in Years */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age of RV (Years)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                placeholder="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
              />
              <p className="text-sm text-gray-600 mt-1">
                Maximum 20 years
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={calculateDepreciation}
                className="flex-1 bg-[#FF5C00] text-white px-6 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
              >
                Calculate Value
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
            <h3 className="text-lg font-bold text-black mb-4">Depreciation Analysis</h3>
            
            {result !== null ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-black text-[#FF5C00] mb-2">
                      ${result.currentValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Estimated Current Value</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Original Price:</span>
                      <span className="font-bold">${parseFloat(purchasePrice).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Depreciation:</span>
                      <span className="font-bold">-${result.totalDepreciation.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Depreciation Rate:</span>
                      <span className="font-bold">{result.depreciationPercent}%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> This is an estimate based on market averages. 
                    Actual value depends on condition, maintenance, brand, and market demand.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>Enter your RV details to see depreciation analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Depreciation Rates Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">RV Depreciation Rates by Type</h2>
        <p className="text-gray-600 mb-6">
          Average depreciation percentages based on market analysis of over 250 RVs across different brands, 
          states, and price points. These rates represent typical market conditions.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">RV Type</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Avg. New Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">1 Year</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">3 Years</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">5 Years</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">10 Years</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-center font-medium">{row.avgPrice}</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-900">{row.year1}</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-900">{row.year3}</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-900">{row.year5}</td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-gray-900">{row.year10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Understanding RV Depreciation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Understanding RV Depreciation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">What Affects Depreciation?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-gray-900">Brand Reputation:</strong>
                  <span className="text-gray-700 ml-1">Premium brands like Airstream depreciate slower</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-gray-900">Market Demand:</strong>
                  <span className="text-gray-700 ml-1">Popular models retain value better</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-gray-900">Condition & Maintenance:</strong>
                  <span className="text-gray-700 ml-1">Well-maintained RVs depreciate slower</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-gray-900">Usage History:</strong>
                  <span className="text-gray-700 ml-1">Private ownership vs rental history</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <div>
                  <strong className="text-gray-900">Economic Conditions:</strong>
                  <span className="text-gray-700 ml-1">Market cycles affect all RV values</span>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Key Depreciation Facts</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-black mb-2">Immediate Loss</h4>
                <p className="text-gray-700 text-sm">
                  New RVs lose 20-30% of their value the moment you drive off the lot, 
                  regardless of type or brand.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-black mb-2">Best Value Retention</h4>
                <p className="text-gray-700 text-sm">
                  Fifth wheels and travel trailers typically hold their value better 
                  than motorhomes over the long term.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-black mb-2">Sweet Spot</h4>
                <p className="text-gray-700 text-sm">
                  3-5 year old RVs often provide the best balance of features, 
                  condition, and value for buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Factors */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Timing Your RV Purchase or Sale</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Best Times to Buy</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>Late Fall/Winter:</strong> Dealers clearing inventory</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>Economic Downturns:</strong> Lower demand = better prices</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>End of Model Years:</strong> Previous year discounts</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Best Times to Sell</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>Spring/Early Summer:</strong> Peak buying season</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>Before Major Repairs:</strong> Avoid costly fixes</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                <span><strong>Strong Economy:</strong> Higher demand periods</span>
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
              Why do RVs depreciate so quickly?
            </h3>
            <p className="text-gray-700">
              RVs depreciate rapidly due to several factors: they're considered luxury items, have limited 
              financing options, face seasonal demand fluctuations, and often require significant maintenance. 
              The large initial markup also contributes to steep depreciation curves.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Which RV types hold their value best?
            </h3>
            <p className="text-gray-700">
              Travel trailers and fifth wheels generally hold their value better than motorhomes because 
              they don't have engines that require expensive maintenance. Among motorhomes, Class C units 
              typically depreciate slower than Class A due to their lower initial cost and broader market appeal.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              How accurate are these depreciation estimates?
            </h3>
            <p className="text-gray-700">
              Our estimates are based on market analysis of hundreds of RVs but should be used as general 
              guidelines. Actual depreciation varies significantly based on brand, condition, maintenance, 
              location, and market conditions. Premium brands and well-maintained units often outperform these averages.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">
              Should I buy new or used based on depreciation?
            </h3>
            <p className="text-gray-700">
              From a pure financial perspective, used RVs (3-5 years old) often provide the best value as 
              they've absorbed the steepest depreciation while retaining modern features and warranties. 
              However, consider your budget, desired features, and how long you plan to keep the RV.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-4">Ready to find your perfect RV?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Use our depreciation insights to make smarter buying decisions. 
          Compare RVs and find the best value for your budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/compare"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Compare RVs
          </Link>
          <Link 
            href="/calculator"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Fuel Cost Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}
