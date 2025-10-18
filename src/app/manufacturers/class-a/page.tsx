'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// Class A Motorhome manufacturer data
const manufacturers = [
  {
    id: 1,
    name: 'Winnebago',
    tagline: 'Our pick for innovation and reliability',
    featured: true,
    rating: 4.7,
    rvGraderScore: 9.3,
    logo: 'https://picsum.photos/200/100?random=1',
    description: 'Winnebago Industries has been a leader in the RV industry since 1958, known for their innovative designs, quality construction, and excellent customer service. Their Class A motorhomes range from entry-level to luxury coaches, featuring advanced technology, superior build quality, and comprehensive warranties. Winnebago consistently ranks among the top manufacturers for reliability and resale value.',
    highlights: [
      'Industry leader since 1958 with proven track record',
      'Superior build quality and innovative designs',
      'Comprehensive warranty coverage',
      'Excellent resale value retention',
      'Advanced technology integration'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '26-45 feet' },
      { label: 'Weight Range', value: '13,000-30,000 lbs' },
      { label: 'Price Range', value: '$150K-$500K+' },
      { label: 'Best For', value: 'Reliability & Innovation' }
    ],
    limitations: 'Premium pricing, limited customization options'
  },
  {
    id: 2,
    name: 'Newmar',
    tagline: 'Our pick for luxury and craftsmanship',
    featured: false,
    rating: 4.8,
    rvGraderScore: 9.3,
    logo: 'https://picsum.photos/200/100?random=2',
    description: 'Newmar Corporation is renowned for building some of the finest luxury Class A motorhomes in the industry. Founded in 1968, they focus on premium materials, meticulous craftsmanship, and attention to detail. Their coaches feature high-end finishes, powerful chassis options, and exceptional customer service through their extensive dealer network.',
    highlights: [
      'Premium luxury construction and materials',
      'Meticulous attention to detail and craftsmanship',
      'Powerful chassis options for superior performance',
      'Extensive dealer network for service support',
      'High-end interior finishes and amenities'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '32-45 feet' },
      { label: 'Weight Range', value: '18,000-30,000 lbs' },
      { label: 'Price Range', value: '$200K-$800K+' },
      { label: 'Best For', value: 'Luxury & Craftsmanship' }
    ],
    limitations: 'High price point, limited entry-level options'
  },
  {
    id: 3,
    name: 'Tiffin Motorhomes',
    tagline: 'Our pick for value and customer service',
    featured: false,
    rating: 4.6,
    rvGraderScore: 8.9,
    logo: 'https://picsum.photos/200/100?random=3',
    description: 'Tiffin Motorhomes has built a reputation for exceptional customer service and solid construction since 1972. They offer a range of Class A motorhomes from affordable entry-level to luxury coaches. Known for their responsive customer service, quality construction, and strong owner community support.',
    highlights: [
      'Exceptional customer service and support',
      'Strong owner community and loyalty',
      'Quality construction at competitive prices',
      'Wide range from entry-level to luxury',
      'Responsive warranty service'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '28-40 feet' },
      { label: 'Weight Range', value: '15,000-28,000 lbs' },
      { label: 'Price Range', value: '$120K-$400K' },
      { label: 'Best For', value: 'Value & Service' }
    ],
    limitations: 'Some quality control issues, limited high-end options'
  },
  {
    id: 4,
    name: 'Fleetwood RV',
    tagline: 'Our pick for affordability and variety',
    featured: false,
    rating: 4.2,
    rvGraderScore: 7.8,
    logo: 'https://picsum.photos/200/100?random=4',
    description: 'Fleetwood RV offers a wide variety of Class A motorhomes at competitive price points, making RV ownership accessible to more people. They focus on practical designs, good value for money, and a broad dealer network. While not the most luxurious, they provide solid construction and reliable performance.',
    highlights: [
      'Competitive pricing and good value',
      'Wide variety of floor plans and sizes',
      'Broad dealer network for service',
      'Practical and functional designs',
      'Good entry point for first-time buyers'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '26-38 feet' },
      { label: 'Weight Range', value: '13,000-25,000 lbs' },
      { label: 'Price Range', value: '$100K-$300K' },
      { label: 'Best For', value: 'Affordability & Variety' }
    ],
    limitations: 'Basic interior finishes, average build quality'
  },
  {
    id: 5,
    name: 'Thor Motor Coach',
    tagline: 'Our pick for modern features and technology',
    featured: false,
    rating: 4.3,
    rvGraderScore: 8.1,
    logo: 'https://picsum.photos/200/100?random=5',
    description: 'Thor Motor Coach focuses on incorporating modern technology and contemporary designs into their Class A motorhomes. They offer good value with modern amenities, updated styling, and competitive pricing. Known for staying current with technology trends and offering practical solutions.',
    highlights: [
      'Modern technology integration',
      'Contemporary styling and designs',
      'Competitive pricing for features offered',
      'Good warranty coverage',
      'Regular model updates and improvements'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '28-42 feet' },
      { label: 'Weight Range', value: '14,000-28,000 lbs' },
      { label: 'Price Range', value: '$110K-$350K' },
      { label: 'Best For', value: 'Modern Features & Tech' }
    ],
    limitations: 'Build quality inconsistencies, limited luxury options'
  },
  {
    id: 6,
    name: 'Forest River RV',
    tagline: 'Our pick for budget-conscious buyers',
    featured: false,
    rating: 4.0,
    rvGraderScore: 7.5,
    logo: 'https://picsum.photos/200/100?random=6',
    description: 'Forest River RV is one of the largest RV manufacturers, offering Class A motorhomes at very competitive prices. They focus on making RV ownership affordable while providing decent quality and a wide variety of floor plans. Good option for budget-conscious buyers or first-time RV owners.',
    highlights: [
      'Very competitive pricing',
      'Wide variety of floor plans',
      'Large dealer network',
      'Good entry-level options',
      'Frequent sales and promotions'
    ],
    keyFeatures: [
      { label: 'Size Range', value: '26-40 feet' },
      { label: 'Weight Range', value: '13,000-26,000 lbs' },
      { label: 'Price Range', value: '$90K-$280K' },
      { label: 'Best For', value: 'Budget & First-Time Buyers' }
    ],
    limitations: 'Basic construction, limited premium features'
  }
];

