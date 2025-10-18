'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Travel Trailer manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Airstream',
    tagline: 'Our pick for iconic design and durability',
    featured: true,
    rating: 4.9,
    rvGraderScore: 9.4,
    logo: 'https://picsum.photos/200/100?random=21',
    description: 'Airstream has been the gold standard for travel trailers since 1931, famous for their distinctive aluminum construction and timeless design. Their trailers are built to last generations, with superior aerodynamics, excellent resale value, and a passionate owner community. From compact Bambi models to spacious Classic series, Airstream represents the pinnacle of travel trailer craftsmanship.',
    highlights: [
      'Iconic aluminum construction since 1931',
      'Exceptional build quality and durability',
      'Superior aerodynamics and fuel efficiency',
      'Outstanding resale value retention',
      'Strong passionate owner community'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '16-33 feet' },
      { label: 'Weight Range', value: '3,000-8,500 lbs' },
      { label: 'Price Range', value: '$50K-$180K+' },
      { label: 'Best For', value: 'Prestige & Durability' }
    ],
    limitations: 'Premium pricing, limited interior customization'
  },
  {
    id: 2,
    name: 'Grand Design RV',
    tagline: 'Our pick for innovation and value',
    featured: false,
    rating: 4.7,
    rvGraderScore: 9.1,
    logo: 'https://picsum.photos/200/100?random=22',
    description: 'Grand Design RV has quickly become a leader in the travel trailer market since 2012, known for innovative features, quality construction, and excellent customer service. Their Imagine, Reflection, and Transcend series offer modern amenities, thoughtful layouts, and competitive pricing with superior build quality.',
    highlights: [
      'Rapid rise to industry leadership since 2012',
      'Innovative features and modern amenities',
      'Excellent customer service reputation',
      'Quality construction at competitive prices',
      'Thoughtful layouts and design'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '15-40 feet' },
      { label: 'Weight Range', value: '3,500-12,000 lbs' },
      { label: 'Price Range', value: '$25K-$80K' },
      { label: 'Best For', value: 'Innovation & Value' }
    ],
    limitations: 'Newer brand with limited long-term track record'
  },
  {
    id: 3,
    name: 'Jayco',
    tagline: 'Our pick for family-friendly features',
    featured: false,
    rating: 4.5,
    rvGraderScore: 8.6,
    logo: 'https://picsum.photos/200/100?random=23',
    description: 'Jayco has been building quality RVs since 1968, with a strong focus on family-friendly features and reliable construction. Their travel trailers range from lightweight models to spacious family units, all featuring Jayco\'s commitment to quality, safety, and customer satisfaction with excellent warranty coverage.',
    highlights: [
      'Family-owned company since 1968',
      'Strong focus on family-friendly features',
      'Reliable construction and quality materials',
      'Excellent warranty coverage and support',
      'Wide range of sizes and floor plans'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '12-35 feet' },
      { label: 'Weight Range', value: '2,500-9,000 lbs' },
      { label: 'Price Range', value: '$20K-$65K' },
      { label: 'Best For', value: 'Families & Reliability' }
    ],
    limitations: 'Conservative styling, limited luxury features'
  },
  {
    id: 4,
    name: 'Forest River RV',
    tagline: 'Our pick for variety and affordability',
    featured: false,
    rating: 4.1,
    rvGraderScore: 7.8,
    logo: 'https://picsum.photos/200/100?random=24',
    description: 'Forest River RV is one of the largest RV manufacturers, offering an extensive lineup of travel trailers under multiple brand names. They focus on providing affordable options with good value, wide variety of floor plans, and competitive pricing to make RV ownership accessible to more people.',
    highlights: [
      'Extensive lineup with multiple brands',
      'Very competitive pricing structure',
      'Wide variety of floor plans and sizes',
      'Large dealer network nationwide',
      'Good entry-level options for beginners'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '10-40 feet' },
      { label: 'Weight Range', value: '1,500-12,000 lbs' },
      { label: 'Price Range', value: '$15K-$70K' },
      { label: 'Best For', value: 'Variety & Budget' }
    ],
    limitations: 'Inconsistent build quality, basic interior finishes'
  },
  {
    id: 5,
    name: 'Lance Camper',
    tagline: 'Our pick for lightweight adventure',
    featured: false,
    rating: 4.4,
    rvGraderScore: 8.3,
    logo: 'https://picsum.photos/200/100?random=25',
    description: 'Lance Camper specializes in lightweight, well-built travel trailers designed for adventure seekers who want to explore off-the-beaten-path destinations. Their trailers feature quality construction, thoughtful design, and the ability to be towed by smaller vehicles while still providing comfort and functionality.',
    highlights: [
      'Lightweight construction for smaller tow vehicles',
      'Quality build designed for adventure travel',
      'Thoughtful layouts maximizing space',
      'Good for off-road and remote camping',
      'Strong construction despite light weight'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '14-24 feet' },
      { label: 'Weight Range', value: '2,800-6,500 lbs' },
      { label: 'Price Range', value: '$30K-$65K' },
      { label: 'Best For', value: 'Lightweight Adventure' }
    ],
    limitations: 'Limited size options, higher price per square foot'
  },
  {
    id: 6,
    name: 'Oliver Travel Trailers',
    tagline: 'Our pick for premium fiberglass construction',
    featured: false,
    rating: 4.6,
    rvGraderScore: 8.8,
    logo: 'https://picsum.photos/200/100?random=26',
    description: 'Oliver Travel Trailers builds premium fiberglass travel trailers with exceptional attention to detail and quality. Their distinctive egg-shaped design provides superior aerodynamics and weather resistance. Each trailer is hand-built with premium materials and components, resulting in a luxury camping experience.',
    highlights: [
      'Premium fiberglass construction',
      'Distinctive aerodynamic egg-shaped design',
      'Hand-built with attention to detail',
      'Superior weather resistance',
      'Luxury appointments and materials'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '16-23 feet' },
      { label: 'Weight Range', value: '3,500-5,500 lbs' },
      { label: 'Price Range', value: '$80K-$120K' },
      { label: 'Best For', value: 'Premium Quality' }
    ],
    limitations: 'Very high price point, limited size range'
  }
];

