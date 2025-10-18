'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Toy Hauler manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Grand Design RV',
    tagline: 'Our pick for innovation and build quality',
    featured: true,
    rating: 4.7,
    rvGraderScore: 9.0,
    logo: 'https://picsum.photos/200/100?random=51',
    description: 'Grand Design RV has transformed the toy hauler market with their Momentum series, featuring innovative designs, superior build quality, and thoughtful layouts. Their toy haulers combine luxury living spaces with functional garages, offering the perfect balance for adventure enthusiasts who want comfort and capability.',
    highlights: [
      'Industry-leading innovation and design',
      'Superior build quality and materials',
      'Thoughtful layouts balancing living and garage space',
      'Luxury appointments throughout',
      'Excellent customer service reputation'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '28-44 feet' },
      { label: 'Weight Range', value: '10,000-18,000 lbs' },
      { label: 'Price Range', value: '$80K-$180K' },
      { label: 'Best For', value: 'Innovation & Quality' }
    ],
    limitations: 'Higher pricing, newer brand with limited long-term history'
  },
  {
    id: 2,
    name: 'Keystone RV',
    tagline: 'Our pick for variety and value',
    featured: false,
    rating: 4.3,
    rvGraderScore: 8.1,
    logo: 'https://picsum.photos/200/100?random=52',
    description: 'Keystone RV offers an extensive toy hauler lineup including Fuzion, Raptor, and Impact series. They provide options for every budget and use case, from lightweight models to heavy-duty haulers, with competitive pricing and wide dealer availability for service and support.',
    highlights: [
      'Extensive lineup covering all segments',
      'Options for every budget and need',
      'Competitive pricing across all models',
      'Wide dealer network for service',
      'Good variety of floor plans and garage sizes'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '24-42 feet' },
      { label: 'Weight Range', value: '8,000-16,500 lbs' },
      { label: 'Price Range', value: '$50K-$140K' },
      { label: 'Best For', value: 'Variety & Budget' }
    ],
    limitations: 'Build quality varies by series, basic finishes on entry models'
  },
  {
    id: 3,
    name: 'Heartland RV',
    tagline: 'Our pick for heavy-duty hauling',
    featured: false,
    rating: 4.4,
    rvGraderScore: 8.3,
    logo: 'https://picsum.photos/200/100?random=53',
    description: 'Heartland RV specializes in heavy-duty toy haulers with their Cyclone and Road Warrior series. Built for serious hauling with reinforced frames, large garages, and robust construction. Perfect for those who need to transport ATVs, motorcycles, or other large recreational vehicles.',
    highlights: [
      'Heavy-duty construction for serious hauling',
      'Large garage spaces and high payload capacity',
      'Reinforced frames and robust build quality',
      'Designed for full-time living with toys',
      'Good for transporting large recreational vehicles'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '32-45 feet' },
      { label: 'Weight Range', value: '12,000-19,000 lbs' },
      { label: 'Price Range', value: '$90K-$170K' },
      { label: 'Best For', value: 'Heavy-Duty Hauling' }
    ],
    limitations: 'Requires heavy-duty tow vehicle, higher fuel consumption'
  },
  {
    id: 4,
    name: 'Forest River RV',
    tagline: 'Our pick for entry-level options',
    featured: false,
    rating: 4.0,
    rvGraderScore: 7.5,
    logo: 'https://picsum.photos/200/100?random=54',
    description: 'Forest River RV manufactures toy haulers under multiple brands including XLR and Work and Play series. They focus on providing affordable entry-level options with basic amenities and functional garage spaces, making toy hauler ownership accessible to more people.',
    highlights: [
      'Affordable entry-level pricing',
      'Multiple brand options available',
      'Basic amenities and functional layouts',
      'Good for first-time toy hauler buyers',
      'Large dealer network for service'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '22-38 feet' },
      { label: 'Weight Range', value: '7,500-14,000 lbs' },
      { label: 'Price Range', value: '$40K-$100K' },
      { label: 'Best For', value: 'Entry-Level & Budget' }
    ],
    limitations: 'Basic build quality, limited luxury features'
  },
  {
    id: 5,
    name: 'Jayco',
    tagline: 'Our pick for family-friendly features',
    featured: false,
    rating: 4.5,
    rvGraderScore: 8.4,
    logo: 'https://picsum.photos/200/100?random=55',
    description: 'Jayco brings their family-focused approach to toy haulers with the Octane and Seismic series. Known for reliable construction, family-friendly layouts, and excellent warranty coverage. Their toy haulers balance garage space with comfortable living areas for family adventures.',
    highlights: [
      'Family-friendly layouts and features',
      'Reliable construction and quality materials',
      'Excellent warranty coverage and support',
      'Good balance of garage and living space',
      'Thoughtful storage solutions throughout'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '26-35 feet' },
      { label: 'Weight Range', value: '9,000-13,500 lbs' },
      { label: 'Price Range', value: '$70K-$130K' },
      { label: 'Best For', value: 'Families & Reliability' }
    ],
    limitations: 'Conservative styling, limited garage size options'
  },
  {
    id: 6,
    name: 'Dutchmen RV',
    tagline: 'Our pick for lightweight adventure',
    featured: false,
    rating: 4.2,
    rvGraderScore: 7.8,
    logo: 'https://picsum.photos/200/100?random=56',
    description: 'Dutchmen RV offers lightweight toy haulers with the Voltage series, designed for those who want to haul toys without requiring a heavy-duty truck. Their focus is on efficient layouts, lighter construction, and good value for recreational users who haul smaller toys.',
    highlights: [
      'Lightweight construction for smaller tow vehicles',
      'Efficient layouts maximizing space',
      'Good value for recreational use',
      'Suitable for smaller toys and equipment',
      'Easier to tow and maneuver'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '24-32 feet' },
      { label: 'Weight Range', value: '8,500-12,000 lbs' },
      { label: 'Price Range', value: '$60K-$110K' },
      { label: 'Best For', value: 'Lightweight Adventure' }
    ],
    limitations: 'Limited payload capacity, smaller garage spaces'
  }
];

