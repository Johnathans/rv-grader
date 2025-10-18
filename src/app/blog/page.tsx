import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 RV Maintenance Tips for 2024',
    excerpt: 'Essential maintenance practices to keep your RV in perfect condition and avoid costly repairs. Learn from industry experts about preventive care.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Maintenance',
    featured: true
  },
  {
    id: 2,
    title: 'Understanding RV Warranties: What You Need to Know',
    excerpt: 'A comprehensive guide to RV warranties, what they cover, and how to make the most of your coverage. Navigate the complex world of RV protection.',
    author: 'Mike Chen',
    date: '2024-01-12',
    readTime: '8 min read',
    category: 'Warranties',
    featured: true
  },
  {
    id: 3,
    title: 'Class A vs Class C: Which Motorhome is Right for You?',
    excerpt: 'Compare the pros and cons of Class A and Class C motorhomes to make the best choice for your needs and budget.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Buying Guide',
    featured: true
  },
  {
    id: 4,
    title: 'Winter RV Storage: Complete Guide',
    excerpt: 'Protect your investment with proper winter storage techniques. Step-by-step instructions for winterizing your RV.',
    author: 'David Thompson',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Maintenance',
    featured: false
  },
  {
    id: 5,
    title: 'Best RV Parks for First-Time Travelers',
    excerpt: 'Discover beginner-friendly RV parks across the country with excellent amenities and helpful staff.',
    author: 'Lisa Park',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Travel',
    featured: false
  },
  {
    id: 6,
    title: 'Solar Power for RVs: Is It Worth It?',
    excerpt: 'Analyze the costs and benefits of installing solar panels on your RV. Real-world examples and ROI calculations.',
    author: 'Mark Stevens',
    date: '2024-01-03',
    readTime: '9 min read',
    category: 'Technology',
    featured: false
  }
];

const categories = ['All', 'Maintenance', 'Warranties', 'Buying Guide', 'Travel', 'Technology'];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-black mb-4">Fair RV Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Expert insights, maintenance tips, and industry news to help you make informed RV decisions
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full border border-gray-300 hover:border-primary hover:text-primary transition-colors font-medium"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-black mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => post.featured).map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img 
                  src={`https://picsum.photos/400/225?random=${post.id + 10}`}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-[#FF5C00] text-white text-xs px-2 py-1 rounded-full font-bold">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-3 hover:text-[#FF5C00] transition-colors">
                  <Link href={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <div>
        <h2 className="text-2xl font-black text-black mb-8">All Articles</h2>
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-32 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/128/80?random=${post.id + 20}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="inline-block bg-[#FF5C00] text-white text-xs px-2 py-1 rounded-full font-bold">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-2 hover:text-[#FF5C00] transition-colors">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-2">
                    {post.excerpt}
                  </p>
                  
                  <p className="text-sm text-gray-500">By {post.author}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gray-50 rounded-lg p-8 mt-16 text-center">
        <h2 className="text-2xl font-black text-black mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">Get the latest RV tips, reviews, and industry news delivered to your inbox.</p>
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors font-bold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
