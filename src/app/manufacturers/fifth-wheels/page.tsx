'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Fifth Wheel manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Grand Design RV',
    tagline: 'Our pick for innovation and quality',
    featured: true,
    rating: 4.8,
    rvGraderScore: 9.2,
    logo: 'https://picsum.photos/200/100?random=41',
    description: 'Grand Design RV has revolutionized the fifth wheel market since 2012 with their Reflection, Solitude, and Momentum series. Known for innovative features, superior build quality, and exceptional customer service. Their fifth wheels feature residential-grade materials, thoughtful layouts, and cutting-edge technology that sets new industry standards.',
    highlights: [
      'Industry-leading innovation since 2012',
      'Superior build quality and materials',
      'Exceptional customer service reputation',
      'Residential-grade interior appointments',
      'Cutting-edge technology integration'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '28-42 feet' },
      { label: 'Weight Range', value: '9,000-16,000 lbs' },
      { label: 'Price Range', value: '$60K-$150K' },
      { label: 'Best For', value: 'Innovation & Quality' }
    ],
    limitations: 'Higher pricing than some competitors, newer brand history'
  },
  {
    id: 2,
    name: 'Keystone RV',
    tagline: 'Our pick for variety and value',
    featured: false,
    rating: 4.4,
    rvGraderScore: 8.3,
    logo: 'https://picsum.photos/200/100?random=42',
    description: 'Keystone RV offers one of the most extensive fifth wheel lineups in the industry, including Montana, Cougar, and Laredo series. They focus on providing options for every budget and lifestyle, from entry-level models to luxury coaches, with competitive pricing and wide dealer availability.',
    highlights: [
      'Most extensive fifth wheel lineup available',
      'Options for every budget and lifestyle',
      'Competitive pricing across all segments',
      'Wide dealer network for service',
      'Good variety of floor plans and features'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '25-45 feet' },
      { label: 'Weight Range', value: '7,500-18,000 lbs' },
      { label: 'Price Range', value: '$40K-$120K' },
      { label: 'Best For', value: 'Variety & Value' }
    ],
    limitations: 'Build quality can vary by series, basic finishes on entry models'
  },
  {
    id: 3,
    name: 'Jayco',
    tagline: 'Our pick for family-friendly reliability',
    featured: false,
    rating: 4.6,
    rvGraderScore: 8.7,
    logo: 'https://picsum.photos/200/100?random=43',
    description: 'Jayco brings their family-focused approach to fifth wheels with the Eagle, Pinnacle, and North Point series. Known for reliable construction, family-friendly features, excellent warranty coverage, and thoughtful layouts that prioritize comfort and functionality for extended stays.',
    highlights: [
      'Family-owned company since 1968',
      'Reliable construction and quality materials',
      'Family-friendly layouts and features',
      'Excellent warranty coverage and support',
      'Thoughtful storage and living solutions'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '27-38 feet' },
      { label: 'Weight Range', value: '9,500-14,500 lbs' },
      { label: 'Price Range', value: '$55K-$110K' },
      { label: 'Best For', value: 'Families & Reliability' }
    ],
    limitations: 'Conservative styling, limited luxury appointments'
  },
  {
    id: 4,
    name: 'Forest River RV',
    tagline: 'Our pick for budget-conscious buyers',
    featured: false,
    rating: 4.0,
    rvGraderScore: 7.6,
    logo: 'https://picsum.photos/200/100?random=44',
    description: 'Forest River RV manufactures fifth wheels under multiple brand names including Cardinal, Cedar Creek, and Sandpiper, offering affordable options with decent features. They focus on providing entry-level to mid-range fifth wheels with competitive pricing and basic amenities.',
    highlights: [
      'Multiple brand options under one umbrella',
      'Very competitive entry-level pricing',
      'Basic amenities and functional layouts',
      'Large dealer network availability',
      'Good options for first-time buyers'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '24-42 feet' },
      { label: 'Weight Range', value: '8,000-16,500 lbs' },
      { label: 'Price Range', value: '$35K-$90K' },
      { label: 'Best For', value: 'Budget & Entry-Level' }
    ],
    limitations: 'Inconsistent build quality, basic interior materials'
  },
  {
    id: 5,
    name: 'Heartland RV',
    tagline: 'Our pick for luxury and space',
    featured: false,
    rating: 4.3,
    rvGraderScore: 8.1,
    logo: 'https://picsum.photos/200/100?random=45',
    description: 'Heartland RV specializes in large, luxury fifth wheels with the Landmark, Big Country, and Cyclone series. They focus on spacious layouts, luxury amenities, and residential-style living for full-time RVers who want maximum comfort and space.',
    highlights: [
      'Spacious luxury fifth wheel designs',
      'Residential-style living amenities',
      'Large layouts for full-time living',
      'Quality construction and materials',
      'Good for extended stays and full-timing'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '32-45 feet' },
      { label: 'Weight Range', value: '12,000-18,500 lbs' },
      { label: 'Price Range', value: '$70K-$140K' },
      { label: 'Best For', value: 'Luxury & Full-timing' }
    ],
    limitations: 'Requires heavy-duty tow vehicle, higher maintenance costs'
  },
  {
    id: 6,
    name: 'DRV Luxury Suites',
    tagline: 'Our pick for ultimate luxury',
    featured: false,
    rating: 4.7,
    rvGraderScore: 9.0,
    logo: 'https://picsum.photos/200/100?random=46',
    description: 'DRV Luxury Suites builds ultra-premium fifth wheels with the Mobile Suites and Elite Suites series. These are the pinnacle of fifth wheel luxury, featuring custom cabinetry, premium appliances, and residential-quality construction for discerning buyers who want the absolute best.',
    highlights: [
      'Ultra-premium luxury construction',
      'Custom cabinetry and premium materials',
      'Residential-quality appliances and fixtures',
      'Exceptional attention to detail',
      'Top-tier build quality and craftsmanship'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '36-44 feet' },
      { label: 'Weight Range', value: '14,000-19,000 lbs' },
      { label: 'Price Range', value: '$150K-$300K+' },
      { label: 'Best For', value: 'Ultimate Luxury' }
    ],
    limitations: 'Very high price point, requires heavy-duty truck'
  }
];

