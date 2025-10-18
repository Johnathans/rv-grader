'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Class B Motorhome manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Winnebago',
    tagline: 'Our pick for innovation and versatility',
    featured: true,
    rating: 4.6,
    rvGraderScore: 9.0,
    logo: 'https://picsum.photos/200/100?random=11',
    description: 'Winnebago leads the Class B market with innovative designs like the Revel 4x4 and Solis series. Their camper vans feature smart layouts, quality construction, and advanced technology integration. Known for pushing boundaries in compact RV design while maintaining reliability and functionality.',
    highlights: [
      '4x4 capability available on select models',
      'Innovative space-saving designs',
      'Advanced technology integration',
      'Strong resale value retention',
      'Comprehensive warranty coverage'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '19-24 feet' },
      { label: 'Weight Range', value: '8,000-11,000 lbs' },
      { label: 'Price Range', value: '$120K-$200K' },
      { label: 'Best For', value: 'Innovation & Adventure' }
    ],
    limitations: 'Premium pricing, limited interior space'
  },
  {
    id: 2,
    name: 'Airstream',
    tagline: 'Our pick for iconic design and quality',
    featured: false,
    rating: 4.8,
    rvGraderScore: 9.2,
    logo: 'https://picsum.photos/200/100?random=12',
    description: 'Airstream brings their legendary aluminum construction and timeless design to the Class B market with the Interstate series. Built on Mercedes-Benz Sprinter chassis, these premium camper vans offer luxury finishes, superior build quality, and the iconic Airstream styling.',
    highlights: [
      'Iconic aluminum construction and design',
      'Mercedes-Benz Sprinter chassis reliability',
      'Premium luxury finishes throughout',
      'Exceptional build quality and durability',
      'Strong brand recognition and resale value'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '19-24 feet' },
      { label: 'Weight Range', value: '9,000-11,500 lbs' },
      { label: 'Price Range', value: '$180K-$250K+' },
      { label: 'Best For', value: 'Luxury & Prestige' }
    ],
    limitations: 'Very high price point, limited customization'
  },
  {
    id: 3,
    name: 'Pleasure-Way',
    tagline: 'Our pick for Canadian craftsmanship',
    featured: false,
    rating: 4.5,
    rvGraderScore: 8.7,
    logo: 'https://picsum.photos/200/100?random=13',
    description: 'Pleasure-Way Industries is a Canadian manufacturer known for exceptional craftsmanship and attention to detail in their Class B motorhomes. They offer both Mercedes-Benz Sprinter and Ford Transit-based models with high-quality construction and thoughtful design features.',
    highlights: [
      'Exceptional Canadian craftsmanship',
      'Multiple chassis options available',
      'High-quality interior materials',
      'Thoughtful design and layout',
      'Strong dealer support network'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '19-24 feet' },
      { label: 'Weight Range', value: '8,500-11,000 lbs' },
      { label: 'Price Range', value: '$140K-$220K' },
      { label: 'Best For', value: 'Craftsmanship & Quality' }
    ],
    limitations: 'Limited dealer network in US, higher pricing'
  },
  {
    id: 4,
    name: 'Roadtrek',
    tagline: 'Our pick for compact efficiency',
    featured: false,
    rating: 4.2,
    rvGraderScore: 8.1,
    logo: 'https://picsum.photos/200/100?random=14',
    description: 'Roadtrek specializes in compact, efficient Class B motorhomes that maximize every inch of space. Known for practical layouts, good build quality, and competitive pricing. They offer various chassis options and focus on functionality over luxury.',
    highlights: [
      'Efficient use of compact space',
      'Practical and functional layouts',
      'Multiple chassis options',
      'Competitive pricing for the segment',
      'Good fuel economy performance'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '19-22 feet' },
      { label: 'Weight Range', value: '7,500-9,500 lbs' },
      { label: 'Price Range', value: '$100K-$160K' },
      { label: 'Best For', value: 'Efficiency & Value' }
    ],
    limitations: 'Basic interior finishes, limited luxury features'
  },
  {
    id: 5,
    name: 'Leisure Travel Vans',
    tagline: 'Our pick for luxury and comfort',
    featured: false,
    rating: 4.7,
    rvGraderScore: 8.9,
    logo: 'https://picsum.photos/200/100?random=15',
    description: 'Leisure Travel Vans focuses on luxury Class B+ motorhomes with expanded living space and premium amenities. Their Unity and Wonder series offer more interior room than traditional Class Bs while maintaining maneuverability and fuel efficiency.',
    highlights: [
      'Class B+ design with expanded space',
      'Premium luxury appointments',
      'Murphy bed and slide-out options',
      'High-end appliances and finishes',
      'Excellent customer service reputation'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '24-28 feet' },
      { label: 'Weight Range', value: '10,000-14,000 lbs' },
      { label: 'Price Range', value: '$160K-$280K' },
      { label: 'Best For', value: 'Luxury & Space' }
    ],
    limitations: 'Higher price point, larger size reduces maneuverability'
  },
  {
    id: 6,
    name: 'Thor Motor Coach',
    tagline: 'Our pick for modern features',
    featured: false,
    rating: 4.1,
    rvGraderScore: 7.8,
    logo: 'https://picsum.photos/200/100?random=16',
    description: 'Thor Motor Coach offers Class B motorhomes with modern technology and contemporary styling at competitive prices. Their Sequence and Tellaro series feature updated designs, good value for money, and practical layouts for everyday use.',
    highlights: [
      'Modern technology integration',
      'Contemporary styling and design',
      'Competitive pricing structure',
      'Good warranty coverage',
      'Wide dealer network'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '20-24 feet' },
      { label: 'Weight Range', value: '8,000-10,500 lbs' },
      { label: 'Price Range', value: '$110K-$170K' },
      { label: 'Best For', value: 'Modern Features & Value' }
    ],
    limitations: 'Build quality inconsistencies, basic interior materials'
  }
];

