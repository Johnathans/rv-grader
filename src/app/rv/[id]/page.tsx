'use client';

import { useParams } from 'next/navigation';
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
    width: 8.5,
    height: 11.5,
    sleeps: 4,
    fairRVScore: 8.5,
    image: '/api/placeholder/600/400',
    features: ['Generator', 'Solar Ready', 'Backup Camera', 'Swivel Seats', 'Dinette', 'Queen Bed'],
    mpg: 12,
    engine: 'Mercedes-Benz 3.0L V6 Turbo Diesel',
    transmission: '7-Speed Automatic',
    fuelCapacity: 24.5,
    freshWater: 44,
    grayWater: 31,
    blackWater: 31,
    warranty: {
      structural: '3 years',
      appliances: '1 year',
      chassis: '3 years/36,000 miles'
    },
    commonIssues: [
      {
        issue: 'Slide-out alignment problems',
        frequency: 'Moderate',
        severity: 'Medium',
        avgRepairCost: 800
      },
      {
        issue: 'Water pump failure',
        frequency: 'Low',
        severity: 'Low',
        avgRepairCost: 300
      },
      {
        issue: 'Generator maintenance',
        frequency: 'High',
        severity: 'Low',
        avgRepairCost: 200
      }
    ],
    maintenanceSchedule: [
      { item: 'Oil Change', interval: '5,000 miles', cost: 150 },
      { item: 'Generator Service', interval: '100 hours', cost: 200 },
      { item: 'Roof Inspection', interval: '6 months', cost: 100 },
      { item: 'Tire Rotation', interval: '7,500 miles', cost: 80 }
    ],
    scoreBreakdown: {
      floorPlan: 8.7,
      towing: 7.8,
      reliability: 8.2,
      maintenance: 8.5,
      warranty: 8.8,
      value: 8.5,
      buildQuality: 8.4,
      fuelEconomy: 7.9
    }
  }
];

export default function RVDetailPage() {
  const params = useParams();
  const rvId = parseInt(params.id as string);
  const rv = sampleRVs.find(r => r.id === rvId);

  if (!rv) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">RV Not Found</h1>
        <p className="text-gray-600 mb-8">The RV you're looking for doesn't exist.</p>
        <Link href="/search" className="bg-[#FF5C00] text-white px-6 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-bold">
          Browse All RVs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-[#FF5C00]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/search" className="hover:text-[#FF5C00]">Search</Link>
          <span className="mx-2">/</span>
          <span>{rv.name}</span>
        </nav>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-black mb-2">{rv.name}</h1>
            <p className="text-gray-600">{rv.brand} • {rv.type}</p>
          </div>
          <div className="mt-4 lg:mt-0 flex items-center gap-4">
            <div className="bg-[#FF5C00] text-white px-4 py-2 rounded-lg text-lg font-black">
              Fair RV Score: {rv.fairRVScore}/10
            </div>
            <div className="text-2xl font-bold text-black">
              ${rv.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Image and Basic Info */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-8">
            <img 
              src={`https://picsum.photos/800/450?random=${rv.id}`}
              alt={rv.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Specifications */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-black text-black mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-gray-500 text-sm">Length</span>
                <p className="font-medium">{rv.length} ft</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Width</span>
                <p className="font-medium">{rv.width} ft</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Height</span>
                <p className="font-medium">{rv.height} ft</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Sleeps</span>
                <p className="font-medium">{rv.sleeps} people</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">MPG</span>
                <p className="font-medium">{rv.mpg}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Fuel Capacity</span>
                <p className="font-medium">{rv.fuelCapacity} gal</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Fresh Water</span>
                <p className="font-medium">{rv.freshWater} gal</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Gray Water</span>
                <p className="font-medium">{rv.grayWater} gal</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Black Water</span>
                <p className="font-medium">{rv.blackWater} gal</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-black text-black mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {rv.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-teal-500 mr-2 font-bold">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-black text-black mb-4">Common Issues & Maintenance</h2>
            <div className="space-y-4">
              {rv.commonIssues.map((issue, index) => (
                <div key={index} className="border-l-4 border-[#FF5C00] pl-4">
                  <h3 className="font-medium text-black">{issue.issue}</h3>
                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span>Frequency: {issue.frequency}</span>
                    <span>Severity: {issue.severity}</span>
                    <span>Avg Cost: ${issue.avgRepairCost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Fair RV Score and Details */}
        <div className="space-y-6">
          {/* Fair RV Score Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-black text-black mb-4">Fair RV Score Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(rv.scoreBreakdown).map(([category, score]) => {
                const getScoreColor = (score: number) => {
                  if (score >= 8.5) return 'bg-green-500';
                  if (score >= 7.5) return 'bg-green-400';
                  if (score >= 6.5) return 'bg-yellow-400';
                  if (score >= 5.5) return 'bg-orange-400';
                  return 'bg-red-400';
                };
                
                const formatCategoryName = (category: string) => {
                  switch(category) {
                    case 'floorPlan': return 'Floor Plan';
                    case 'buildQuality': return 'Build Quality';
                    case 'fuelEconomy': return 'Fuel Economy';
                    default: return category.charAt(0).toUpperCase() + category.slice(1);
                  }
                };
                
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-800">{formatCategoryName(category)}</span>
                      <span className="text-sm font-bold text-gray-700">{score}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${getScoreColor(score)} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Warranty Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-black text-black mb-4">Warranty Coverage</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Structural</span>
                <p className="font-medium">{rv.warranty.structural}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Appliances</span>
                <p className="font-medium">{rv.warranty.appliances}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Chassis</span>
                <p className="font-medium">{rv.warranty.chassis}</p>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-black text-black mb-4">Maintenance Schedule</h2>
            <div className="space-y-3">
              {rv.maintenanceSchedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{item.item}</p>
                    <p className="text-xs text-gray-500">{item.interval}</p>
                  </div>
                  <span className="text-sm font-medium">${item.cost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-[#FF5C00] text-white py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold">
              Get Dealer Quote
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Add to Compare
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Save to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
