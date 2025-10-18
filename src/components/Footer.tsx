import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-2">
                <span className="text-teal-500 text-3xl font-bold mr-3">✓</span>
                <h3 className="text-3xl font-black text-black">RV Grader</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Your trusted source for RV reviews, maintenance insights, and warranty information. 
                Make informed decisions with our comprehensive RV Grader scoring system.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-600 hover:text-primary transition-colors">
                  Search RVs
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-gray-600 hover:text-primary transition-colors">
                  Compare Models
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/maintenance" className="text-gray-600 hover:text-primary transition-colors">
                  Maintenance Guide
                </Link>
              </li>
              <li>
                <Link href="/warranties" className="text-gray-600 hover:text-primary transition-colors">
                  Warranty Info
                </Link>
              </li>
              <li>
                <Link href="/scoring" className="text-gray-600 hover:text-primary transition-colors">
                  RV Grader Score
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 RV Grader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
