import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function TemporalChart() {
  const data = [
    { time: '00:00', aggregate: 75, sentinel1: 78, sentinel2: 72, iot: 76, weather: 74 },
    { time: '04:00', aggregate: 77, sentinel1: 80, sentinel2: 74, iot: 78, weather: 76 },
    { time: '08:00', aggregate: 79, sentinel1: 82, sentinel2: 76, iot: 80, weather: 78 },
    { time: '12:00', aggregate: 82, sentinel1: 85, sentinel2: 79, iot: 82, weather: 80 },
    { time: '16:00', aggregate: 80, sentinel1: 83, sentinel2: 77, iot: 81, weather: 79 },
    { time: '20:00', aggregate: 78, sentinel1: 81, sentinel2: 75, iot: 79, weather: 77 },
    { time: '24:00', aggregate: 76, sentinel1: 79, sentinel2: 73, iot: 77, weather: 75 },
  ]

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="time" 
          stroke="#6b7280"
          style={{ fontSize: '11px' }}
        />
        <YAxis 
          stroke="#6b7280"
          domain={[70, 90]}
          style={{ fontSize: '11px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(10, 14, 39, 0.9)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px'
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }}
        />
        <Line
          type="monotone"
          dataKey="aggregate"
          stroke="#00d9ff"
          strokeWidth={3}
          name="Aggregate"
        />
        <Line
          type="monotone"
          dataKey="sentinel1"
          stroke="#00d9ff"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          name="Sentinel-1"
        />
        <Line
          type="monotone"
          dataKey="sentinel2"
          stroke="#10b981"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          name="Sentinel-2"
        />
        <Line
          type="monotone"
          dataKey="iot"
          stroke="#a855f7"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          name="IoT"
        />
        <Line
          type="monotone"
          dataKey="weather"
          stroke="#f59e0b"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          name="Weather"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default TemporalChart