export default function ToyHaulersPage() {
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

  // Generate structured data for Toy Hauler manufacturers
  const generateManufacturerSchema = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Toy Hauler Manufacturers 2025",
      "description": "Compare top toy hauler RV manufacturers with expert reviews, ratings, and detailed specifications for adventure-ready RVs with garage space.",
      "url": "https://rvgrader.com/manufacturers/toy-haulers",
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
                "name": "Toy Hauler RV",
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
          "name": "What is the best toy hauler manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Grand Design leads toy haulers with a 9.0 RV Grader Score, offering durable construction, innovative garage designs, and excellent build quality in their Momentum series."
          }
        },
        {
          "@type": "Question",
          "name": "How much do toy hauler RVs cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toy hauler RVs range from $35K-$200K+ depending on manufacturer and features. Travel trailer toy haulers start around $35K, while luxury fifth wheel toy haulers can exceed $200K."
          }
        },
        {
          "@type": "Question",
          "name": "What can you haul in a toy hauler?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Toy haulers can transport ATVs, motorcycles, side-by-sides, golf carts, kayaks, bicycles, and other recreational equipment in their rear garage area with ramp access."
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
          Best Toy Hauler Manufacturers - 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Adventure awaits with toy haulers that combine comfortable living spaces with 
          dedicated garages for your ATVs, motorcycles, and outdoor gear.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Size:</strong> 22 to 45 feet | <strong>Weight:</strong> 7,500 to 19,000 pounds | <strong>Price:</strong> $40K to $180K+
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
        <h2 className="text-2xl font-black text-black mb-4">Ready for your next adventure?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore our complete selection of toy haulers from these top manufacturers. 
          Find the perfect balance of living space and garage capacity for your toys and gear.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/rv?type=toy-hauler"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Browse Toy Haulers
          </Link>
          <Link 
            href="/blog/toy-hauler-buying-guide"
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
