import { useState } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Search, MapPin, Store, TrendingUp, Calendar, Users, BarChart3, Plus, Menu, X, ChevronRight, Clock, Shield, Truck, AlertCircle, Eye, Filter, ArrowRight, Phone, MessageCircle, Globe, Leaf, ShoppingBag, Package, Map, List } from 'lucide-react';
import { markets } from './data/markets';
import { products, priceRanges, productCategories } from './data/products';
import type { Market, MarketActivity, PriceFreshness } from './types';

// Utility functions
const formatNaira = (amount: number) => `₦${amount.toLocaleString()}`;

const getActivityColor = (activity: MarketActivity) => {
  switch (activity) {
    case 'ACTIVE_NOW': return 'bg-green-500';
    case 'ACTIVE_TODAY': return 'bg-emerald-500';
    case 'RECENTLY_ACTIVE': return 'bg-yellow-500';
    case 'POSSIBLY_ACTIVE': return 'bg-orange-500';
    case 'NO_RECENT_CONFIRMATION': return 'bg-gray-400';
    case 'CLOSED': return 'bg-red-500';
    case 'SEASONAL': return 'bg-purple-500';
    default: return 'bg-gray-400';
  }
};

const getActivityLabel = (activity: MarketActivity) => {
  switch (activity) {
    case 'ACTIVE_NOW': return 'Active Now';
    case 'ACTIVE_TODAY': return 'Active Today';
    case 'RECENTLY_ACTIVE': return 'Recently Active';
    case 'POSSIBLY_ACTIVE': return 'Possibly Active';
    case 'NO_RECENT_CONFIRMATION': return 'No Recent Confirmation';
    case 'CLOSED': return 'Closed';
    case 'SEASONAL': return 'Seasonal';
    default: return 'Unknown';
  }
};

const getFreshnessColor = (freshness: PriceFreshness) => {
  switch (freshness) {
    case 'VERY_RECENT': return 'text-green-700 bg-green-50 border-green-200';
    case 'RECENT': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    case 'RECENT_ISH': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
    case 'HISTORICAL': return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'STALE': return 'text-red-700 bg-red-50 border-red-200';
    default: return 'text-gray-700 bg-gray-50 border-gray-200';
  }
};

