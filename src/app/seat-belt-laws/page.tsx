'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

// State data with tier classifications
const stateData = [
  // Tier 1 - Maximum Enforcement (Red)
  { name: 'Alaska', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Universal enforcement with no age or seating exemptions.' },
  { name: 'California', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Explicitly no exemptions for older RV models. Strict universal enforcement.' },
  { name: 'Delaware', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Reports higher-than-average seat belt usage rates. Strong enforcement culture.' },
  { name: 'Hawaii', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Active "Click It or Ticket" enforcement with notably high fine amounts.' },
  { name: 'Idaho', tier: 1, requirement: 'All occupants (vehicles under 8,000 lbs)', backSeat: 'Everyone must be belted in standard RVs', notes: 'Unique exemption for heavy vehicles over 8,000 lbs. Large Class A motorhomes may be exempt.' },
  { name: 'Iowa', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Universal requirement throughout the vehicle while in motion.' },
  { name: 'Kentucky', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'No exemptions—every passenger must be restrained regardless of position.' },
  { name: 'Maine', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Takes enforcement seriously with universal compliance required.' },
  { name: 'Massachusetts', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Strict universal enforcement to avoid citations.' },
  { name: 'Montana', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Universal requirement regardless of seating position or passenger age.' },
  { name: 'Nevada', tier: 1, requirement: 'All occupants when traveling over 15 mph', backSeat: 'Everyone must be belted at normal speeds', notes: 'Unique speed exemption under 15 mph useful for campground maneuvering.' },
  { name: 'New Hampshire', tier: 1, requirement: 'All occupants (post-1968 vehicles)', backSeat: 'Everyone must be belted in modern RVs', notes: 'Vintage exemption for pre-1969 models. Unlikely to affect most travelers.' },
  { name: 'New Mexico', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Takes compliance seriously with universal enforcement.' },
  { name: 'Oregon', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Expensive violation fines reported. Universal enforcement with serious penalties.' },
  { name: 'Rhode Island', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: '"Click It or Ticket" enforcement in the nation\'s smallest state.' },
  { name: 'South Carolina', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Universal requirement throughout the entire vehicle.' },
  { name: 'Utah', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Universal enforcement with no exemptions for any passenger position.' },
  { name: 'Vermont', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'Everyone in the motorhome must be restrained before departing.' },
  { name: 'Washington', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'High violation fines reported. Universal enforcement throughout vehicle.' },
  { name: 'Wyoming', tier: 1, requirement: 'All occupants at all times', backSeat: 'Everyone must be belted', notes: 'All riders must be strapped in regardless of seating location.' },
  
  // Tier 2 - Partial Enforcement (Yellow)
  { name: 'Arizona', tier: 2, requirement: 'Front seat occupants + minors under 15 in back', backSeat: 'Adults 15+ not required to be belted', notes: 'Notable as the only western state without universal requirements.' },
  { name: 'Connecticut', tier: 2, requirement: 'Front seat occupants + minors under 16 in back', backSeat: 'Adults 16+ not required to be belted', notes: 'Standard age-based approach for back seat passengers.' },
  { name: 'Florida', tier: 2, requirement: 'Front seat occupants + minors under 18 in back', backSeat: 'Adults 18+ not required to be belted', notes: 'One of the higher age thresholds for back seat requirements.' },
  { name: 'Georgia', tier: 2, requirement: 'Front seat occupants + minors under 18 in back', backSeat: 'Adults 18+ not required to be belted', notes: 'Exception for vehicles carrying 10+ passengers—back seat requirements waived.' },
  { name: 'Illinois', tier: 2, requirement: 'Front seat occupants + minors 15 and under in back', backSeat: 'Adults 16+ not required to be belted', notes: 'Recently strengthened from more permissive standards.' },
  { name: 'Kansas', tier: 2, requirement: 'Front seat occupants + minors under 14 in back', backSeat: 'Adults 14+ not required to be belted', notes: 'One of the lower age thresholds at 14 years old.' },
  { name: 'Louisiana', tier: 2, requirement: 'Front seat occupants + minors under 12 in back', backSeat: 'Adults 12+ not required to be belted', notes: 'The lowest age threshold—only requires belts for children under 12 in back.' },
  { name: 'Michigan', tier: 2, requirement: 'Front seat occupants + minors under 15 in back', backSeat: 'Adults 15+ not required to be belted', notes: 'Standard age-based system at the 15-year threshold.' },
  { name: 'Minnesota', tier: 2, requirement: 'Front seat occupants only (back seat 10 and under)', backSeat: 'Passengers over 10 not required to be belted', notes: 'Relatively permissive with low age threshold of 10 years.' },
  { name: 'Mississippi', tier: 2, requirement: 'Front seat occupants only (back seat 10 and under)', backSeat: 'Passengers over 10 not required to be belted', notes: 'Identical to Minnesota with 10-year age threshold.' },
  { name: 'Missouri', tier: 2, requirement: 'Front seat occupants + minors under 15 in back', backSeat: 'Adults 15+ not required to be belted', notes: 'Standard mid-range age threshold approach.' },
  { name: 'Nebraska', tier: 2, requirement: 'Front seat occupants + minors under 18 in back', backSeat: 'Adults 18+ not required to be belted', notes: 'High age threshold covering all minors in back seats.' },
  { name: 'New Jersey', tier: 2, requirement: 'Front seat occupants + minors 17 and under in back', backSeat: 'Adults 18+ not required to be belted', notes: 'Back seat rules more relaxed than front, which requires belts at all times.' },
  { name: 'New York', tier: 2, requirement: 'Front seat occupants + minors under 15 in back', backSeat: 'Adults 15+ not required to be belted', notes: 'Safety-focused state with requirements for younger passengers throughout vehicle.' },
  { name: 'North Carolina', tier: 2, requirement: 'Front seat occupants + minors under 16 in back', backSeat: 'Adults 16+ not required to be belted', notes: 'Standard enforcement model with 16-year age threshold.' },
  { name: 'North Dakota', tier: 2, requirement: 'Front seat occupants + minors under 17 in back', backSeat: 'Adults 17+ not required to be belted', notes: 'Covers nearly all minors with the 17-year threshold.' },
  { name: 'Oklahoma', tier: 2, requirement: 'Front seat occupants + children 12 and under in back', backSeat: 'Passengers over 12 not required to be belted', notes: 'Low age threshold at 12 years old for back seat requirements.' },
  { name: 'Pennsylvania', tier: 2, requirement: 'Front seat occupants + minors under 18 in back', backSeat: 'Adults 18+ not required to be belted', notes: 'Covers all minors in both front and back seats.' },
  { name: 'Tennessee', tier: 2, requirement: 'Front seat occupants + minors under 16 in back', backSeat: 'Adults 16+ not required to be belted', notes: 'Driver and front passenger always required; 16-year threshold for back.' },
  { name: 'Texas', tier: 2, requirement: 'Front seat occupants + minors 17 and under in back', backSeat: 'Adults 18+ not required to be belted', notes: 'Slightly stricter than Tennessee with coverage through age 17.' },
  { name: 'Virginia', tier: 2, requirement: 'Front seat occupants + minors 16 and under in back', backSeat: 'Adults over 16 not required to be belted', notes: 'Front seats mandatory; back seat age-based at 16 years.' },
  { name: 'West Virginia', tier: 2, requirement: 'Front seat occupants + minors 17 and under in back', backSeat: 'Adults 18+ not required to be belted', notes: 'Covers all minors with 17-year threshold for back seat passengers.' },
  { name: 'Wisconsin', tier: 2, requirement: 'Front seat occupants + minors 15 and under in back', backSeat: 'Adults 16+ not required to be belted', notes: 'Standard mid-range age threshold enforcement model.' },
  
  // Tier 3 - Minimal Enforcement (Green)
  { name: 'Alabama', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'One of seven states with minimal enforcement. Adult passengers may ride unrestrained in back seats.' },
  { name: 'Arkansas', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Minimal enforcement state with no back seat mandates.' },
  { name: 'Colorado', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Mountain state with relaxed back seat standards.' },
  { name: 'Indiana', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Explicitly permits unrestrained back seat passengers while vehicle is moving.' },
  { name: 'Maryland', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Notable as a minimal enforcement state in the Northeast corridor.' },
  { name: 'Ohio', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Among the least restrictive states, though back seat belts still recommended.' },
  { name: 'South Dakota', tier: 3, requirement: 'Front seat occupants only', backSeat: 'No requirements regardless of age', notes: 'Adults in back seats have no belt requirements.' }
];

export default function SeatBeltLawsPage() {
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = stateData.filter(state => {
    const matchesTier = selectedTier === 'all' || state.tier.toString() === selectedTier;
    const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-white text-black border-gray-300';
      case 2: return 'bg-white text-[#FF5C00] border-gray-300';
      case 3: return 'bg-white text-teal-600 border-gray-300';
      default: return 'bg-white text-gray-600 border-gray-300';
    }
  };

  const getTierIcon = (tier: number) => {
    switch (tier) {
      case 1: return '●';
      case 2: return '●';
      case 3: return '●';
      default: return '●';
    }
  };

  return (
    <>
      <Head>
        <title>RV Seat Belt Laws by State - Complete Guide 2025 | RV Grader</title>
        <meta name="description" content="Complete guide to RV seat belt laws across all 50 states and Canada. Know the requirements before you travel with our easy-to-use state directory." />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            The RV Traveler's Guide to Seat Belt Laws
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            A practical, organized reference for planning safe road trips across North America
          </p>
        </div>

        {/* Three-Tier System Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-black mb-8 text-center">Understanding the Three-Tier System</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3 text-black">●</span>
                <h3 className="text-xl font-bold text-black">Tier 1: Maximum Enforcement</h3>
              </div>
              <p className="text-[#FF5C00] mb-2 font-semibold">20 States + All of Canada</p>
              <p className="text-gray-700">Every person in your RV must be belted, regardless of age or seating location. Plan accordingly—no lounging in the back unrestrained.</p>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3 text-[#FF5C00]">●</span>
                <h3 className="text-xl font-bold text-black">Tier 2: Partial Enforcement</h3>
              </div>
              <p className="text-[#FF5C00] mb-2 font-semibold">23 States</p>
              <p className="text-gray-700">Driver and front passenger always need belts. Back seat requirements depend on passenger age, typically covering minors between 12-18 years old.</p>
            </div>
            
            <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3 text-teal-600">●</span>
                <h3 className="text-xl font-bold text-black">Tier 3: Minimal Enforcement</h3>
              </div>
              <p className="text-[#FF5C00] mb-2 font-semibold">7 States</p>
              <p className="text-gray-700">Only front seat occupants face mandatory belt requirements. Back seat passengers have no restrictions.</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
            />
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5C00] focus:border-transparent outline-none"
            >
              <option value="all">All Tiers</option>
              <option value="1">● Tier 1 - Maximum Enforcement</option>
              <option value="2">● Tier 2 - Partial Enforcement</option>
              <option value="3">● Tier 3 - Minimal Enforcement</option>
            </select>
          </div>
        </div>

        {/* State Directory */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-black mb-8 text-center">Complete State Directory</h2>
          <div className="grid gap-4">
            {filteredStates.map((state) => (
              <div key={state.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <span className={`text-2xl mr-3 ${
                      state.tier === 1 ? 'text-black' : 
                      state.tier === 2 ? 'text-[#FF5C00]' : 
                      'text-teal-600'
                    }`}>{getTierIcon(state.tier)}</span>
                    <h3 className="text-xl font-bold text-black">{state.name}</h3>
                    <span className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold border ${getTierColor(state.tier)}`}>
                      Tier {state.tier}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Requirement:</p>
                    <p className="text-gray-900 mb-3">{state.requirement}</p>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Back Seat:</p>
                    <p className="text-gray-900">{state.backSeat}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                    <p className="text-gray-700 text-sm">{state.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Strategies */}
        <div className="mb-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-black text-black mb-6 text-center">Planning Your Route: Practical Strategies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-3">Strategy 1: Operate to the Strictest Standard</h3>
              <p className="text-sm text-gray-600 mb-3">Best for: Families with children, frequent border crossers, hassle-free travel</p>
              <p className="text-gray-700">Simply require all passengers to remain belted at all times, regardless of state. This eliminates confusion and ensures compliance everywhere.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-3">Strategy 2: Adapt at State Lines</h3>
              <p className="text-sm text-gray-600 mb-3">Best for: Adult-only travel groups, longer stays in single states</p>
              <p className="text-gray-700">Research your specific route and adjust behavior when crossing into different tiers. Mark tier changes on your travel map.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-3">Strategy 3: Focus on the Front</h3>
              <p className="text-sm text-gray-600 mb-3">Best for: Solo travelers or two-person crews</p>
              <p className="text-gray-700">If you're only using front seats, you'll automatically comply with every jurisdiction in North America.</p>
            </div>
          </div>
        </div>

        {/* High-Risk States Warning */}
        <div className="mb-12 bg-white border-l-4 border-[#FF5C00] p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-black mb-4">⚠️ High-Risk States for Violations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#FF5C00] mb-2">Expensive Citations</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Hawaii: Among the highest fines nationally</li>
                <li>• Oregon: Particularly expensive for violations</li>
                <li>• Washington: Known for steep penalties</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#FF5C00] mb-2">Aggressive Enforcement Campaigns</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Hawaii: "Click It or Ticket" campaigns</li>
                <li>• Rhode Island: Enhanced enforcement</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">Budget-conscious travelers should be especially vigilant in these jurisdictions.</p>
            </div>
          </div>
        </div>

        {/* Canada Section */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🍁</span>
            <h2 className="text-2xl font-bold text-black">Canada</h2>
            <span className="ml-3 px-2 py-1 rounded-full text-xs font-semibold border bg-white text-[#FF5C00] border-gray-300">
              Universal Requirement
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Coverage:</p>
              <p className="text-gray-900 mb-3">All 10 provinces</p>
              <p className="text-sm font-semibold text-gray-700 mb-1">Vehicle Types:</p>
              <p className="text-gray-900">Class A, B, and C motorhomes</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Requirement:</p>
              <p className="text-gray-900 mb-3">All occupants at all times</p>
              <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
              <p className="text-gray-700">Universal requirement across the entire country with no provincial variations.</p>
            </div>
          </div>
        </div>

        {/* Safety Note */}
        <div className="mb-12 bg-white border border-gray-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#FF5C00] mb-3">🛡️ Safety Note</h2>
          <p className="text-gray-700">
            While this guide focuses on legal requirements, remember that seat belts dramatically reduce injury risk in accidents regardless of what the law requires. Medical data consistently shows that restrained passengers fare better in collisions, even at low speeds. Consider operating to the strictest standard for safety reasons, even when traveling through more permissive jurisdictions.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-4">Plan Your Safe RV Journey</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Use our other RV planning tools to ensure a safe and enjoyable trip across North America.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/manufacturers" 
              className="bg-[#FF5C00] text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              Find Reliable RVs
            </Link>
            <Link 
              href="/calculator" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Fuel Cost Calculator
            </Link>
            <Link 
              href="/events" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              RV Shows & Events
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
