import Link from 'next/link';

interface UpcomingEvent {
  id: string;
  name: string;
  location: string;
  state: string;
  startDate: string;
  endDate: string;
  type: 'supershow' | 'regional' | 'outdoor' | 'specialty';
}

export default function UpcomingEvents() {
  // Featured upcoming events
  const upcomingEvents: UpcomingEvent[] = [
    {
      id: '1',
      name: 'Gulf Coast RV Show',
      location: 'Mobile, AL',
      state: 'Alabama',
      startDate: '2025-01-03',
      endDate: '2025-01-05',
      type: 'regional'
    },
    {
      id: '2',
      name: 'Quartzsite Sports, Vacation & RV Show',
      location: 'Quartzsite, AZ',
      state: 'Arizona',
      startDate: '2025-01-18',
      endDate: '2025-01-26',
      type: 'supershow'
    },
    {
      id: '3',
      name: 'Annual Manufacturers RV Show & Sale',
      location: 'Pleasanton, CA',
      state: 'California',
      startDate: '2025-01-24',
      endDate: '2025-02-02',
      type: 'supershow'
    },
    {
      id: '4',
      name: 'Jacksonville RV Mega Show',
      location: 'Jacksonville, FL',
      state: 'Florida',
      startDate: '2025-02-06',
      endDate: '2025-02-09',
      type: 'supershow'
    }
  ];

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Upcoming RV Shows & Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest RVs and connect with manufacturers at shows across the country
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              {/* Event Type Badge */}
              <div className="flex justify-between items-start mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                  {getEventTypeLabel(event.type)}
                </span>
              </div>

              {/* Event Name */}
              <h3 className="text-lg font-bold text-black mb-2 line-clamp-2">
                {event.name}
              </h3>

              {/* Location */}
              <p className="text-sm text-gray-600 mb-3">
                {event.location}
              </p>

              {/* Date */}
              <p className="text-sm font-medium text-gray-900">
                {formatDateRange(event.startDate, event.endDate)}
              </p>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link 
            href="/events"
            className="inline-flex items-center bg-[#FF5C00] text-white px-8 py-3 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            View All Events
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