const getEnvironmentBadge = (env: string) => {
  switch (env) {
    case 'URBAN': return 'bg-blue-100 text-blue-800';
    case 'SUBURBAN': return 'bg-indigo-100 text-indigo-800';
    case 'RURAL': return 'bg-green-100 text-green-800';
    case 'REMOTE': return 'bg-amber-100 text-amber-800';
    case 'ROADSIDE': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getFunctionBadge = (fn: string) => {
  switch (fn) {
    case 'RETAIL': return 'bg-purple-100 text-purple-800';
    case 'WHOLESALE': return 'bg-blue-100 text-blue-800';
    case 'FARM_GATE': return 'bg-green-100 text-green-800';
    case 'AGGREGATION': return 'bg-teal-100 text-teal-800';
    case 'MIXED': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// =================== HEADER ===================
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg">Pheeline</span>
              <span className="text-emerald-600 text-lg ml-1">Market Place</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Explore</Link>
            <Link to="/markets" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Markets</Link>
            <Link to="/prices" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Prices</Link>
            <Link to="/commodities" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Commodities</Link>
            <Link to="/market-days" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Market Days</Link>
            <Link to="/insights" className="text-gray-600 hover:text-emerald-600 font-medium text-sm">Insights</Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Link to="/report" className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
              <Plus className="w-4 h-4" />
              Report
            </Link>
            <button className="text-gray-600 hover:text-emerald-600 text-sm font-medium">Sign In</button>
          </div>
          
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link to="/explore" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
            <Link to="/markets" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Markets</Link>
            <Link to="/prices" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Prices</Link>
            <Link to="/commodities" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Commodities</Link>
            <Link to="/market-days" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Market Days</Link>
            <Link to="/insights" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileMenuOpen(false)}>Insights</Link>
            <div className="pt-2 border-t border-gray-100 flex gap-3">
              <Link to="/report" className="flex-1 text-center bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>＋ Report</Link>
              <button className="flex-1 text-center border border-gray-300 py-2 rounded-lg text-sm font-medium text-gray-700">Sign In</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// =================== FOOTER ===================
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">Pheeline Market Place</span>
            </div>
            <p className="text-sm text-gray-400">Discover. Compare. Source.</p>
            <p className="text-sm text-gray-400 mt-2">Nigeria's digital market and commodity intelligence network.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/explore" className="hover:text-emerald-400">Explore Markets</Link></li>
              <li><Link to="/prices" className="hover:text-emerald-400">Price Intelligence</Link></li>
              <li><Link to="/commodities" className="hover:text-emerald-400">Commodities</Link></li>
              <li><Link to="/market-days" className="hover:text-emerald-400">Market Days</Link></li>
              <li><Link to="/insights" className="hover:text-emerald-400">Market Insights</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contribute</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/report" className="hover:text-emerald-400">Report a Price</Link></li>
              <li><Link to="/report" className="hover:text-emerald-400">Add a Market</Link></li>
              <li><Link to="/report" className="hover:text-emerald-400">Update Market Info</Link></li>
              <li><Link to="/report" className="hover:text-emerald-400">Market Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp Integration</li>
              <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> Telegram Bot</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> USSD (Coming Soon)</li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Available in: English, Pidgin, Yorùbá, Igbo, Hausa</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2025 Pheeline Market Place. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// =================== HOME PAGE ===================
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const searchExamples = ['Tomatoes', 'Cassava', 'Rice', 'Yam', 'Fertilizer', 'Spare parts'];
  
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover what's happening in <span className="text-emerald-600">Nigeria's markets</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Markets, prices, commodities, vendors and local market intelligence — from urban centers to rural bush markets.
            </p>
            
            {/* Search */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full md:w-48 pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-700 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>📍 All Nigeria</option>
                    <option>Lagos</option>
                    <option>Kano</option>
                    <option>Edo</option>
                    <option>Abia</option>
                    <option>Oyo</option>
                    <option>Enugu</option>
                    <option>Rivers</option>
                    <option>Kaduna</option>
                  </select>
                </div>
                <button 
                  onClick={() => navigate('/explore')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
                >
                  Search
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs text-gray-500">Try:</span>
                {searchExamples.map(ex => (
                  <button key={ex} onClick={() => setSearchQuery(ex)} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    {ex}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Link to="/explore" className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-gray-700 font-medium hover:border-emerald-300 hover:text-emerald-700 transition-colors">
                <Map className="w-5 h-5" />
                Explore Markets
              </Link>
              <Link to="/prices" className="inline-flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl text-gray-700 font-medium hover:border-emerald-300 hover:text-emerald-700 transition-colors">
                <TrendingUp className="w-5 h-5" />
                Compare Prices
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">10</div>
              <div className="text-sm text-gray-600 mt-1">Markets Tracked</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">27</div>
              <div className="text-sm text-gray-600 mt-1">Commodities</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">1,084</div>
              <div className="text-sm text-gray-600 mt-1">Price Reports</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">12,865</div>
              <div className="text-sm text-gray-600 mt-1">Vendors Listed</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Markets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Active Markets</h2>
            <p className="text-gray-600 text-sm mt-1">Markets with recent community activity</p>
          </div>
          <Link to="/explore" className="text-emerald-600 font-medium text-sm flex items-center gap-1 hover:text-emerald-700">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {markets.filter(m => m.activity === 'ACTIVE_NOW' || m.activity === 'ACTIVE_TODAY').slice(0, 6).map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      </section>
      
      {/* Recent Prices */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Market Prices</h2>
              <p className="text-gray-600 text-sm mt-1">Community-reported prices across Nigeria</p>
            </div>
            <Link to="/prices" className="text-emerald-600 font-medium text-sm flex items-center gap-1 hover:text-emerald-700">
              All prices <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceRanges.slice(0, 6).map(price => (
              <PriceCard key={price.productId} price={price} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How Pheeline Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Discover Markets</h3>
            <p className="text-sm text-gray-600">Find formal markets, bush markets, farm-gate sources and aggregation points across Nigeria.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Compare Prices</h3>
            <p className="text-sm text-gray-600">View community-reported prices with ranges, medians, and freshness indicators.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Contribute & Earn Trust</h3>
            <p className="text-sm text-gray-600">Report prices, update market conditions, and build your reputation as a trusted contributor.</p>
          </div>
        </div>
      </section>
      
      {/* Market Types */}
      <section className="bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Every Type of Market</h2>
          <p className="text-center text-gray-600 mb-8">From major urban centers to remote bush markets</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Store className="w-6 h-6" />, label: 'Urban Markets', desc: 'Major city markets' },
              { icon: <Leaf className="w-6 h-6" />, label: 'Rural Markets', desc: 'Community trading' },
              { icon: <Package className="w-6 h-6" />, label: 'Bush Markets', desc: 'Remote produce sources' },
              { icon: <ShoppingBag className="w-6 h-6" />, label: 'Farm Gate', desc: 'Direct from producers' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-xl p-4 border border-emerald-100 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3 text-emerald-600">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{item.label}</h4>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Know a market price?</h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">Help build Nigeria's most comprehensive market intelligence. Report a price and earn community trust.</p>
          <Link to="/report" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">
            <Plus className="w-5 h-5" />
            Report a Price
          </Link>
        </div>
      </section>
    </div>
  );
}

// =================== MARKET CARD ===================
function MarketCard({ market }: { market: Market }) {
  return (
    <Link to={`/markets/${market.slug}`} className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-emerald-200 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2.5 h-2.5 rounded-full ${getActivityColor(market.activity)}`}></div>
            <span className="text-xs font-medium text-gray-500">{getActivityLabel(market.activity)}</span>
          </div>
          <h3 className="font-semibold text-gray-900">{market.name}</h3>
          {market.localName && market.localName !== market.name && (
            <p className="text-xs text-gray-500">{market.localName}</p>
          )}
        </div>
        {market.verified && (
          <div className="flex items-center gap-1 text-emerald-600" title="Verified Market">
            <Shield className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{market.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full ${getEnvironmentBadge(market.environment)}`}>{market.environment}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getFunctionBadge(market.function)}`}>{market.function.replace('_', ' ')}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">{market.state}</span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{market.vendors} vendors</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{market.marketDays.length > 3 ? 'Daily' : market.marketDays.join(', ')}</span>
        </div>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{market.lastUpdated}</span>
      </div>
      
      {market.communityConfirmations > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-emerald-700 font-medium">
            📊 {market.communityConfirmations} community confirmations
          </p>
        </div>
      )}
    </Link>
  );
}

// =================== PRICE CARD ===================
function PriceCard({ price }: { price: typeof priceRanges[0] }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{price.productName}</h4>
          <p className="text-xs text-gray-500">per {price.unit}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${getFreshnessColor(price.freshness)}`}>
          {price.lastUpdated}
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{formatNaira(price.median)}</span>
          <span className="text-xs text-gray-500">median</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-600">{formatNaira(price.lowest)} – {formatNaira(price.highest)}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-2 relative">
          <div 
            className="bg-emerald-500 h-2 rounded-full absolute"
            style={{ left: '0%', width: '100%' }}
          ></div>
          <div 
            className="bg-emerald-700 w-3 h-3 rounded-full absolute top-1/2 -translate-y-1/2"
            style={{ left: `${((price.median - price.lowest) / (price.highest - price.lowest)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
        <span>{price.reportCount} reports</span>
        <span className="text-emerald-600 font-medium">View details →</span>
      </div>
    </div>
  );
}

// =================== EXPLORE PAGE ===================
function ExplorePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [filterType, setFilterType] = useState('all');
  const [filterEnv, setFilterEnv] = useState('all');
  const [filterState, setFilterState] = useState('all');
  
  const filteredMarkets = markets.filter(m => {
    if (filterType !== 'all' && m.function !== filterType) return false;
    if (filterEnv !== 'all' && m.environment !== filterEnv) return false;
    if (filterState !== 'all' && m.state !== filterState) return false;
    return true;
  });
  
  const states = [...new Set(markets.map(m => m.state))];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Explore Markets</h1>
          <p className="text-gray-600 text-sm">Discover markets across Nigeria — urban, rural, bush and farm-gate</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium ${viewMode === 'map' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
          >
            <Map className="w-4 h-4" /> Map
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option value="all">All Functions</option>
            <option value="RETAIL">Retail</option>
            <option value="WHOLESALE">Wholesale</option>
            <option value="FARM_GATE">Farm Gate</option>
            <option value="AGGREGATION">Aggregation</option>
            <option value="MIXED">Mixed</option>
          </select>
          <select value={filterEnv} onChange={e => setFilterEnv(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option value="all">All Environments</option>
            <option value="URBAN">Urban</option>
            <option value="SUBURBAN">Suburban</option>
            <option value="RURAL">Rural</option>
            <option value="REMOTE">Remote</option>
          </select>
          <select value={filterState} onChange={e => setFilterState(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option value="all">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 hover:bg-gray-50">Open Now</button>
          <button className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 hover:bg-gray-50">Wholesale</button>
          <button className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 hover:bg-gray-50">Verified</button>
        </div>
      </div>
      
      {/* Results */}
      <p className="text-sm text-gray-500 mb-4">{filteredMarkets.length} markets found</p>
      
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarkets.map(market => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="relative h-[500px] bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
            {/* Simplified map visualization */}
            <div className="absolute inset-0 p-4">
              <div className="relative w-full h-full">
                {/* Nigeria outline placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-emerald-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Interactive Map View</p>
                    <p className="text-xs text-gray-400">Map integration coming with production deployment</p>
                  </div>
                </div>
                {/* Market markers */}
                {filteredMarkets.map((market, i) => (
                  <Link 
                    key={market.id} 
                    to={`/markets/${market.slug}`}
                    className="absolute group"
                    style={{ 
                      left: `${15 + (i * 8) % 70}%`, 
                      top: `${20 + (i * 12) % 60}%` 
                    }}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${getActivityColor(market.activity)} group-hover:scale-150 transition-transform`}></div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {market.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =================== MARKET PROFILE PAGE ===================
function MarketProfilePage() {
  const { slug } = useParams();
  const market = markets.find(m => m.slug === slug);
  
  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Market not found</h1>
        <p className="text-gray-600 mt-2">The market you're looking for doesn't exist.</p>
        <Link to="/explore" className="text-emerald-600 font-medium mt-4 inline-block">← Back to Explore</Link>
      </div>
    );
  }
  
  const marketPrices = priceRanges.filter((_, i) => i < 5);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/explore" className="hover:text-emerald-600">Explore</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/explore" className="hover:text-emerald-600">{market.state}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{market.name}</span>
      </nav>
      
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 rounded-full ${getActivityColor(market.activity)}`}></div>
              <span className="text-sm font-medium text-gray-600">{getActivityLabel(market.activity)}</span>
              {market.verified && (
                <span className="flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                  <Shield className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{market.name}</h1>
            {market.localName && market.localName !== market.name && (
              <p className="text-gray-500 mt-1">Also known as: {market.localName}</p>
            )}
            <p className="text-gray-600 mt-2 max-w-2xl">{market.description}</p>
          </div>
          <div className="flex gap-2">
            <Link to="/report" className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
              <Plus className="w-4 h-4" /> Report Price
            </Link>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className={`text-xs px-2.5 py-1 rounded-full ${getEnvironmentBadge(market.environment)}`}>{market.environment}</span>
          <span className={`text-xs px-2.5 py-1 rounded-full ${getFunctionBadge(market.function)}`}>{market.function.replace('_', ' ')}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{market.type}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{market.specialization}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Days */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" /> Market Days
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <span 
                  key={day} 
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    market.marketDays.includes(day) 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'bg-gray-50 text-gray-400 border border-gray-100'
                  }`}
                >
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Cycle: {market.dayCycle.replace('_', ' ')}</p>
          </div>
          
          {/* Products Available */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" /> Products Available
            </h3>
            <div className="flex flex-wrap gap-2">
              {market.products.map(product => (
                <span key={product} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                  {product}
                </span>
              ))}
            </div>
          </div>
          
          {/* Prices at this market */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Recent Prices
            </h3>
            <div className="space-y-3">
              {marketPrices.map(price => (
                <div key={price.productId} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{price.productName}</p>
                    <p className="text-xs text-gray-500">per {price.unit} · {price.reportCount} reports</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatNaira(price.median)}</p>
                    <p className="text-xs text-gray-500">{formatNaira(price.lowest)} – {formatNaira(price.highest)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Source: {market.reports} community reports · Last updated {market.lastUpdated}
            </p>
          </div>
          
          {/* Community Reports */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" /> Community Reports
            </h3>
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-green-700 text-xs font-bold">AO</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Anonymous Contributor</p>
                      <p className="text-xs text-gray-500">📍 Location verified</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">Tomatoes selling at ₦10,000 per basket today. Supply is moderate.</p>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-xs font-bold">TM</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Trusted Contributor</p>
                      <p className="text-xs text-gray-500">🏅 Market Scout badge</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">Market is very active today. Rice prices stable at ₦52,000 per bag.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Location
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><span className="text-gray-500">State:</span> {market.state}</p>
              <p className="text-gray-700"><span className="text-gray-500">LGA:</span> {market.lga}</p>
              <p className="text-gray-700"><span className="text-gray-500">Nearest:</span> {market.nearestSettlement}</p>
              <p className="text-gray-700"><span className="text-gray-500">Coordinates:</span> {market.lat.toFixed(4)}, {market.lng.toFixed(4)}</p>
            </div>
            <div className="mt-3 bg-gray-100 rounded-lg h-32 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          {/* Accessibility */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" /> Access & Transport
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700"><span className="text-gray-500">Truck access:</span> {market.truckAccess}</p>
              <p className="text-gray-700"><span className="text-gray-500">Road condition:</span> {market.roadCondition}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3">Market Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vendors</span>
                <span className="font-medium text-gray-900">{market.vendors.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price Reports</span>
                <span className="font-medium text-gray-900">{market.reports}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Photos</span>
                <span className="font-medium text-gray-900">{market.photos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Community Confirmations</span>
                <span className="font-medium text-emerald-600">{market.communityConfirmations}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Updated</span>
                <span className="font-medium text-gray-900">{market.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          {/* Market Conditions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-600" /> Current Conditions
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Normal activity</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Moderate supply</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Good road access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== PRICES PAGE ===================
function PricesPage() {
  const [sortBy, setSortBy] = useState('recent');
  
  const sortedPrices = [...priceRanges].sort((a, b) => {
    if (sortBy === 'reports') return b.reportCount - a.reportCount;
    if (sortBy === 'price') return b.median - a.median;
    return 0;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Price Intelligence</h1>
          <p className="text-gray-600 text-sm">Community-reported commodity prices across Nigerian markets</p>
        </div>
        <div className="flex items-center gap-3">
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option value="recent">Most Recent</option>
            <option value="reports">Most Reports</option>
            <option value="price">Highest Price</option>
          </select>
          <Link to="/report" className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
            <Plus className="w-4 h-4" /> Report
          </Link>
        </div>
      </div>
      
      {/* Price explanation */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">About these prices</p>
            <p className="text-sm text-blue-700 mt-1">
              All prices are community-reported observations, not fixed values. Ranges reflect variation across markets, vendors, and time. 
              Each price shows its source, freshness, and number of reports for transparency.
            </p>
          </div>
        </div>
      </div>
      
      {/* Price table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Commodity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Unit</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Price Range</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Median</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Reports</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Freshness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedPrices.map(price => (
                <tr key={price.productId} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{price.productName}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{price.unit}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {formatNaira(price.lowest)} – {formatNaira(price.highest)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-900">{formatNaira(price.median)}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{price.reportCount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getFreshnessColor(price.freshness)}`}>
                      {price.lastUpdated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Price reporting info */}
      <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-xl p-6">
        <h3 className="font-semibold text-emerald-900 mb-2">How prices are calculated</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-800">
          <div>
            <p className="font-medium mb-1">Each price is an observation:</p>
            <ul className="space-y-1 text-emerald-700">
              <li>• Product + Market + Price + Unit</li>
              <li>• Timestamped and attributed</li>
              <li>• Location verified where possible</li>
              <li>• Quality indicator included</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-1">Then we calculate:</p>
            <ul className="space-y-1 text-emerald-700">
              <li>• Lowest & highest observed</li>
              <li>• Median price across reports</li>
              <li>• Number of contributing reports</li>
              <li>• Freshness based on recency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== COMMODITIES PAGE ===================
function CommoditiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory || p.subcategory === selectedCategory);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Commodities</h1>
        <p className="text-gray-600 text-sm">Browse Nigeria's commodity taxonomy — from roots & tubers to livestock</p>
      </div>
      
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${selectedCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All
        </button>
        {productCategories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${selectedCategory === cat.name ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-200 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category} · {product.subcategory}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            
            {product.aliases.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Also known as:</p>
                <div className="flex flex-wrap gap-1">
                  {product.aliases.map(alias => (
                    <span key={alias} className="text-xs bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-600">{alias}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Common units:</p>
              <div className="flex flex-wrap gap-1">
                {product.commonUnits.map(unit => (
                  <span key={unit} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{unit}</span>
                ))}
              </div>
            </div>
            
            {/* Price link */}
            {priceRanges.find(p => p.productName.toLowerCase() === product.name.toLowerCase()) && (
              <Link to="/prices" className="mt-3 flex items-center gap-1 text-xs text-emerald-600 font-medium hover:text-emerald-700">
                <TrendingUp className="w-3.5 h-3.5" /> View prices <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== MARKET DAYS PAGE ===================
function MarketDaysPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const activeToday = markets.filter(m => m.marketDays.includes(today));
  const upcomingThisWeek = markets.filter(m => !m.marketDays.includes(today));
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Days</h1>
        <p className="text-gray-600 text-sm">Know when markets are active — daily, weekly, periodic, and seasonal cycles</p>
      </div>
      
      {/* Today */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h2 className="font-semibold text-emerald-900">Today is {today}</h2>
        </div>
        <p className="text-sm text-emerald-700">{activeToday.length} markets are active today</p>
      </div>
      
      {/* Active today */}
      <h3 className="font-semibold text-gray-900 mb-3">Active Today</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {activeToday.map(market => (
          <Link key={market.id} to={`/markets/${market.slug}`} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-200 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2.5 h-2.5 rounded-full ${getActivityColor(market.activity)}`}></div>
              <span className="text-xs font-medium text-gray-500">{getActivityLabel(market.activity)}</span>
            </div>
            <h4 className="font-semibold text-gray-900">{market.name}</h4>
            <p className="text-sm text-gray-500">{market.state} · {market.environment}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {market.marketDays.map(day => (
                <span key={day} className={`text-xs px-2 py-0.5 rounded ${day === today ? 'bg-emerald-100 text-emerald-700 font-medium' : 'bg-gray-50 text-gray-400'}`}>
                  {day.slice(0, 3)}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Cycle: {market.dayCycle.replace('_', ' ')}</p>
          </Link>
        ))}
      </div>
      
      {/* Other markets */}
      {upcomingThisWeek.length > 0 && (
        <>
          <h3 className="font-semibold text-gray-900 mb-3">Other Market Days This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingThisWeek.map(market => (
              <Link key={market.id} to={`/markets/${market.slug}`} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-emerald-200 transition-all">
                <h4 className="font-semibold text-gray-900">{market.name}</h4>
                <p className="text-sm text-gray-500">{market.state} · {market.environment}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {market.marketDays.map(day => (
                    <span key={day} className="text-xs px-2 py-0.5 rounded bg-gray-50 text-gray-600">
                      {day.slice(0, 3)}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Cycle: {market.dayCycle.replace('_', ' ')}</p>
              </Link>
            ))}
          </div>
        </>
      )}
      
      {/* Market day cycle explanation */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Understanding Market Day Cycles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">Standard cycles:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>Daily</strong> — Open every day</li>
              <li>• <strong>Weekly</strong> — Specific day(s) each week</li>
              <li>• <strong>Biweekly</strong> — Every two weeks</li>
              <li>• <strong>Monthly</strong> — Once per month</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">Traditional cycles:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• <strong>4-day cycle</strong> — Common in southeastern Nigeria</li>
              <li>• <strong>5-day cycle</strong> — Found in some Yoruba communities</li>
              <li>• <strong>Seasonal</strong> — Active during specific seasons</li>
              <li>• <strong>Irregular</strong> — No fixed pattern</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== INSIGHTS PAGE ===================
function InsightsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Market Insights</h1>
        <p className="text-gray-600 text-sm">Intelligence and trends from Nigeria's market data</p>
      </div>
      
      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 text-white">
          <BarChart3 className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-semibold text-lg">Price Trends</h3>
          <p className="text-sm text-emerald-100 mt-1">30-day, 90-day, and 1-year commodity price movements</p>
          <p className="text-xs text-emerald-200 mt-3">Coming in Phase 2</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <Map className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-semibold text-lg">Geographic Intelligence</h3>
          <p className="text-sm text-blue-100 mt-1">Regional price comparisons and supply patterns</p>
          <p className="text-xs text-blue-200 mt-3">Coming in Phase 2</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <Calendar className="w-8 h-8 mb-3 opacity-80" />
          <h3 className="font-semibold text-lg">Seasonal Patterns</h3>
          <p className="text-sm text-purple-100 mt-1">Supply, price, and activity cycles throughout the year</p>
          <p className="text-xs text-purple-200 mt-3">Coming in Phase 2</p>
        </div>
      </div>
      
      {/* Current snapshot */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Market Snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">10</p>
            <p className="text-xs text-gray-500 mt-1">Markets Tracked</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">7</p>
            <p className="text-xs text-gray-500 mt-1">States Covered</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">1,084</p>
            <p className="text-xs text-gray-500 mt-1">Price Reports</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">27</p>
            <p className="text-xs text-gray-500 mt-1">Commodities</p>
          </div>
        </div>
      </div>
      
      {/* Top movers */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Price Observations</h2>
        <div className="space-y-3">
          {priceRanges.slice(0, 5).map(price => (
            <div key={price.productId} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{price.productName}</p>
                  <p className="text-xs text-gray-500">per {price.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatNaira(price.median)}</p>
                <p className="text-xs text-gray-500">{price.reportCount} reports · {price.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Roadmap */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Intelligence Roadmap</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">1</div>
            <div>
              <p className="font-medium text-gray-900">Commodity Price Trends</p>
              <p className="text-sm text-gray-600">30-day, 90-day, 1-year price movements with seasonal analysis</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">2</div>
            <div>
              <p className="font-medium text-gray-900">Market Comparison</p>
              <p className="text-sm text-gray-600">Side-by-side price and availability comparison across markets</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">3</div>
            <div>
              <p className="font-medium text-gray-900">Geographic Intelligence</p>
              <p className="text-sm text-gray-600">State-level and regional price mapping and supply patterns</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-sm font-bold shrink-0">4</div>
            <div>
              <p className="font-medium text-gray-900">B2B Market Intelligence API</p>
              <p className="text-sm text-gray-600">Enterprise data feeds, commodity analytics, and research datasets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== REPORT PAGE ===================
function ReportPage() {
  const [reportType, setReportType] = useState('price');
  const [submitted, setSubmitted] = useState(false);
  
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h1>
        <p className="text-gray-600 mb-2">Your report has been received and will enter our verification process.</p>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 text-left mb-6">
          <p className="font-medium text-gray-900 mb-2">What happens next:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Automated validation check</li>
            <li>Community confirmation (if applicable)</li>
            <li>Moderation review</li>
            <li>Verification and publication</li>
          </ol>
        </div>
        <button onClick={() => setSubmitted(false)} className="text-emerald-600 font-medium hover:text-emerald-700">
          Submit another report →
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Report to Pheeline</h1>
        <p className="text-gray-600 text-sm">Help build Nigeria's market intelligence — report prices, conditions, or new markets</p>
      </div>
      
      {/* Report type */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setReportType('price')}
          className={`flex-1 py-3 rounded-xl text-sm font-medium border ${reportType === 'price' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          📊 Report Price
        </button>
        <button 
          onClick={() => setReportType('condition')}
          className={`flex-1 py-3 rounded-xl text-sm font-medium border ${reportType === 'condition' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          📢 Market Condition
        </button>
        <button 
          onClick={() => setReportType('market')}
          className={`flex-1 py-3 rounded-xl text-sm font-medium border ${reportType === 'market' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200 text-gray-600'}`}
        >
          📍 New Market
        </button>
      </div>
      
      {/* Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {reportType === 'price' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                <option>Select a market...</option>
                {markets.map(m => <option key={m.id} value={m.id}>{m.name} — {m.state}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product / Commodity</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                <option>Select a product...</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                <input type="number" placeholder="e.g. 10000" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                  <option>Per basket</option>
                  <option>Per bag</option>
                  <option>Per kg</option>
                  <option>Per tuber</option>
                  <option>Per bunch</option>
                  <option>Per litre</option>
                  <option>Per mudu</option>
                  <option>Per derica</option>
                  <option>Per paint rubber</option>
                  <option>Per crate</option>
                  <option>Per piece</option>
                  <option>Per dozen</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                <option>Standard</option>
                <option>Premium / Grade A</option>
                <option>Below average</option>
                <option>Mixed quality</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Observed</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea placeholder="Any additional context about the price..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm h-20 resize-none"></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="location" className="w-4 h-4 text-emerald-600 rounded border-gray-300" />
              <label htmlFor="location" className="text-sm text-gray-600">📍 Verify my location (confirms I'm at or near this market)</label>
            </div>
          </div>
        )}
        
        {reportType === 'condition' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                <option>Select a market...</option>
                {markets.map(m => <option key={m.id} value={m.id}>{m.name} — {m.state}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition Type</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                <option>Crowded</option>
                <option>Normal activity</option>
                <option>Flooding</option>
                <option>Heavy traffic</option>
                <option>Road closure</option>
                <option>Power outage</option>
                <option>Market closure</option>
                <option>Security concern</option>
                <option>Heavy supply</option>
                <option>Low supply</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea placeholder="Describe the current conditions..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm h-20 resize-none"></textarea>
            </div>
          </div>
        )}
        
        {reportType === 'market' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market Name</label>
              <input type="text" placeholder="What is this market called?" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Local Name (if different)</label>
              <input type="text" placeholder="Local or alternative name..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                  <option>Select state...</option>
                  <option>Edo</option>
                  <option>Lagos</option>
                  <option>Kano</option>
                  <option>Oyo</option>
                  <option>Abia</option>
                  <option>Enugu</option>
                  <option>Rivers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Market Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm">
                  <option>Urban Market</option>
                  <option>Rural Market</option>
                  <option>Bush Market</option>
                  <option>Farm Gate</option>
                  <option>Aggregation Point</option>
                  <option>Wholesale Market</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nearest Settlement / Landmark</label>
              <input type="text" placeholder="e.g. Near Okaigben junction, along Benin-Lagos road" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market Days / Schedule</label>
              <input type="text" placeholder="e.g. Every Wednesday and Sunday, or Daily" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Products Traded</label>
              <textarea placeholder="What commodities are sold here?" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm h-20 resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea placeholder="Tell us about this market..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm h-20 resize-none"></textarea>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setSubmitted(true)}
          className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          Submit Report
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Reports enter our verification process: PENDING → Automated Check → Community Confirmation → Verified
        </p>
      </div>
    </div>
  );
}

// =================== MARKETS LIST PAGE ===================
function MarketsListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Markets</h1>
          <p className="text-gray-600 text-sm">Browse all tracked markets across Nigeria</p>
        </div>
        <Link to="/report" className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
          <Plus className="w-4 h-4" /> Add Market
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map(market => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}

// =================== APP ===================
function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/markets" element={<MarketsListPage />} />
            <Route path="/markets/:slug" element={<MarketProfilePage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/commodities" element={<CommoditiesPage />} />
            <Route path="/market-days" element={<MarketDaysPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
