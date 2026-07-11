import { motion } from 'framer-motion'
import { Home, Map, Database, FileText, Settings, ArrowLeft, Share, Download, Brain, CheckCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import MobileTrustGauge from '../components/MobileTrustGauge'

function MobileDetail() {
  const { id } = useParams()

  const sources = [
    { name: 'Sentinel-1', score: 94.2, status: 'active' },
    { name: 'Sentinel-2', score: 89.7, status: 'active' },
    { name: 'IoT Sensors', score: 87.8, status: 'active' },
    { name: 'Weather API', score: 82.4, status: 'degraded' },
  ]

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="glass border-b border-white/10 p-4 pt-8">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/mobile/map" className="p-2 glass rounded-full">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-white">Insight Details</h1>
            <p className="text-xs text-gray-400">Mississippi Delta</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Trust score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card text-center py-6"
        >
          <div className="flex justify-center mb-4">
            <MobileTrustGauge value={78.4} size={160} />
          </div>
          <div className="text-3xl font-bold gradient-text mb-1">78.4/100</div>
          <div className="text-sm text-gray-400">Overall Trust Score</div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <div className="text-xl font-bold text-cyan-400">81%</div>
              <div className="text-xs text-gray-400">Consistency</div>
            </div>
            <div>
              <div className="text-xl font-bold text-purple-400">74%</div>
              <div className="text-xs text-gray-400">Confidence</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-400">88%</div>
              <div className="text-xs text-gray-400">Anomaly Free</div>
            </div>
          </div>
        </motion.div>

        {/* Map snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card overflow-hidden"
        >
          <div className="h-40 bg-gradient-to-br from-navy-900 to-navy-950 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Map className="w-12 h-12 text-cyan-400 mx-auto mb-2 opacity-50" />
                <div className="text-xs text-gray-400">Interactive Map</div>
              </div>
            </div>
            {/* Simplified map visualization */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30" />
              <div className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30" />
              <div className="absolute bottom-1/4 left-1/3 w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30" />
            </div>
          </div>
        </motion.div>

        {/* AI Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">AI Explanation</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Sentinel-1 and Sentinel-2 show 81% spatial agreement on flood extent. 
            IoT river gauges corroborate with 95% confidence. Minor discrepancy detected 
            in northern region due to cloud cover in optical imagery.
          </p>
        </motion.div>

        {/* Source list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
        >
          <h3 className="font-semibold text-white mb-4">Data Sources</h3>
          <div className="space-y-3">
            {sources.map((source, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${source.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <div className="text-sm font-medium text-white">{source.name}</div>
                    <div className="text-xs text-gray-400 capitalize">{source.status}</div>
                  </div>
                </div>
                <div className="text-sm font-mono text-cyan-400">{source.score}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <button className="flex-1 py-3 bg-white/5 rounded-xl font-medium text-white flex items-center justify-center gap-2 border border-white/10">
            <Share className="w-4 h-4" />
            Share Report
          </button>
          <button className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-medium text-white flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="glass border-t border-white/10 px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Home, label: 'Home', active: false, path: '/mobile' },
            { icon: Map, label: 'Map', active: false, path: '/mobile/map' },
            { icon: Database, label: 'Sources', active: false, path: '/mobile' },
            { icon: FileText, label: 'Reports', active: true, path: '/mobile' },
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

export default MobileDetail
