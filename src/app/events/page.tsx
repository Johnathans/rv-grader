'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface RVEvent {
  id: string;
  name: string;
  location: string;
  venue: string;
  state: string;
  startDate: string;
  endDate: string;
  month: string;
  website?: string;
  type: 'supershow' | 'regional' | 'outdoor' | 'specialty';
}

export default function EventsPage() {
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedState, setSelectedState] = useState('all');

  // Sample RV events data based on the analyzed content
  const rvEvents: RVEvent[] = [
    {
      id: '1',
      name: 'Gulf Coast RV Show',
      location: 'Mobile, AL',
      venue: 'Mobile Convention Center',
      state: 'Alabama',
      startDate: '2025-01-03',
      endDate: '2025-01-05',
      month: 'January',
      website: 'https://www.rvsupershows.com/shows/mobile-',
      type: 'regional'
    },
    {
      id: '2',
      name: 'Arkansas Marine Expo',
      location: 'Little Rock, AR',
      venue: 'Statehouse Convention Center',
      state: 'Arkansas',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      month: 'January',
      type: 'outdoor'
    },
    {
      id: '3',
      name: 'Quartzsite Sports, Vacation & RV Show',
      location: 'Quartzsite, AZ',
      venue: 'Quartzsite Show Grounds',
      state: 'Arizona',
      startDate: '2025-01-18',
      endDate: '2025-01-26',
      month: 'January',
      website: 'http://www.quartzsitervshow.com/rv/rv-general-info',
      type: 'supershow'
    },
    {
      id: '4',
      name: 'Annual Manufacturers RV Show & Sale',
      location: 'Pleasanton, CA',
      venue: 'Alameda County Fairgrounds',
      state: 'California',
      startDate: '2025-01-24',
      endDate: '2025-02-02',
      month: 'January',
      type: 'supershow'
    },
    {
      id: '5',
      name: 'Alabama Huntsville RV Super Show',
      location: 'Huntsville, AL',
      venue: 'Von Braun Center',
      state: 'Alabama',
      startDate: '2025-01-31',
      endDate: '2025-02-02',
      month: 'January',
      type: 'supershow'
    },
    {
      id: '6',
      name: 'Northeast RV & Camping Show',
      location: 'Hartford, CT',
      venue: 'Connecticut Convention Center',
      state: 'Connecticut',
      startDate: '2025-01-31',
      endDate: '2025-02-02',
      month: 'January',
      type: 'regional'
    },
    {
      id: '7',
      name: 'Jacksonville RV Mega Show',
      location: 'Jacksonville, FL',
      venue: 'Jacksonville Equestrian Center',
      state: 'Florida',
      startDate: '2025-02-06',
      endDate: '2025-02-09',
      month: 'February',
      type: 'supershow'
    },
    {
      id: '8',
      name: 'Birmingham RV Super Show',
      location: 'Birmingham, AL',
      venue: 'Birmingham-Jefferson Civic Center',
      state: 'Alabama',
      startDate: '2025-02-14',
      endDate: '2025-02-16',
      month: 'February',
      type: 'supershow'
    },
    {
      id: '9',
      name: 'Mega RV Show',
      location: 'San Diego, CA',
      venue: 'Snapdragon Stadium',
      state: 'California',
      startDate: '2025-02-19',
      endDate: '2025-02-23',
      month: 'February',
      type: 'supershow'
    },
    {
      id: '10',
      name: 'West Palm Beach RV Show',
      location: 'West Palm Beach, FL',
      venue: 'South Florida Fairgrounds',
      state: 'Florida',
      startDate: '2025-02-20',
      endDate: '2025-02-23',
      month: 'February',
      type: 'regional'
    },
    {
      id: '11',
      name: 'Arkansas RV Show',
      location: 'Little Rock, AR',
      venue: 'Statehouse Convention Center',
      state: 'Arkansas',
      startDate: '2025-02-21',
      endDate: '2025-02-23',
      month: 'February',
      type: 'regional'
    },
    {
      id: '12',
      name: 'The Great Alaska Sportsman Show',
      location: 'Anchorage, AK',
      venue: 'Dena\'ina Civic and Convention Center',
      state: 'Alaska',
      startDate: '2025-03-07',
      endDate: '2025-03-09',
      month: 'March',
      type: 'outdoor'
    },
    {
      id: '13',
      name: 'The Sun RV & Camping Show',
      location: 'Uncasville, CT',
      venue: 'Mohegan Sun Earth Expo and Convention Center',
      state: 'Connecticut',
      startDate: '2025-03-14',
      endDate: '2025-03-16',
      month: 'March',
      type: 'regional'
    },
    {
      id: '14',
      name: 'Orlando RV Show',
      location: 'Orlando, FL',
      venue: 'Osceola Heritage Park',
      state: 'Florida',
      startDate: '2025-03-13',
      endDate: '2025-03-16',
      month: 'March',
      type: 'regional'
    },
    {
      id: '15',
      name: 'Phoenix RV Supershow',
      location: 'Phoenix, AZ',
      venue: 'Phoenix Raceway',
      state: 'Arizona',
      startDate: '2025-03-21',
      endDate: '2025-03-23',
      month: 'March',
      type: 'supershow'
    },
    {
      id: '16',
      name: 'COLORADO RV+OGX SHOW',
      location: 'Denver, CO',
      venue: 'Colorado Convention Center',
      state: 'Colorado',
      startDate: '2025-03-27',
      endDate: '2025-03-29',
      month: 'March',
      type: 'supershow'
    }
  ];

  const months = ['all', 'January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];

  const states = ['all', ...Array.from(new Set(rvEvents.map(event => event.state))).sort()];

  const filteredEvents = rvEvents.filter(event => {
    const monthMatch = selectedMonth === 'all' || event.month === selectedMonth;
    const stateMatch = selectedState === 'all' || event.state === selectedState;
    return monthMatch && stateMatch;
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'supershow': return 'bg-[#FF5C00] text-white';
      case 'regional': return 'bg-gray-100 text-gray-800';
      case 'outdoor': return 'bg-green-100 text-green-800';
      case 'specialty': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'supershow': return 'Super Show';
      case 'regional': return 'Regional';
      case 'outdoor': return 'Outdoor Expo';
      case 'specialty': return 'Specialty';
      default: return 'Event';
    }
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}, 2025`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, 2025`;
    }
  };

  // Generate structured data for events
  const generateEventSchema = () => {
    const eventListSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "RV Shows & Events 2025",
      "description": "Find RV shows, rallies, and events across the United States. Compare dates, locations, and event types to plan your RV adventures.",
      "url": "https://rvgrader.com/events",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": filteredEvents.map((event, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Event",
            "name": event.name,
            "startDate": event.startDate,
            "endDate": event.endDate,
            "location": {
              "@type": "Place",
              "name": event.venue,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": event.location.split(', ')[0],
                "addressRegion": event.state
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "RV Industry Association"
            },
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "description": `${event.name} - ${event.type} RV event in ${event.location}`,
            "url": event.website || "https://rvgrader.com/events"
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
          "name": "When are the best RV shows in 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Major RV shows run year-round with peak seasons in January-March and September-November. Popular events include Quartzsite Sports & RV Show (January), Tampa RV SuperShow (January), and Hershey RV Show (September)."
          }
        },
        {
          "@type": "Question",
          "name": "What should I bring to an RV show?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bring comfortable walking shoes, a notebook for taking notes, measuring tape, business cards from dealers, and a list of must-have features. Many shows offer free admission and parking."
          }
        },
        {
          "@type": "Question",
          "name": "Are RV show prices better than dealer lots?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "RV shows often feature special pricing, exclusive deals, and manufacturer incentives not available elsewhere. You can compare multiple brands and models in one location, making it easier to negotiate."
          }
        }
      ]
    };

    return [eventListSchema, faqSchema];
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateEventSchema())
          }}
        />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
          RV Shows & Events 2025
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
          Discover the latest RVs, meet manufacturers, and connect with the RV community 
          at shows and events across the country.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Month Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Filter by Month
            </label>
            <div className="flex flex-wrap gap-2">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedMonth === month
                      ? 'bg-[#FF5C00] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {month === 'all' ? 'All Months' : month}
                </button>
              ))}
            </div>
          </div>

          {/* State Filter */}
          <div className="w-full sm:w-64">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Filter by State
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state === 'all' ? 'All States' : state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredEvents.length}</span> events
          {selectedMonth !== 'all' && ` in ${selectedMonth}`}
          {selectedState !== 'all' && ` in ${selectedState}`}
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
            {/* Event Type Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                {getEventTypeLabel(event.type)}
              </span>
              <span className="text-sm font-medium text-gray-500">
                {formatDateRange(event.startDate, event.endDate)}
              </span>
            </div>

            {/* Event Name */}
            <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">
              {event.name}
            </h3>

            {/* Location */}
            <div className="space-y-1 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{event.location}</span>
              </p>
              <p className="text-sm text-gray-500">
                {event.venue}
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-auto">
              {event.website ? (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#FF5C00] hover:text-[#E64A00] font-medium text-sm transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <span className="text-sm text-gray-400">Details coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters to see more events.
          </p>
          <button
            onClick={() => {
              setSelectedMonth('all');
              setSelectedState('all');
            }}
            className="bg-[#FF5C00] text-white px-6 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">RV Show Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Before You Go</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Check the show website for floorplans and vendor lists</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Create a plan of action for large shows to avoid feeling overwhelmed</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Look for educational seminars on travel, maintenance, and buying tips</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Bring comfortable walking shoes and dress in layers</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">At the Show</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Visit on weekdays for smaller crowds and more personal attention</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Negotiate better deals towards the end of the show</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Take photos and notes to compare options later</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">✓</span>
                <span className="text-gray-700">Ask about financing options and warranty coverage</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-4">Planning to buy an RV?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Use our tools to research RV values, calculate costs, and compare manufacturers 
          before you visit the show.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/compare"
            className="bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            Compare RVs
          </Link>
          <Link 
            href="/depreciation"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Value Calculator
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