export default function TravelTrailersPage() {
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

  // Generate structured data for Travel Trailer manufacturers
  const generateManufacturerSchema = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Travel Trailer Manufacturers 2025",
      "description": "Compare top travel trailer manufacturers with expert reviews, ratings, and detailed specifications for towable RVs.",
      "url": "https://rvgrader.com/manufacturers/travel-trailers",
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
                "name": "Travel Trailer",
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
          "name": "What is the best travel trailer manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Airstream leads travel trailers with a 9.5 RV Grader Score, offering iconic aluminum construction, superior build quality, and excellent resale value in their classic and modern designs."
          }
        },
        {
          "@type": "Question",
          "name": "How much do travel trailers cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Travel trailers range from $15K-$100K+ depending on manufacturer and features. Entry-level models start around $15K, while luxury travel trailers can exceed $100K."
          }
        },
        {
          "@type": "Question",
          "name": "What vehicle can tow a travel trailer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most SUVs and pickup trucks can tow travel trailers. Check your vehicle's towing capacity and the trailer's GVWR to ensure safe towing. Smaller trailers can be towed by many cars."
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          Best Travel Trailer Manufacturers - 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          The most versatile RV category with options for every budget and tow vehicle. 
          From lightweight models to spacious family trailers, find your perfect match.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Size:</strong> 10 to 40 feet | <strong>Weight:</strong> 1,100 to 12,000 pounds | <strong>Price:</strong> $15K to $180K+
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
        <h2 className="text-2xl font-black text-black mb-4">Find your perfect travel trailer</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Browse thousands of travel trailers from these top manufacturers. 
          Filter by size, weight, price, and features to find the ideal trailer for your adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/rv?type=travel-trailer"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Browse Travel Trailers
          </Link>
          <Link 
            href="/blog/travel-trailer-buying-guide"
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
