import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 RV Maintenance Tips for 2024',
    excerpt: 'Essential maintenance practices to keep your RV in perfect condition and avoid costly repairs.',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Maintenance'
  },
  {
    id: 2,
    title: 'Understanding RV Warranties: What You Need to Know',
    excerpt: 'A comprehensive guide to RV warranties, what they cover, and how to make the most of your coverage.',
    author: 'Mike Chen',
    date: '2024-01-12',
    readTime: '8 min read',
    category: 'Warranties'
  },
  {
    id: 3,
    title: 'Class A vs Class C: Which Motorhome is Right for You?',
    excerpt: 'Compare the pros and cons of Class A and Class C motorhomes to make the best choice for your needs.',
    author: 'Emily Rodriguez',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Buying Guide'
  }
];

export default function BlogSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-black text-black mb-4">Latest from Our Blog</h2>
            <p className="text-gray-600 font-medium">
              Expert insights, maintenance tips, and RV industry news
            </p>
          </div>
          <Link
            href="/blog"
            className="bg-[#FF5C00] text-white px-6 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-bold"
          >
            View All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img 
                  src={`https://picsum.photos/400/225?random=${post.id}`}
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
                
                <p className="text-gray-600 mb-4 line-clamp-3">
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
    </section>
  );
}
