import { motion } from 'framer-motion'
import { Map, Home, Database, FileText, Settings, Navigation, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MobileTrustGauge from '../components/MobileTrustGauge'

function MobileHome() {
  return (
    <div className="min-h-screen bg-navy-900 flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950" />
      
      {/* Location Header */}
      <div className="relative z-10 p-6 pt-12">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-sm text-gray-400 mb-1">Current Location</div>
            <div className="text-lg font-semibold text-white">Mississippi Delta</div>
            <div className="text-xs text-gray-500">32.32°N, 90.85°W</div>
          </div>
          <button className="px-4 py-2 bg-white/5 rounded-full text-sm text-cyan-400 border border-cyan-500/30">
            Change Region
          </button>
        </div>
      </div>

      {/* Main Trust Score */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <MobileTrustGauge value={78.4} size={200} />
          
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
          >
            <span className="text-xs font-medium text-green-400">High Trust</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <div className="text-2xl font-bold gradient-text">78.4/100</div>
          <div className="text-sm text-gray-400">Trust Score</div>
        </motion.div>
      </div>

      {/* Metric Cards */}
      <div className="relative z-10 px-6 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
          {[
            { label: 'Consistency', value: '81%', color: 'text-cyan-400' },
            { label: 'Confidence', value: '74%', color: 'text-purple-400' },
            { label: 'Anomaly Risk', value: 'Low', color: 'text-green-400' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex-shrink-0 w-28 glass-card p-4 text-center"
            >
              <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-xs text-gray-400 mt-1">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View Map Button */}
      <div className="relative z-10 px-6 mb-8">
        <Link
          to="/mobile/map"
          className="block w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl font-semibold text-lg text-center text-white glow-cyan"
        >
          <span className="flex items-center justify-center gap-2">
            View Map
            <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10 glass border-t border-white/10 px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Home, label: 'Home', active: true, path: '/mobile' },
            { icon: Map, label: 'Map', active: false, path: '/mobile/map' },
            { icon: Database, label: 'Sources', active: false, path: '/mobile' },
            { icon: FileText, label: 'Reports', active: false, path: '/mobile' },
            { icon: Settings, label: 'Settings', active: false, path: '/mobile' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                item.active ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileHome
