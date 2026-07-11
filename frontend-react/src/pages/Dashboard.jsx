import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Map, Activity, FileText, Settings, 
  Search, Bell, Calendar, Download, Shield, Globe, ArrowRight,
  TrendingUp, AlertTriangle, CheckCircle
} from 'lucide-react'
import InteractiveMap from '../components/InteractiveMap'
import TrustGauge from '../components/TrustGauge'
import TimelineChart from '../components/TimelineChart'
import SourceTable from '../components/SourceTable'

function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { id: 'map', icon: Map, label: 'Map Analytics', path: '/dashboard' },
    { id: 'monitor', icon: Activity, label: 'Source Monitor', path: '/source-monitor' },
    { id: 'reports', icon: FileText, label: 'Trust Reports', path: '/dashboard' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/dashboard' },
  ]

  const recentInsights = [
    { id: 1, location: 'Mississippi Delta', trust: 87.3, time: '2 min ago', status: 'high' },
    { id: 2, location: 'Ganges Basin', trust: 72.1, time: '15 min ago', status: 'medium' },
    { id: 3, location: 'Amazon Flood Zone', trust: 91.8, time: '1 hour ago', status: 'high' },
    { id: 4, location: 'Nile Valley', trust: 58.4, time: '2 hours ago', status: 'low' },
  ]

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Left Sidebar */}
      <aside className="w-[250px] glass border-r border-white/10 flex flex-col">
        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Dr. Sarah Chen</div>
              <div className="text-xs text-gray-400">Lead Analyst</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeNav === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-cyan-400" />
            <span className="font-bold gradient-text">GeoTrust AI</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="glass border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search regions, sources, or insights..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full" />
              </button>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">Last 30 days</span>
              </div>

              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map Section */}
          <div className="flex-[2] relative">
            <InteractiveMap />
            
            {/* Floating Metrics */}
            <div className="absolute top-4 left-4 right-4 flex gap-4">
              <div className="glass-card flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Trust Score</div>
                    <div className="text-3xl font-bold gradient-text">87.3/100</div>
                  </div>
                  <TrustGauge value={87.3} size={80} />
                </div>
              </div>
              
              <div className="glass-card flex-1">
                <div className="text-sm text-gray-400 mb-1">Consistency</div>
                <div className="text-3xl font-bold text-green-400">92%</div>
                <div className="text-xs text-gray-500 mt-1">↑ 3% from last week</div>
              </div>
              
              <div className="glass-card flex-1">
                <div className="text-sm text-gray-400 mb-1">Confidence</div>
                <div className="text-3xl font-bold text-cyan-400">78%</div>
                <div className="text-xs text-gray-500 mt-1">High confidence range</div>
              </div>
              
              <div className="glass-card flex-1">
                <div className="text-sm text-gray-400 mb-1">Anomaly Risk</div>
                <div className="text-3xl font-bold text-green-400">Low</div>
                <div className="text-xs text-gray-500 mt-1">2 anomalies detected</div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <aside className="w-[350px] glass border-l border-white/10 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* AI Explanation */}
              <div className="glass-card">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold text-white">AI Explanation</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Sentinel-1 radar data shows high confidence flood extent in the Mississippi Delta region. 
                  IoT river gauge readings corroborate with 95% confidence. Minor discrepancy detected in 
                  northern sector due to cloud cover in optical imagery.
                </p>
              </div>

              {/* Source Reliability */}
              <div className="glass-card">
                <h3 className="font-semibold text-white mb-4">Source Reliability</h3>
                <SourceTable />
              </div>

              {/* Recent Insights */}
              <div className="glass-card">
                <h3 className="font-semibold text-white mb-4">Recent Insights</h3>
                <div className="space-y-3">
                  {recentInsights.map((insight) => (
                    <Link
                      key={insight.id}
                      to={`/detail/${insight.id}`}
                      className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{insight.location}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.status === 'high' ? 'bg-green-500/20 text-green-400' :
                          insight.status === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {insight.trust}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{insight.time}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Timeline */}
        <div className="h-48 glass border-t border-white/10 p-6">
          <h3 className="font-semibold text-white mb-4">Trust Score Trends (30 Days)</h3>
          <TimelineChart />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
