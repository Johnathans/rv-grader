'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface BrandData {
  name: string;
  severity: 'critical' | 'high' | 'moderate' | 'low' | 'unavailable';
  primaryIssues: string;
  customerService: string;
  recommendation: string;
  details: string;
  problems: string[];
  quote?: string;
  rvGraderScore: number;
  rvTypes: string[];
}

export default function BrandsToAvoidPage() {
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);
  const [selectedRvType, setSelectedRvType] = useState<string>('All');

  const rvTypes = ['All', 'Class A', 'Class B', 'Class C', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler', 'Pop-up'];

  const brandsData: BrandData[] = [
    {
      name: 'Thor Hurricane',
      severity: 'critical',
      primaryIssues: 'Fire recalls, brake defects',
      customerService: 'Poor',
      recommendation: 'Avoid',
      details: 'This Class A motorhome has accumulated over 50 documented safety recalls, making it one of the most dangerous options on the market.',
      problems: [
        'Fire risks from defective components requiring multiple recalls',
        'Brake system failures including parking brake and hydraulic jack malfunctions',
        'Salvaged parts - Manufacturer uses reconditioned components in new units',
        'Battery nightmares - House battery systems fail prematurely ($200-$1,000+ replacement)',
        'Resale disaster - Depreciates 35-45% in first year due to reputation'
      ],
      quote: 'The dealership wouldn\'t even let me test drive it—should\'ve been my first clue.',
      rvGraderScore: 2.1,
      rvTypes: ['Class A']
    },
    {
      name: 'Forest River',
      severity: 'critical',
      primaryIssues: 'Electrical failures, slide-outs',
      customerService: 'Very Poor',
      recommendation: 'Avoid',
      details: 'Despite being one of America\'s largest manufacturers, Forest River leads in customer complaints across review platforms.',
      problems: [
        'Slide-out catastrophes - Units jam closed, requiring manual cranking mid-trip',
        'Electrical chaos - Haphazard wiring makes troubleshooting nearly impossible',
        'Water system mysteries - Hot water failures with no clear diagnosis',
        'Roof leaks penetrating into living spaces',
        'Flooring separation and door misalignment from poor assembly',
        'Customer service void - Weeks-long waits for warranty responses'
      ],
      rvGraderScore: 2.3,
      rvTypes: ['Travel Trailer', 'Fifth Wheel', 'Class C', 'Toy Hauler']
    },
    {
      name: 'Keystone',
      severity: 'critical',
      primaryIssues: 'Structural failures, safety',
      customerService: 'Poor',
      recommendation: 'Avoid',
      details: 'Keystone RVs are notorious for catastrophic structural failures, including cabinets falling while driving and frame issues.',
      problems: [
        'Cabinet collapse disasters - Upper cabinets fall during travel, creating safety hazards',
        'Frame weakness leading to structural integrity problems',
        'Slide-out seal failures causing extensive water damage',
        'Electrical system problems with frequent short circuits',
        'Poor build quality with visible construction shortcuts',
        'Warranty disputes - Company often denies legitimate claims'
      ],
      rvGraderScore: 2.5,
      rvTypes: ['Travel Trailer', 'Fifth Wheel', 'Toy Hauler']
    },
    {
      name: 'Fleetwood',
      severity: 'critical',
      primaryIssues: 'Appliance fires, safety hazards',
      customerService: 'Poor',
      recommendation: 'Avoid',
      details: 'Budget pricing comes with life-threatening safety defects that should trigger recalls.',
      problems: [
        'Refrigerator fires - Dometic units ignite due to control panel defects',
        'Roof penetration - Leaks develop quickly, causing interior water damage',
        'Brake system issues affecting chassis safety',
        'Floor delamination - Layers separate, creating soft spots',
        'Interior deterioration - Cheap materials disintegrate rapidly'
      ],
      rvGraderScore: 2.7,
      rvTypes: ['Class A', 'Class C', 'Travel Trailer']
    },
    {
      name: 'Heartland',
      severity: 'critical',
      primaryIssues: 'Frame collapses, structural',
      customerService: 'Very Poor',
      recommendation: 'Avoid',
      details: 'Founded in 2003 with solid reputation until Thor Industries acquisition in 2010 triggered quality collapse.',
      problems: [
        'Structural failure - Documented case of frame collapsing during normal driving',
        'Crack propagation - Fissures develop along walls and roof joints',
        'Roof deterioration affecting even recent model years',
        'Wall shifting - Interior panels move during travel, jamming doors',
        'Fire incidents - At least one owner-reported RV fire',
        'Poor wiring throughout electrical systems'
      ],
      rvGraderScore: 1.9,
      rvTypes: ['Fifth Wheel', 'Travel Trailer', 'Toy Hauler']
    },
    {
      name: 'Coleman',
      severity: 'moderate',
      primaryIssues: 'Appliance failures, rapid wear',
      customerService: 'Poor',
      recommendation: 'Caution',
      details: 'Lightweight construction attracts first-time buyers, but units deteriorate after just 3-5 trips.',
      problems: [
        'Refrigerator/freezer failures - Units die shortly after purchase, spoiling food',
        'AC system collapse - Makes summer camping impossible',
        'Electrical outlets malfunction throughout',
        'Handling difficulties - Towing instability reported',
        'Rapid aging - Shows wear far beyond normal depreciation timeline'
      ],
      rvGraderScore: 4.2,
      rvTypes: ['Travel Trailer', 'Pop-up']
    },
    {
      name: 'Jayco',
      severity: 'moderate',
      primaryIssues: '60% leak rate, material failure',
      customerService: 'Fair',
      recommendation: 'Caution',
      details: '50+ years of solid reputation crumbling under mass production demands.',
      problems: [
        'Leak epidemic - Over 60% of owners report kitchen/bathroom water intrusion',
        'Material breakdown - Mattresses rip at seams, bed frames snap',
        'Electrical system failures affecting refrigerators, HVAC, lighting',
        'Limited space - Floor plans lack storage and furniture flexibility',
        'Warranty disappointment - 2-year coverage sounds good but claim processing frustrates owners'
      ],
      rvGraderScore: 5.1,
      rvTypes: ['Travel Trailer', 'Fifth Wheel', 'Class C', 'Toy Hauler']
    },
    {
      name: 'Gulf Stream',
      severity: 'moderate',
      primaryIssues: 'Persistent leaks, lock failures',
      customerService: 'Poor',
      recommendation: 'Avoid',
      details: 'Former industry leader now plagued by quality control failures.',
      problems: [
        'Chronic roof leaks causing expensive water damage',
        'Battery system failures (particularly BT Cruiser model)',
        'Lock malfunctions - Doors won\'t secure OR trap owners inside',
        'Basement door failures - Cargo compartments open while driving'
      ],
      rvGraderScore: 4.5,
      rvTypes: ['Travel Trailer', 'Class C']
    }
  ];

  const filteredBrands = selectedRvType === 'All' 
    ? brandsData 
    : brandsData.filter(brand => brand.rvTypes.includes(selectedRvType));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-gray-100 text-black border-gray-300';
      case 'high': return 'bg-gray-100 text-black border-gray-300';
      case 'moderate': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'low': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'unavailable': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return '⚠️';
      case 'moderate':
        return '⚠️';
      case 'low':
        return '•';
      default:
        return '•';
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case 'avoid': return 'bg-black text-white';
      case 'caution': return 'bg-[#FF5C00] text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const renderRvGraderScore = (score: number) => {
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
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
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
        <span className="text-xs text-gray-600 mt-1 font-medium text-center">RV Grader Score</span>
      </div>
    );
  };

  // Generate structured data for the page
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "RV Brands to Avoid in 2025: Expert Buyer's Guide",
      "description": "Expert buyer's guide based on thousands of owner complaints, safety recalls, and industry data to help you avoid costly RV mistakes.",
      "author": {
        "@type": "Organization",
        "name": "RV Grader"
      },
      "publisher": {
        "@type": "Organization",
        "name": "RV Grader",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rvgrader.com/logo.png"
        }
      },
      "datePublished": "2025-01-01",
      "dateModified": "2025-01-01",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://rvgrader.com/brands-to-avoid"
      },
      "about": filteredBrands.map(brand => ({
        "@type": "Review",
        "itemReviewed": {
          "@type": "Brand",
          "name": brand.name,
          "category": "RV Manufacturer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": brand.rvGraderScore,
          "bestRating": 10,
          "worstRating": 0
        },
        "author": {
          "@type": "Organization",
          "name": "RV Grader"
        },
        "reviewBody": brand.details,
        "negativeNotes": brand.problems
      })),
      "mentions": [
        {
          "@type": "Thing",
          "name": "RV Safety Recalls"
        },
        {
          "@type": "Thing", 
          "name": "RV Quality Issues"
        },
        {
          "@type": "Thing",
          "name": "RV Manufacturer Reviews"
        }
      ]
    };

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which RV brands should I avoid in 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid Thor Hurricane, Forest River, Keystone, Fleetwood, and Heartland due to safety recalls, structural failures, and poor customer support. These brands have documented issues including fire hazards, frame collapses, and electrical failures."
          }
        },
        {
          "@type": "Question",
          "name": "What makes an RV brand dangerous?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dangerous RV brands typically have multiple safety recalls, structural failures, fire hazards, poor build quality, and inadequate customer service. Look for brands with documented brake failures, electrical issues, or frame collapses."
          }
        },
        {
          "@type": "Question",
          "name": "How do I check if an RV brand is reliable?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Check the NHTSA database for safety recalls, read owner reviews on multiple platforms, verify warranty coverage, inspect build quality, and research the manufacturer's customer service reputation."
          }
        }
      ]
    };

    return [structuredData, faqData];
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          RV Brands to Avoid in 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium">
          Expert buyer's guide based on thousands of owner complaints, safety recalls, 
          and industry data to help you avoid costly mistakes.
        </p>
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg max-w-3xl mx-auto">
          <p className="text-black font-medium">
            ⚠️ <strong>Quick Answer:</strong> Avoid Thor Hurricane, Forest River, Keystone, Fleetwood, 
            and Heartland due to safety recalls, structural failures, and poor customer support.
          </p>
        </div>
      </div>

      {/* Why It Matters Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Why Your RV Brand Choice Could Cost You Thousands</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Hidden Costs of Choosing Wrong:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[#FF5C00] mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Depreciation disaster:</strong> Poor-quality brands lose 40-50% value in 2 years vs. 20% for premium brands</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF5C00] mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Repair expenses:</strong> Owners report $5,000-$25,000 in unexpected repairs within first 3 years</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF5C00] mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Safety risks:</strong> Fire hazards, brake failures, and structural collapses endanger families</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF5C00] mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Vacation ruined:</strong> Breakdowns strand travelers, wasting time and money</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">What Makes a Brand "Bad":</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Manufacturing shortcuts:</strong> Salvaged parts, rushed assembly, cheap materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Corporate acquisitions:</strong> Quality drops when conglomerates prioritize volume over craftsmanship</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-700"><strong>Customer abandonment:</strong> Ignoring warranty claims, unreachable support, denied repairs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* RV Type Filter */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold text-black">Brand Comparison by RV Type</h2>
          <div className="flex items-center gap-3">
            <label htmlFor="rv-type-filter" className="text-sm font-medium text-gray-700">
              Filter by RV Type:
            </label>
            <select
              id="rv-type-filter"
              value={selectedRvType}
              onChange={(e) => setSelectedRvType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none bg-white"
            >
              {rvTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        {selectedRvType !== 'All' && (
          <p className="text-sm text-gray-600 mt-2">
            Showing {filteredBrands.length} brands that manufacture {selectedRvType} RVs
          </p>
        )}
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Brand Comparison: At-a-Glance</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Brand</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">RV Grader Score</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">RV Types</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Severity</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Primary Issues</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {filteredBrands.map((brand, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{brand.name}</td>
                  <td className="px-6 py-4 text-center">
                    {renderRvGraderScore(brand.rvGraderScore)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {brand.rvTypes.map((type, typeIndex) => (
                        <span key={typeIndex} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {type}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(brand.severity)}`}>
                      {getSeverityIcon(brand.severity)} {brand.severity.charAt(0).toUpperCase() + brand.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-center">{brand.primaryIssues}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRecommendationColor(brand.recommendation)}`}>
                      {brand.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Brand Reviews */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Detailed Brand Analysis</h2>
        
        <div className="space-y-6">
          {filteredBrands.map((brand, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => setExpandedBrand(expandedBrand === brand.name ? null : brand.name)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{getSeverityIcon(brand.severity)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-black">{brand.name}</h3>
                      <p className="text-sm text-gray-600">{brand.primaryIssues}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRecommendationColor(brand.recommendation)}`}>
                      {brand.recommendation}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedBrand === brand.name ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
              
              {expandedBrand === brand.name && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-4">
                    <p className="text-gray-700 mb-4">{brand.details}</p>
                    
                    <h4 className="font-semibold text-black mb-3">Documented Problems:</h4>
                    <ul className="space-y-2 mb-4">
                      {brand.problems.map((problem, problemIndex) => (
                        <li key={problemIndex} className="flex items-start">
                          <span className="text-[#FF5C00] mr-3 mt-1 flex-shrink-0">•</span>
                          <span className="text-gray-700">{problem}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {brand.quote && (
                      <div className="bg-gray-50 border-l-4 border-[#FF5C00] p-4 italic text-gray-700">
                        "{brand.quote}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">7 Warning Signs Before You Buy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Multiple Safety Recalls</h3>
                <p className="text-gray-600 text-sm">Check NHTSA database for fire, brake, or structural recalls</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Poor Online Reviews</h3>
                <p className="text-gray-600 text-sm">Consistent 1-2 star ratings across multiple platforms</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Warranty Disputes</h3>
                <p className="text-gray-600 text-sm">Manufacturers denying legitimate warranty claims</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Build Quality Issues</h3>
                <p className="text-gray-600 text-sm">Visible gaps, misaligned panels, cheap materials</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Dealer Network Problems</h3>
                <p className="text-gray-600 text-sm">Limited service locations, long wait times</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Rapid Depreciation</h3>
                <p className="text-gray-600 text-sm">Models losing 40%+ value in first 2 years</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-[#FF5C00] text-xl mr-3 mt-1 flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-semibold text-black">Class Action Lawsuits</h3>
                <p className="text-gray-600 text-sm">Ongoing legal issues for defects or safety problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Safer Alternatives */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">Safer RV Brand Alternatives</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-3">Premium Brands</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Airstream (Best resale value)</li>
              <li>• Grand Design (Excellent quality)</li>
              <li>• Newmar (Luxury motorhomes)</li>
              <li>• Tiffin (Customer service leader)</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-3">Mid-Range Options</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Lance (Truck campers)</li>
              <li>• Northwood (Arctic Fox)</li>
              <li>• Outdoors RV (Four seasons)</li>
              <li>• Leisure Travel Vans</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-3">Budget-Friendly</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Casita (Fiberglass trailers)</li>
              <li>• Scamp (Lightweight)</li>
              <li>• Escape (Canadian quality)</li>
              <li>• Older Winnebago models</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-4">Ready to find a reliable RV?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Use our tools to research reliable brands, calculate costs, and compare manufacturers 
          from trusted companies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/compare"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Compare Reliable RVs
          </Link>
          <Link 
            href="/manufacturers/class-a"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            View Trusted Manufacturers
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
