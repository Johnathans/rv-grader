'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Sample blog post data - in a real app, this would come from an API or CMS
const sampleBlogPosts = [
  {
    id: 1,
    slug: 'rv-maintenance-checklist-2024',
    title: 'The Ultimate RV Maintenance Checklist for 2024',
    excerpt: 'Keep your RV in top condition with this comprehensive maintenance guide covering everything from engine care to interior upkeep.',
    content: `
      <p>Maintaining your RV is crucial for ensuring safe travels and preserving your investment. This comprehensive checklist will help you stay on top of essential maintenance tasks throughout the year.</p>
      
      <h2>Monthly Maintenance Tasks</h2>
      <p>Every month, you should inspect your RV's exterior for any signs of damage, check tire pressure and tread depth, and test all electrical systems including lights and battery levels.</p>
      
      <h3>Exterior Inspection</h3>
      <ul>
        <li>Check for cracks in the roof or sidewalls</li>
        <li>Inspect seals around windows and doors</li>
        <li>Clean and lubricate slide-out mechanisms</li>
        <li>Test awning operation and inspect fabric</li>
      </ul>
      
      <h3>Interior Systems</h3>
      <ul>
        <li>Test smoke and carbon monoxide detectors</li>
        <li>Check water pump and plumbing connections</li>
        <li>Inspect propane system and connections</li>
        <li>Clean air conditioning filters</li>
      </ul>
      
      <h2>Seasonal Maintenance</h2>
      <p>Seasonal maintenance is equally important. Before each camping season, perform a thorough inspection of all systems, change fluids, and test appliances.</p>
      
      <h3>Spring Preparation</h3>
      <p>After winter storage, your RV needs special attention. Check for any damage from freezing temperatures, inspect the roof for winter damage, and ensure all systems are functioning properly.</p>
      
      <h3>Winterization</h3>
      <p>Proper winterization protects your RV during cold months. This includes draining water systems, adding antifreeze, and protecting exterior surfaces from harsh weather.</p>
      
      <h2>Professional Maintenance</h2>
      <p>While many maintenance tasks can be done yourself, some require professional attention. Annual inspections by certified technicians can catch problems early and ensure your RV remains safe and reliable.</p>
    `,
    author: 'Sarah Johnson',
    authorBio: 'Sarah is a certified RV technician with over 10 years of experience in RV maintenance and repair.',
    authorImage: 'https://picsum.photos/64/64?random=101',
    date: '2024-01-15',
    category: 'Maintenance',
    readTime: '8 min read',
    featured: true,
    tags: ['maintenance', 'checklist', 'safety', 'DIY'],
    image: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 2,
    slug: 'best-rv-parks-national-parks-2024',
    title: 'Best RV Parks Near National Parks in 2024',
    excerpt: 'Discover the top RV parks and campgrounds located near America\'s most beautiful national parks.',
    content: `
      <p>Planning an RV trip to national parks requires careful consideration of where to stay. Here are the best RV parks and campgrounds near popular national parks.</p>
      
      <h2>Yellowstone National Park</h2>
      <p>Yellowstone offers several excellent RV camping options both inside and outside the park boundaries.</p>
      
      <h3>Inside the Park</h3>
      <ul>
        <li>Grant Village Campground - Full hookups available</li>
        <li>Fishing Bridge RV Park - Hard-sided RVs only</li>
        <li>Bridge Bay Campground - Some sites with hookups</li>
      </ul>
      
      <h3>Outside the Park</h3>
      <ul>
        <li>West Yellowstone KOA - Full amenities and activities</li>
        <li>Grizzly RV Park - Close to west entrance</li>
        <li>Buffalo Crossing RV Park - Modern facilities</li>
      </ul>
      
      <h2>Grand Canyon National Park</h2>
      <p>The Grand Canyon area offers numerous RV-friendly campgrounds with varying levels of amenities.</p>
      
      <h2>Booking Tips</h2>
      <p>National park campgrounds fill up quickly, especially during peak season. Make reservations well in advance and consider staying at private campgrounds nearby for more flexibility.</p>
    `,
    author: 'Mike Rodriguez',
    authorBio: 'Mike is a full-time RVer who has visited over 40 national parks in his motorhome.',
    authorImage: 'https://picsum.photos/64/64?random=102',
    date: '2024-01-10',
    category: 'Travel',
    readTime: '6 min read',
    featured: true,
    tags: ['travel', 'national parks', 'campgrounds', 'planning'],
    image: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 3,
    slug: 'rv-insurance-guide-2024',
    title: 'Complete Guide to RV Insurance in 2024',
    excerpt: 'Everything you need to know about RV insurance, from coverage types to cost-saving tips.',
    content: `
      <p>RV insurance is essential for protecting your investment and ensuring peace of mind on the road. This guide covers everything you need to know about RV insurance.</p>
      
      <h2>Types of RV Insurance Coverage</h2>
      <p>Understanding the different types of coverage available will help you choose the right policy for your needs.</p>
      
      <h3>Liability Coverage</h3>
      <p>Liability coverage is required in most states and covers damage you cause to other people or property.</p>
      
      <h3>Comprehensive Coverage</h3>
      <p>Comprehensive coverage protects against theft, vandalism, weather damage, and other non-collision incidents.</p>
      
      <h3>Collision Coverage</h3>
      <p>Collision coverage pays for damage to your RV in the event of an accident, regardless of who is at fault.</p>
      
      <h2>Factors Affecting RV Insurance Costs</h2>
      <ul>
        <li>Type and value of RV</li>
        <li>Your driving record</li>
        <li>How often you use the RV</li>
        <li>Where you store the RV</li>
        <li>Your location and age</li>
      </ul>
      
      <h2>Money-Saving Tips</h2>
      <p>There are several ways to reduce your RV insurance premiums without sacrificing coverage.</p>
    `,
    author: 'Lisa Chen',
    authorBio: 'Lisa is an insurance specialist who focuses on recreational vehicle coverage and claims.',
    authorImage: 'https://picsum.photos/64/64?random=103',
    date: '2024-01-05',
    category: 'Insurance',
    readTime: '10 min read',
    featured: false,
    tags: ['insurance', 'protection', 'costs', 'coverage'],
    image: 'https://picsum.photos/800/400?random=3'
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = sampleBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-black mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog" className="bg-[#FF5C00] text-white px-6 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-bold">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Get related posts (excluding current post)
  const relatedPosts = sampleBlogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-[#FF5C00]">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-[#FF5C00]">Blog</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <span className="inline-block bg-[#FF5C00] text-white text-sm px-3 py-1 rounded-full font-bold">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-gray-600 mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src={post.authorImage}
              alt={post.author}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold text-black">{post.author}</p>
              <p className="text-sm">{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>{post.readTime}</span>
            <div className="flex gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-w-16 aspect-h-9 mb-8">
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-lg p-6 mb-12">
        <div className="flex items-start">
          <img 
            src={post.authorImage}
            alt={post.author}
            className="w-16 h-16 rounded-full mr-4 flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-bold text-black mb-2">About {post.author}</h3>
            <p className="text-gray-600">{post.authorBio}</p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black text-black mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <span className="inline-block bg-[#FF5C00] text-white text-xs px-2 py-1 rounded-full font-bold mb-2">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-black mb-2 group-hover:text-[#FF5C00] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t border-gray-200">
        <Link 
          href="/blog"
          className="flex items-center text-gray-600 hover:text-[#FF5C00] transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Blog
        </Link>
        
        <div className="flex gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
            Share
          </button>
          <button className="bg-[#FF5C00] text-white px-4 py-2 rounded-lg hover:bg-[#E64A00] transition-colors font-bold">
            Subscribe
          </button>
        </div>
      </div>
    </article>
  );
}
