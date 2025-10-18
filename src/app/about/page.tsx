import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-black mb-4">About Fair RV</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
          Your trusted source for unbiased RV reviews, maintenance insights, and warranty information
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-black mb-6">Our Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-4">
            At Fair RV, we believe that buying an RV should be an informed decision based on comprehensive, 
            unbiased information. Our mission is to provide RV enthusiasts with the data they need to make 
            smart purchasing decisions by evaluating every aspect of RV ownership.
          </p>
          <p className="text-gray-600">
            We analyze maintenance costs, common mechanical issues, warranty coverage, and overall value 
            to create our proprietary Fair RV Score - a comprehensive rating system that gives you the 
            complete picture of RV ownership costs and reliability.
          </p>
        </div>
      </div>

      {/* Fair RV Score Section */}
      <div className="mb-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-black text-black mb-6">The Fair RV Score</h2>
        <p className="text-gray-600 mb-6">
          Our Fair RV Score is calculated using five key factors that matter most to RV owners:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm mr-3">
                1
              </div>
              <h3 className="font-semibold text-black">Reliability</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Based on owner reports, recall data, and industry reliability metrics
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm mr-3">
                2
              </div>
              <h3 className="font-semibold text-black">Maintenance Costs</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Average annual maintenance expenses and frequency of required services
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm mr-3">
                3
              </div>
              <h3 className="font-semibold text-black">Warranty Coverage</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Comprehensiveness and duration of manufacturer warranties
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm mr-3">
                4
              </div>
              <h3 className="font-semibold text-black">Value Retention</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Resale value and depreciation rates compared to similar models
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 md:col-span-2">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-black text-sm mr-3">
                5
              </div>
              <h3 className="font-semibold text-black">Features & Quality</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Build quality, included features, and overall value proposition
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-black mb-6">Our Team</h2>
        <p className="text-gray-600 mb-8">
          Our team consists of RV industry veterans, mechanical engineers, and data analysts who are 
          passionate about helping people find the perfect RV for their needs and budget.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Photo</span>
            </div>
            <h3 className="font-semibold text-black mb-1">Sarah Johnson</h3>
            <p className="text-gray-600 text-sm mb-2">Lead RV Analyst</p>
            <p className="text-gray-500 text-xs">15+ years in RV industry</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Photo</span>
            </div>
            <h3 className="font-semibold text-black mb-1">Mike Chen</h3>
            <p className="text-gray-600 text-sm mb-2">Mechanical Engineer</p>
            <p className="text-gray-500 text-xs">Expert in RV systems</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Photo</span>
            </div>
            <h3 className="font-semibold text-black mb-1">Emily Rodriguez</h3>
            <p className="text-gray-600 text-sm mb-2">Data Scientist</p>
            <p className="text-gray-500 text-xs">Scoring algorithm developer</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-primary rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-black mb-4">Get in Touch</h2>
        <p className="mb-6">
          Have questions about our scoring methodology or want to suggest an RV for review?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-primary px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-bold"
          >
            Contact Us
          </Link>
          <Link
            href="/blog"
            className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors font-bold"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
