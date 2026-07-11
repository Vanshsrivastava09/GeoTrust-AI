import React from 'react'

function HeatmapMatrix() {
  const sources = ['S-1', 'S-2', 'IoT', 'Weather']
  const matrix = [
    [100, 81, 78, 72],
    [81, 100, 85, 79],
    [78, 85, 100, 74],
    [72, 79, 74, 100]
  ]

  const getColor = (value) => {
    if (value >= 90) return 'bg-green-500'
    if (value >= 80) return 'bg-cyan-500'
    if (value >= 70) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getOpacity = (value) => {
    return 0.3 + (value / 100) * 0.7
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-1">
        {/* Header row */}
        <div />
        {sources.map((source, i) => (
          <div key={i} className="text-center text-xs text-gray-400 font-medium">
            {source}
          </div>
        ))}
        
        {/* Matrix rows */}
        {matrix.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="text-xs text-gray-400 font-medium flex items-center">
              {sources[rowIndex]}
            </div>
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className={`aspect-square rounded flex items-center justify-center text-xs font-medium text-white ${getColor(value)}`}
                style={{ opacity: getOpacity(value) }}
              >
                {rowIndex === colIndex ? '-' : `${value}%`}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Low (0-69%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500" />
          <span>Medium (70-79%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-cyan-500" />
          <span>High (80-89%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Very High (90-100%)</span>
        </div>
      </div>
    </div>
  )
}

export default HeatmapMatrix
