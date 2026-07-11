import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Satellite, Database, Cloud, Users, AlertTriangle, 
  TrendingUp, Settings, Eye, Power, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SparklineChart from '../components/SparklineChart'
import SourceMonitorTable from '../components/SourceMonitorTable'
import PerformanceTimeline from '../components/PerformanceTimeline'
import ConsistencyHeatmap from '../components/ConsistencyHeatmap'
import AnomalyFeed from '../components/AnomalyFeed'

function SourceMonitor() {
  const [sources, setSources] = useState([
    { id: 1, name: 'Sentinel-1 L1A', type: 'Satellite', sensor: 'Radar', status: 'active', credibility: 94.2, completeness: 98, lastUpdate: '2 min ago' },
    { id: 2, name: 'Sentinel-2 L2A', type: 'Satellite', sensor: 'Optical', status: 'active', credibility: 89.7, completeness: 95, lastUpdate: '5 min ago' },
    { id: 3, name: 'NOAA Weather API', type: 'API', sensor: 'Weather', status: 'degraded', credibility: 82.4, completeness: 92, lastUpdate: '1 min ago' },
    { id: 4, name: 'IoT Soil Network', type: 'IoT', sensor: 'Soil Moisture', status: 'active', credibility: 87.8, completeness: 88, lastUpdate: '30 sec ago' },
    { id: 5, name: 'Crowd Reports', type: 'Crowd', sensor: 'Social', status: 'active', credibility: 76.1, completeness: 75, lastUpdate: '10 min ago' },
    { id: 6, name: 'Landsat 8', type: 'Satellite', sensor: 'Multispectral', status: 'active', credibility: 91.3, completeness: 94, lastUpdate: '15 min ago' },
    { id: 7, name: 'River Gauges', type: 'IoT', sensor: 'Water Level', status: 'offline', credibility: 85.6, completeness: 90, lastUpdate: '2 hours ago' },
    { id: 8, name: 'Weather Stations', type: 'Sensor', sensor: 'Atmospheric', status: 'active', credibility: 88.9, completeness: 96, lastUpdate: '1 min ago' },
  ])

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Satellite': return <Satellite className="w-5 h-5" />
      case 'API': return <Cloud className="w-5 h-5" />
      case 'IoT': return <Database className="w-5 h-5" />
      case 'Crowd': return <Users className="w-5 h-5" />
      case 'Sensor': return <Database className="w-5 h-5" />
      default: return <Database className="w-5 h-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'degraded': return 'bg-yellow-500'
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Source Monitor</h1>
        <p className="text-gray-400">Real-time reliability metrics for all connected data sources</p>
      </div>

      {/* Top Row Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Active Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card bg-[#1a1f2e] border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Active Sources</span>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+3 this week</span>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <div className="text-5xl font-bold text-white font-mono">47</div>
            <div className="flex-1 h-12">
              <SparklineChart data={[42, 44, 43, 45, 44, 46, 47]} color="#10b981" />
            </div>
          </div>
        </motion.div>

        {/* Average Trust Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card bg-[#1a1f2e] border border-white/10"
        >
          <div className="text-gray-400 text-sm font-medium mb-4">Average Trust Score</div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-green-400 font-mono">82.4</div>
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="35" stroke="#1a1f2e" strokeWidth="6" fill="none" />
                <circle 
                  cx="40" cy="40" r="35" 
                  stroke="#10b981" 
                  strokeWidth="6" 
                  fill="none"
                  strokeDasharray={220}
                  strokeDashoffset={220 * (1 - 0.824)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white">82%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Anomalies Detected */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card bg-[#1a1f2e] border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">Anomalies Detected</span>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="flex items-end gap-4 mb-4">
            <div className="text-5xl font-bold text-yellow-400 font-mono">12</div>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-400">3 Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-gray-400">9 Warning</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Source Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card bg-[#1a1f2e] border border-white/10 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">All Sources</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors">
              Sort
            </button>
          </div>
        </div>
        <SourceMonitorTable sources={sources} />
      </motion.div>

      {/* Performance Timeline & Consistency Heatmap */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card bg-[#1a1f2e] border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Source Performance Timeline (90 Days)</h2>
          <PerformanceTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card bg-[#1a1f2e] border border-white/10"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Consistency Heatmap</h2>
          <ConsistencyHeatmap sources={sources.slice(0, 6)} />
        </motion.div>
      </div>

      {/* Anomaly Detection Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card bg-[#1a1f2e] border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Anomaly Detection Feed</h2>
        <AnomalyFeed />
      </motion.div>
    </div>
  )
}

export default SourceMonitor
