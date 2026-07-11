import { AlertTriangle, XCircle, CheckCircle } from 'lucide-react'

function AnomalyTimeline() {
  const anomalies = [
    { time: '08:00', severity: 'warning', message: 'Minor drift in IoT sensor #4' },
    { time: '12:00', severity: 'critical', message: 'Sentinel-2 data gap detected' },
    { time: '16:00', severity: 'resolved', message: 'Sensor calibration corrected' },
  ]

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return null
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10'
      case 'resolved':
        return 'border-green-500 bg-green-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  return (
    <div className="space-y-3">
      {anomalies.map((anomaly, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 p-3 rounded-lg border-l-2 ${getSeverityColor(anomaly.severity)}`}
        >
          <div className="mt-0.5">
            {getSeverityIcon(anomaly.severity)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-white">{anomaly.message}</span>
              <span className="text-xs text-gray-400">{anomaly.time}</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <span className="text-xs text-gray-500">3 anomalies detected in last 24 hours</span>
      </div>
    </div>
  )
}

export default AnomalyTimeline
