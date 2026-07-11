import { AlertTriangle, XCircle, Clock, TrendingDown, Database, Wifi, Search } from 'lucide-react'

function AnomalyFeed() {
  const anomalies = [
    { id: 1, timestamp: '2 min ago', source: 'River Gauges', type: 'Data Gap', severity: 'critical' },
    { id: 2, timestamp: '15 min ago', source: 'NOAA Weather API', type: 'Calibration Drift', severity: 'warning' },
    { id: 3, timestamp: '32 min ago', source: 'Sentinel-2 L2A', type: 'Statistical Outlier', severity: 'warning' },
    { id: 4, timestamp: '1 hour ago', source: 'IoT Soil Network', type: 'Connection Loss', severity: 'critical' },
    { id: 5, timestamp: '2 hours ago', source: 'Crowd Reports', type: 'Data Inconsistency', severity: 'warning' },
  ]

  const getAnomalyIcon = (type) => {
    switch (type) {
      case 'Data Gap': return <XCircle className="w-4 h-4" />
      case 'Calibration Drift': return <TrendingDown className="w-4 h-4" />
      case 'Statistical Outlier': return <AlertTriangle className="w-4 h-4" />
      case 'Connection Loss': return <Wifi className="w-4 h-4" />
      case 'Data Inconsistency': return <Database className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">Critical</span>
      case 'warning':
        return <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Warning</span>
      default:
        return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">Info</span>
    }
  }

  return (
    <div className="space-y-3">
      {anomalies.map((anomaly) => (
        <div
          key={anomaly.id}
          className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <div className={`p-2 rounded-lg ${
            anomaly.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {getAnomalyIcon(anomaly.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-medium text-white">{anomaly.source}</span>
              {getSeverityBadge(anomaly.severity)}
            </div>
            <div className="text-sm text-gray-400">{anomaly.type}</div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{anomaly.timestamp}</span>
          </div>
          
          <button className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-colors border border-cyan-500/30">
            Investigate
          </button>
        </div>
      ))}
    </div>
  )
}

export default AnomalyFeed