export default function ClassBPage() {
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

  // Generate structured data for Class B manufacturers
  const generateManufacturerSchema = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Class B Motorhome Manufacturers 2025",
      "description": "Compare top Class B motorhome and camper van manufacturers with expert reviews, ratings, and detailed specifications.",
      "url": "https://rvgrader.com/manufacturers/class-b",
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
                "name": "Class B Motorhome",
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
          "name": "What is the best Class B motorhome manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Winnebago leads Class B motorhomes with a 9.0 RV Grader Score, offering innovative designs like the Revel 4x4 and Solis series with advanced technology and quality construction."
          }
        },
        {
          "@type": "Question",
          "name": "How much do Class B motorhomes cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Class B motorhomes range from $80K-$200K+ depending on manufacturer and features. Entry-level models start around $80K, while luxury camper vans can exceed $200K."
          }
        },
        {
          "@type": "Question",
          "name": "What are the advantages of Class B motorhomes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Class B motorhomes offer easy driving and parking, better fuel economy than larger RVs, stealth camping capability, and can serve as daily drivers when not camping."
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
          Best Class B Motorhome Manufacturers - 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Often called camper vans, Class Bs are compact but mighty. These versatile RVs offer 
          great fuel economy, easy parking, and the freedom to go anywhere.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Size:</strong> 17 to 23 feet | <strong>Weight:</strong> 4,000 to 9,000 pounds | <strong>Price:</strong> $100K to $280K+
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
        <h2 className="text-2xl font-black text-black mb-4">Ready to explore Class B motorhomes?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Discover the freedom of camper van life with our complete database of Class B motorhomes. 
          Perfect for couples and small families who want to go anywhere.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/rv?type=class-b"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Browse Class B RVs
          </Link>
          <Link 
            href="/blog/class-b-motorhome-buying-guide"
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