export default function ClassAPage() {
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
        <span className="text-xs text-gray-600 mt-1 font-medium text-center">RV Grader Score</span>
      </div>
    );
  };

  // Generate structured data for manufacturers
  const generateManufacturerSchema = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Best Class A Motorhome Manufacturers 2025",
      "description": "Compare top Class A motorhome manufacturers with expert reviews, ratings, and detailed specifications.",
      "url": "https://rvgrader.com/manufacturers/class-a",
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
                "name": "Class A Motorhome",
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
          "name": "What is the best Class A motorhome manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Winnebago and Newmar are top-rated Class A manufacturers with RV Grader Scores of 9.3. Winnebago excels in innovation and reliability, while Newmar leads in luxury and craftsmanship."
          }
        },
        {
          "@type": "Question",
          "name": "How much do Class A motorhomes cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Class A motorhomes range from $90K-$800K+ depending on manufacturer and features. Budget options start around $90K (Forest River), while luxury coaches can exceed $800K (Newmar)."
          }
        },
        {
          "@type": "Question",
          "name": "What should I look for in a Class A motorhome manufacturer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Consider build quality, warranty coverage, dealer network, customer service reputation, resale value, and RV Grader Score. Top manufacturers score 8.5+ and offer comprehensive warranties."
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
          Best Class A Motorhome Manufacturers - 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          The biggest motorized RVs on the market, Class As are like giant homes on wheels. 
          Compare top manufacturers to find the perfect luxury coach for your adventures.
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <strong>Size:</strong> 26 to 45 feet | <strong>Weight:</strong> 13,000 to 30,000 pounds | <strong>Price:</strong> $90K to $800K+
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
        <h2 className="text-2xl font-black text-black mb-4">Ready to find your perfect Class A motorhome?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Browse our complete database of Class A motorhomes from these top manufacturers. 
          Compare features, prices, and specifications to make the best choice for your RV adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/rv?type=class-a"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Browse Class A RVs
          </Link>
          <Link 
            href="/blog/class-a-motorhome-buying-guide"
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
