import React from 'react'

function ConsistencyHeatmap({ sources }) {
  const sourceNames = sources.map(s => s.name.split(' ')[0])
  const matrix = [
    [100, 85, 78, 82, 75, 88],
    [85, 100, 82, 79, 73, 86],
    [78, 82, 100, 76, 71, 84],
    [82, 79, 76, 100, 74, 87],
    [75, 73, 71, 74, 100, 80],
    [88, 86, 84, 87, 80, 100],
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
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid gap-1" style={{ gridTemplateColumns: `100px repeat(${sourceNames.length}, 1fr)` }}>
            {/* Header row */}
            <div />
            {sourceNames.map((name, i) => (
              <div key={i} className="text-center text-xs text-gray-400 font-medium py-2">
                {name}
              </div>
            ))}
            
            {/* Matrix rows */}
            {matrix.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className="text-xs text-gray-400 font-medium flex items-center py-2">
                  {sourceNames[rowIndex]}
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
        </div>
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

export default ConsistencyHeatmap
