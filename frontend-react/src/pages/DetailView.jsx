import { motion } from 'framer-motion'
import { ArrowLeft, Brain, AlertTriangle, TrendingUp } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import DetailMap from '../components/DetailMap'
import TrustGauge from '../components/TrustGauge'
import HeatmapMatrix from '../components/HeatmapMatrix'
import TemporalChart from '../components/TemporalChart'
import AnomalyTimeline from '../components/AnomalyTimeline'

function DetailView() {
  const { id } = useParams()

  const trustMetrics = {
    overall: 78.4,
    consistency: 81,
    confidence: 74,
    anomalyFreedom: 88
  }

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard"
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Insight Details</h1>
              <p className="text-sm text-gray-400">Mississippi Delta Flood Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2">
              <span className="text-sm text-gray-400">Trust Score</span>
              <span className="ml-2 text-2xl font-bold gradient-text">{trustMetrics.overall}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left - Map */}
        <div className="w-1/2 relative">
          <DetailMap />
        </div>

        {/* Right - Analytics */}
        <div className="w-1/2 overflow-y-auto p-6 space-y-6">
          {/* Trust Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h3 className="font-semibold text-white mb-6">Trust Score Breakdown</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <TrustGauge value={trustMetrics.overall} size={140} />
                <div className="mt-2 text-sm text-gray-400">Overall</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <TrustGauge value={trustMetrics.consistency} size={80} />
                  <div className="mt-2 text-xs text-gray-400">Consistency</div>
                </div>
                <div className="text-center">
                  <TrustGauge value={trustMetrics.confidence} size={80} />
                  <div className="mt-2 text-xs text-gray-400">Confidence</div>
                </div>
                <div className="text-center">
                  <TrustGauge value={trustMetrics.anomalyFreedom} size={80} />
                  <div className="mt-2 text-xs text-gray-400">Anomaly Free</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Source Agreement Matrix */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <h3 className="font-semibold text-white mb-4">Source Agreement Matrix (IoU)</h3>
            <HeatmapMatrix />
          </motion.div>

          {/* Temporal Consistency */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
          >
            <h3 className="font-semibold text-white mb-4">Temporal Consistency</h3>
            <TemporalChart />
          </motion.div>

          {/* AI Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">AI Explanation</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Sentinel-1 and Sentinel-2 show 81% spatial agreement on flood extent. 
              IoT river gauges corroborate with 95% confidence. Minor discrepancy detected 
              in northern region due to cloud cover in optical imagery. Overall trust score 
              reflects high source reliability and temporal consistency.
            </p>
          </motion.div>

          {/* Anomaly Detection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-white">Anomaly Detection</h3>
            </div>
            <AnomalyTimeline />
          </motion.div>
        </div>
      </main>
    </div>
  )
}

export default DetailView
