'use client';

import { useState } from 'react';
import Link from 'next/link';

// Membership data in CompareCards format
const memberships = [
  {
    id: 1,
    name: 'Harvest Hosts + Boondockers Welcome',
    tagline: 'Our pick for unique experiences and adventure seekers',
    featured: true,
    rating: 4.8,
    annualCost: 169,
    fairRvScore: 9.2,
    logo: 'https://picsum.photos/120/60?random=1',
    description: 'Harvest Hosts offers a unique camping experience by connecting RVers with farms, wineries, breweries, distilleries, museums, and other unique locations across North America. Members can stay overnight for free (no camping fees) at over 9,000 Host locations, with the expectation of supporting the business through purchases. The membership includes Boondockers Welcome, which provides access to private properties for dry camping. This program is perfect for self-contained RVers who enjoy meeting new people, supporting small businesses, and discovering unique destinations off the beaten path.',
    highlights: [
      'No nightly camping fees at 9,000+ unique locations',
      'Stay at farms, wineries, breweries, and museums',
      'Includes Boondockers Welcome for private properties',
      '10-50% discounts at 1,200+ traditional campgrounds',
      'Support small businesses and make personal connections'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$169' },
      { label: 'Primary Benefit', value: 'Free overnight stays' },
      { label: 'Locations', value: '9,000+ unique spots' },
      { label: 'Best For', value: 'Self-contained RVers' }
    ],
    limitations: 'No full hookups guaranteed, usually 1-2 night max'
  },
  {
    id: 2,
    name: 'Passport America',
    tagline: 'Our pick for budget-conscious travelers',
    featured: false,
    rating: 4.3,
    annualCost: 49,
    fairRvScore: 8.1,
    logo: 'https://picsum.photos/120/60?random=2',
    description: 'Passport America is one of the most popular RV discount programs, offering 50% off regular nightly rates at over 1,200 participating campgrounds across the United States, Canada, and Mexico. With a low annual fee of just $49, the membership typically pays for itself after just 2-3 nights of camping. The program is straightforward with no complicated tier systems or point accumulation - simply present your membership card for instant savings. Most participating campgrounds have some restrictions such as night limits or blackout dates during peak seasons.',
    highlights: [
      '50% discount on regular nightly rates',
      'Low annual fee pays for itself after 2-3 nights',
      'Mobile app for easy campground searching',
      'No complicated tier systems',
      'Available in US, Mexico, and Canada'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$49' },
      { label: 'Primary Discount', value: '50% off nightly rates' },
      { label: 'Locations', value: '1,200+ campgrounds' },
      { label: 'Best For', value: 'Budget travelers, frequent movers' }
    ],
    limitations: 'Night limits, blackout dates, restrictions vary by park'
  },
  {
    id: 3,
    name: 'Escapees RV Club',
    tagline: 'Our pick for full-timers and community seekers',
    featured: false,
    rating: 4.6,
    annualCost: 49.95,
    fairRvScore: 8.7,
    logo: 'https://picsum.photos/120/60?random=3',
    description: 'Escapees RV Club is much more than a camping discount program - it\'s a comprehensive support system for RVers, especially full-timers. Founded in 1978, the club offers mail forwarding services, domicile establishment, RV education programs, and a strong community network with local chapters nationwide. Members receive discounts at over 1,200 campgrounds, but the real value lies in the services and community support. The club operates several RV parks and offers specialized programs for solo travelers, co-op parks, and CARE (Continuing Assistance for Retired Escapees) centers.',
    highlights: [
      'RV education and training programs',
      'Mail forwarding and domicile services',
      'Strong community focus with nationwide chapters',
      'Discounts at 1,200+ campgrounds',
      'Special services for full-time RVers'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$49.95' },
      { label: 'Primary Benefit', value: 'Community + Services' },
      { label: 'Locations', value: '1,200+ campgrounds' },
      { label: 'Best For', value: 'Full-timers, community seekers' }
    ],
    limitations: 'Benefits beyond camping are the main value'
  },
  {
    id: 4,
    name: 'KOA Rewards',
    tagline: 'Our pick for families and quality seekers',
    featured: false,
    rating: 4.4,
    annualCost: 39,
    fairRvScore: 7.9,
    logo: 'https://picsum.photos/120/60?random=4',
    description: 'KOA Rewards is the loyalty program for KOA (Kampgrounds of America), offering 10% off daily registration rates at all 500+ KOA locations across North America. Members earn points for every stay that can be redeemed for free nights, and receive early access to reservations during busy periods. The program includes partner discounts such as 15% off Goodyear tires, discounts on camping gear, and access to exclusive KOA Rewards Appreciation Weekend events. KOA campgrounds are known for their consistent quality, family-friendly amenities, and reliable services.',
    highlights: [
      '10% off daily registration at all KOA locations',
      'Points system - earn rewards for future stays',
      'Early access to reservations during busy periods',
      'KOA Rewards Appreciation Weekend in September',
      'Partner discounts (15% off Goodyear tires and more)'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$39' },
      { label: 'Primary Discount', value: '10% off + points' },
      { label: 'Locations', value: '500+ KOA locations' },
      { label: 'Best For', value: 'Families, quality seekers' }
    ],
    limitations: 'Limited to KOA-branded campgrounds only'
  },
  {
    id: 5,
    name: 'Good Sam Club',
    tagline: 'Our pick for casual RVers and retail shoppers',
    featured: false,
    rating: 4.2,
    annualCost: 29,
    fairRvScore: 7.4,
    logo: 'https://picsum.photos/120/60?random=5',
    description: 'Good Sam Club is one of the oldest and largest RV membership organizations, offering 10% discounts at over 2,000 participating campgrounds. Beyond camping discounts, members receive fuel savings at Pilot Flying J locations, discounts at Camping World and other RV retailers, travel planning resources, and access to RV events and rallies. The club offers two membership tiers: Basic ($29) and Elite ($59), with Elite members receiving additional benefits like higher fuel discounts and extended roadside assistance coverage.',
    highlights: [
      '10% discount at participating campgrounds',
      'Fuel savings at Pilot Flying J locations',
      'Discounts at Camping World stores',
      'Travel planning resources and RV events',
      'Roadside assistance available (additional cost)'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$29 Basic / $59 Elite' },
      { label: 'Primary Discount', value: '10% off campgrounds' },
      { label: 'Locations', value: '2,000+ campgrounds' },
      { label: 'Best For', value: 'Casual to moderate RVers' }
    ],
    limitations: 'Smaller discount percentage'
  },
  {
    id: 6,
    name: 'Thousand Trails',
    tagline: 'Our pick for extended stay travelers',
    featured: false,
    rating: 3.9,
    annualCost: 555,
    fairRvScore: 6.8,
    logo: 'https://picsum.photos/120/60?random=6',
    description: 'Thousand Trails operates a network of membership campgrounds offering extended stay opportunities for RVers. Members can stay for up to 14 consecutive nights at participating campgrounds with no nightly fees, though there is a mandatory 7-day break before returning to the same campground. The membership is zone-based, with different regions available for purchase. The Trails Collection add-on ($450) provides access to premium destinations. Some locations charge a $20 per night "amenity fee." This program works best for RVers who prefer longer stays and can plan around the zone restrictions.',
    highlights: [
      'Free stays for up to 14 consecutive nights',
      'Zone-based system covering different regions',
      'Trails Collection add-on for $450 (100+ destinations)',
      '$20 per night fee at designated "Fee Resorts"',
      'Best for full-time RVers with extended stays'
    ],
    keyFeatures: [
      { label: 'Annual Fee', value: '$555+ (zone-based)' },
      { label: 'Primary Benefit', value: 'Free 14-night stays' },
      { label: 'Locations', value: '80+ campgrounds per zone' },
      { label: 'Best For', value: 'Extended stay travelers' }
    ],
    limitations: 'High upfront cost, geographic restrictions, mandatory time outside network'
  }
];