export default function FifthWheelsPage() {
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

  const renderRvGraderScore = (score: number) => {
    const percentage = (score / 10) * 100;
    const getScoreColor = (score: number) => {
      if (score >= 8.5) return '#10B981';
      if (score >= 7.5) return '#22C55E';
      if (score >= 6.5) return '#EAB308';
      if (score >= 5.5) return '#F97316';
      return '#EF4444';
    };

    const color = getScoreColor(score);
    const circumference = 2 * Math.PI * 28;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" stroke="#E5E7EB" strokeWidth="5" fill="none" />
            <circle
              cx="32" cy="32" r="28" stroke={color} strokeWidth="5" fill="none"
              strokeLinecap="round" strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset} className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-black">{score}</span>
          </div>
        </div>
        <span className="text-xs text-gray-600 mt-1 font-medium text-center">RV Grader Score</span>
      </div>
    );
  };

  // Generate structured data for Fifth Wheel manufacturers
  const generateManufacturerSchema = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Fifth Wheel Manufacturers 2025",
      "description": "Compare top fifth wheel RV manufacturers with expert reviews, ratings, and detailed specifications for luxury towable RVs.",
      "url": "https://rvgrader.com/manufacturers/fifth-wheels",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": manufacturers.map((manufacturer, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Organization",
            "name": manufacturer.name,
            "description": manufacturer.description,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": manufacturer.rvGraderScore,
              "bestRating": 10,
              "worstRating": 0,
              "ratingCount": 100
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": manufacturer.rvGraderScore,
                "bestRating": 10
              },
              "author": {
                "@type": "Organization",
                "name": "RV Grader"
              },
              "reviewBody": manufacturer.description
            },
            "makesOffer": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Fifth Wheel RV",
                "category": "Recreational Vehicle"
              },
              "priceRange": manufacturer.keyFeatures.find(f => f.label === 'Price Range')?.value
            }
          }
        }))
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best fifth wheel manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Grand Design leads fifth wheels with a 9.2 RV Grader Score, offering premium construction, innovative features, and excellent customer service with their luxury Solitude and Reflection series."
          }
        },
        {
          "@type": "Question",
          "name": "How much do fifth wheel RVs cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fifth wheel RVs range from $40K-$150K+ depending on manufacturer and features. Entry-level models start around $40K, while luxury fifth wheels can exceed $150K."
          }
        },
        {
          "@type": "Question",
          "name": "What truck do I need for a fifth wheel?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most fifth wheels require a 3/4-ton or 1-ton pickup truck with proper towing capacity. Check your fifth wheel's GVWR and pin weight to ensure your truck can safely tow it."
          }
        }
      ]
    };

    return [organizationSchema, faqSchema];
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateManufacturerSchema())
          }}
        />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          Best Fifth Wheel Manufacturers - 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          The ultimate in towable luxury and space. Fifth wheels offer the most living space 
          and amenities, perfect for full-time living and extended adventures.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Size:</strong> 25 to 45 feet | <strong>Weight:</strong> 7,500 to 19,000 pounds | <strong>Price:</strong> $35K to $300K+
          </p>
        </div>
      </div>

      {/* Manufacturer Cards */}
      <div className="space-y-8">
        {manufacturers.map((manufacturer) => (
          <div key={manufacturer.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Featured Banner */}
            {manufacturer.featured && (
              <div className="bg-emerald-600 text-white text-center py-3">
                <span className="text-sm font-bold uppercase tracking-wide">
                  FEATURED - EDITOR'S CHOICE
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
                      src={manufacturer.logo}
                      alt={`${manufacturer.name} logo`}
                      className="w-56 h-28 object-contain bg-gray-50 rounded-xl border border-gray-200 p-4"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-600 mb-2">{manufacturer.tagline}</h2>
                    <h3 className="text-3xl lg:text-4xl font-black text-black leading-tight mb-3">{manufacturer.name}</h3>
                    <div>
                      {renderStars(manufacturer.rating)}
                    </div>
                  </div>
                </div>

                {/* Right Side: RV Grader Score and Buttons */}
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
                  {/* RV Grader Score */}
                  <div className="flex-shrink-0">
                    {renderRvGraderScore(manufacturer.rvGraderScore)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 w-full lg:w-auto min-w-[200px]">
                    <button className="bg-[#FF5C00] text-white px-12 py-4 rounded-xl hover:bg-[#E64A00] transition-colors font-bold text-xl whitespace-nowrap">
                      View Models
                    </button>
                    <button 
                      onClick={() => toggleComparison(manufacturer.id)}
                      className={`border-2 px-10 py-4 rounded-xl transition-colors font-semibold text-base whitespace-nowrap ${
                        selectedForComparison.includes(manufacturer.id)
                          ? 'border-[#FF5C00] bg-orange-50 text-[#FF5C00]'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {selectedForComparison.includes(manufacturer.id) ? 'Remove from Compare' : 'Add to Compare'}
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
                    {manufacturer.keyFeatures.map((feature, index) => (
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
                    {manufacturer.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-teal-500 mr-2 mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Limitations */}
              {manufacturer.limitations && (
                <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h5 className="font-semibold text-orange-800 mb-1">Important Considerations:</h5>
                  <p className="text-orange-700 text-sm">{manufacturer.limitations}</p>
                </div>
              )}
            </div>

            {/* Expandable Description */}
            {expandedCards.includes(manufacturer.id) && (
              <div className="px-6 pb-6 border-t border-gray-200 bg-gray-50">
                <div className="pt-6">
                  <h4 className="text-lg font-bold text-black mb-3">About This Manufacturer</h4>
                  <p className="text-gray-700 leading-relaxed">{manufacturer.description}</p>
                </div>
              </div>
            )}

            {/* Expand/Collapse Button */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white">
              <button 
                onClick={() => toggleExpanded(manufacturer.id)}
                className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#FF5C00] transition-colors font-medium"
              >
                {expandedCards.includes(manufacturer.id) ? (
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
          <h2 className="text-2xl font-black text-black mb-6">Compare Selected Manufacturers</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Manufacturer</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">RV Grader Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Size Range</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Price Range</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody>
                {selectedForComparison.map((id, index) => {
                  const manufacturer = manufacturers.find(m => m.id === id);
                  if (!manufacturer) return null;
                  
                  return (
                    <tr key={id} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-50'}>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-black">{manufacturer.name}</div>
                        <div className="text-sm text-gray-600">{manufacturer.tagline}</div>
                      </td>
                      <td className="py-4 px-4 text-center font-semibold">{manufacturer.rvGraderScore}/10</td>
                      <td className="py-4 px-4 text-center">
                        {manufacturer.keyFeatures.find(f => f.label === 'Size Range')?.value}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {manufacturer.keyFeatures.find(f => f.label === 'Price Range')?.value}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {manufacturer.keyFeatures.find(f => f.label === 'Best For')?.value}
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
        <h2 className="text-2xl font-black text-black mb-4">Discover luxury fifth wheel living</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Experience the ultimate in RV luxury and space with our complete database of fifth wheels. 
          Perfect for full-time living and those who want maximum comfort on the road.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/rv?type=fifth-wheel"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Browse Fifth Wheels
          </Link>
          <Link 
            href="/blog/fifth-wheel-buying-guide"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Read Buying Guide
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
