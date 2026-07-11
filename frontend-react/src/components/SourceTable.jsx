import { CheckCircle, AlertCircle } from 'lucide-react'

function SourceTable() {
  const sources = [
    { name: 'Sentinel-1', type: 'Radar', credibility: 94.2, status: 'active' },
    { name: 'Sentinel-2', type: 'Optical', credibility: 89.7, status: 'active' },
    { name: 'IoT River Gauges', type: 'Sensor', credibility: 87.8, status: 'active' },
    { name: 'Weather API', type: 'API', credibility: 82.4, status: 'degraded' },
    { name: 'Crowd Reports', type: 'Social', credibility: 76.1, status: 'active' },
  ]

  const getColor = (value) => {
    if (value >= 90) return 'bg-green-500'
    if (value >= 80) return 'bg-cyan-500'
    if (value >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-3">
      {sources.map((source, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-white">{source.name}</span>
              <div className="flex items-center gap-2">
                {source.status === 'active' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                <span className="text-sm text-gray-400">{source.credibility}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-16">{source.type}</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getColor(source.credibility)} transition-all duration-500`}
                  style={{ width: `${source.credibility}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SourceTable