export default function MembershipsPage() {
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleComparison = (id: number) => {
    setSelectedForComparison(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const toggleExpanded = (id: number) => {
    setExpandedCards(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-lg ${
            i < fullStars ? 'text-yellow-400' : 
            i === fullStars && hasHalfStar ? 'text-yellow-400' : 'text-gray-300'
          }`}>
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating}/5.0</span>
      </div>
    );
  };

  const renderFairRvScore = (score: number) => {
    const percentage = (score / 10) * 100;
    const getScoreColor = (score: number) => {
      if (score >= 8.5) return '#10B981'; // green-500
      if (score >= 7.5) return '#22C55E'; // green-400
      if (score >= 6.5) return '#EAB308'; // yellow-500
      if (score >= 5.5) return '#F97316'; // orange-500
      return '#EF4444'; // red-500
    };

    const color = getScoreColor(score);
    const circumference = 2 * Math.PI * 28; // radius = 28 (larger)
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 64 64">
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#E5E7EB"
              strokeWidth="5"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={color}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-black">{score}</span>
          </div>
        </div>
        <span className="text-xs text-gray-600 mt-1 font-medium text-center">Fair RV Score</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          Best RV Memberships - January 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          The RV industry is more competitive than ever. Membership programs are offering incredible discounts, 
          unique experiences, and valuable services. See these offers now!
        </p>
      </div>

      {/* Membership Cards */}
      <div className="space-y-8">
        {memberships.map((membership) => (
          <div key={membership.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Featured Banner */}
            {membership.featured && (
              <div className="bg-emerald-600 text-white text-center py-3">
                <span className="text-sm font-bold uppercase tracking-wide">
                  FEATURED - EDITOR&apos;S CHOICE
                </span>
              </div>
            )}

            {/* Card Header */}
            <div className="p-8 lg:p-10 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left Side: Logo and Content */}
                <div className="flex items-center gap-8 flex-1">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <img 
                      src={membership.logo}
                      alt={`${membership.name} logo`}
                      className="w-56 h-28 object-contain bg-gray-50 rounded-xl border border-gray-200 p-4"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-600 mb-2">{membership.tagline}</h2>
                    <h3 className="text-3xl lg:text-4xl font-black text-black leading-tight mb-3">{membership.name}</h3>
                    <div>
                      {renderStars(membership.rating)}
                    </div>
                  </div>
                </div>

                {/* Right Side: Fair RV Score and Buttons */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
                  {/* Fair RV Score */}
                  <div className="flex-shrink-0">
                    {renderFairRvScore(membership.fairRvScore)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[200px]">
                    <button className="bg-[#FF5C00] text-white px-12 py-4 rounded-xl hover:bg-[#E64A00] transition-colors font-bold text-xl whitespace-nowrap">
                      Join Now
                    </button>
                    <button 
                      onClick={() => toggleComparison(membership.id)}
                      className={`border-2 px-10 py-4 rounded-xl transition-colors font-semibold text-base whitespace-nowrap ${
                        selectedForComparison.includes(membership.id)
                          ? 'border-[#FF5C00] bg-orange-50 text-[#FF5C00]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {selectedForComparison.includes(membership.id) ? 'Remove from Compare' : 'Add to Compare'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content - Always Visible */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Key Features */}
                <div>
                  <h4 className="text-lg font-bold text-black mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {membership.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-600 font-medium">{feature.label}</span>
                        <span className="font-semibold text-black">{feature.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-lg font-bold text-black mb-4">Highlights</h4>
                  <ul className="space-y-2">
                    {membership.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Limitations */}
              {membership.limitations && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h5 className="font-semibold text-orange-800 mb-1">Important Limitations:</h5>
                  <p className="text-orange-700 text-sm">{membership.limitations}</p>
                </div>
              )}
            </div>

            {/* Expandable Description */}
            {expandedCards.includes(membership.id) && (
              <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                <div className="pt-6">
                  <h4 className="text-lg font-bold text-black mb-3">About This Membership</h4>
                  <p className="text-gray-700 leading-relaxed">{membership.description}</p>
                </div>
              </div>
            )}

            {/* Expand/Collapse Button */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <button 
                onClick={() => toggleExpanded(membership.id)}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#FF5C00] transition-colors font-medium"
              >
                {expandedCards.includes(membership.id) ? (
                  <>
                    <span>Show Less</span>
                    <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Show More Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      {selectedForComparison.length > 0 && (
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-black text-black mb-6">Compare Selected Memberships</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Membership</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Annual Fee</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Primary Benefit</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Locations</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Rating</th>
                </tr>
              </thead>
              <tbody>
                {selectedForComparison.map((id, index) => {
                  const membership = memberships.find(m => m.id === id);
                  if (!membership) return null;
                  
                  return (
                    <tr key={id} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-black">{membership.name}</div>
                        <div className="text-sm text-gray-600">{membership.tagline}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">${membership.annualCost}</td>
                      <td className="py-4 px-4 text-center">
                        {membership.keyFeatures.find(f => f.label === 'Primary Discount' || f.label === 'Primary Benefit')?.value}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {membership.keyFeatures.find(f => f.label === 'Locations')?.value}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          {renderStars(membership.rating)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setSelectedForComparison([])}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear Comparison
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-4">Skip the endless searching.</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Find the perfect RV membership for your travel style. Our experts have analyzed all the top programs 
          to help you save money and enhance your RV adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/blog/best-rv-memberships-guide-2024"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Read Full Guide
          </Link>
          <Link 
            href="/rv/1"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Browse RVs
          </Link>
        </div>
      </div>
    </div>
  );
}
