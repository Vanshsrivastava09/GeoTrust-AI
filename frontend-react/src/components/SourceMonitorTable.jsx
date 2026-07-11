import { Satellite, Database, Cloud, Users, Eye, Settings, Power } from 'lucide-react'

function SourceMonitorTable({ sources }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Satellite': return <Satellite className="w-4 h-4" />
      case 'API': return <Cloud className="w-4 h-4" />
      case 'IoT': return <Database className="w-4 h-4" />
      case 'Crowd': return <Users className="w-4 h-4" />
      case 'Sensor': return <Database className="w-4 h-4" />
      default: return <Database className="w-4 h-4" />
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

  const getCredibilityColor = (value) => {
    if (value >= 90) return 'bg-green-500'
    if (value >= 80) return 'bg-cyan-500'
    if (value >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Credibility</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Completeness</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Last Update</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-cyan-400">
                    {getTypeIcon(source.type)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{source.name}</div>
                    <div className="text-xs text-gray-500">{source.sensor}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 rounded text-xs font-medium bg-white/5 text-gray-300">
                  {source.type}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`} />
                  <span className="text-sm text-gray-300 capitalize">{source.status}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-medium text-white">{source.credibility}</span>
                  <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getCredibilityColor(source.credibility)}`}
                      style={{ width: `${source.credibility}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm font-mono text-gray-300">{source.completeness}%</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-400">{source.lastUpdate}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-red-400">
                    <Power className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SourceMonitorTable
