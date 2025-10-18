import Link from 'next/link';

const rvCategories = [
  {
    name: 'Class A Motorhomes',
    description: 'Large, luxury motorhomes with full amenities',
    icon: 'A',
    count: '150+ models'
  },
  {
    name: 'Class B Motorhomes',
    description: 'Compact, van-based motorhomes for easy travel',
    icon: 'B',
    count: '80+ models'
  },
  {
    name: 'Class C Motorhomes',
    description: 'Mid-size motorhomes with overhead cab',
    icon: 'C',
    count: '120+ models'
  },
  {
    name: 'Travel Trailers',
    description: 'Towable RVs for flexible camping',
    icon: 'TT',
    count: '200+ models'
  },
  {
    name: 'Fifth Wheels',
    description: 'Large towable RVs with spacious interiors',
    icon: '5W',
    count: '90+ models'
  },
  {
    name: 'Toy Haulers',
    description: 'RVs with garage space for recreational vehicles',
    icon: 'TH',
    count: '60+ models'
  }
];

export default function RVCategories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-black mb-4">Browse RV Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Explore different types of RVs and find the perfect match for your travel style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rvCategories.map((category) => (
            <Link
              key={category.name}
              href={`/search?category=${encodeURIComponent(category.name.toLowerCase())}`}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all border border-gray-200 group hover:border-[#FFD1B8]"
            >
              <div className="w-16 h-16 bg-[#FFF4F0] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#FFE8DC] transition-colors">
                <span className="text-[#FF5C00] font-black text-xl">{category.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-[#FF5C00] transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 mb-3">{category.description}</p>
              <p className="text-sm text-[#FF5C00] font-bold">{category.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
