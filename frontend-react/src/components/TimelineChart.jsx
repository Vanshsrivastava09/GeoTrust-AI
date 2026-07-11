import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

function TimelineChart() {
  const data = [
    { day: 'Day 1', score: 82, sentinel1: 85, sentinel2: 78, iot: 83 },
    { day: 'Day 5', score: 85, sentinel1: 88, sentinel2: 82, iot: 85 },
    { day: 'Day 10', score: 79, sentinel1: 82, sentinel2: 75, iot: 80 },
    { day: 'Day 15', score: 87, sentinel1: 90, sentinel2: 84, iot: 87 },
    { day: 'Day 20', score: 84, sentinel1: 86, sentinel2: 81, iot: 85 },
    { day: 'Day 25', score: 89, sentinel1: 92, sentinel2: 86, iot: 89 },
    { day: 'Day 30', score: 87, sentinel1: 90, sentinel2: 84, iot: 87 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#00d9ff" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="day" 
          stroke="#6b7280"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#6b7280"
          domain={[60, 100]}
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(10, 14, 39, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white'
          }}
        />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#00d9ff"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#scoreGradient)"
        />
        <Line
          type="monotone"
          dataKey="sentinel1"
          stroke="#00d9ff"
          strokeWidth={1}
          strokeDasharray="5 5"
          opacity={0.5}
        />
        <Line
          type="monotone"
          dataKey="sentinel2"
          stroke="#10b981"
          strokeWidth={1}
          strokeDasharray="5 5"
          opacity={0.5}
        />
        <Line
          type="monotone"
          dataKey="iot"
          stroke="#f59e0b"
          strokeWidth={1}
          strokeDasharray="5 5"
          opacity={0.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default TimelineChart
