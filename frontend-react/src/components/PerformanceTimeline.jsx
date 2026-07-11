import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function PerformanceTimeline() {
  const data = [
    { day: 'Day 1', s1: 88, s2: 85, s3: 82, s4: 90, s5: 78, s6: 86, s7: 84, s8: 89, s9: 81, s10: 87 },
    { day: 'Day 15', s1: 90, s2: 87, s3: 84, s4: 92, s5: 80, s6: 88, s7: 86, s8: 91, s9: 83, s10: 89 },
    { day: 'Day 30', s1: 89, s2: 86, s3: 83, s4: 91, s5: 79, s6: 87, s7: 85, s8: 90, s9: 82, s10: 88 },
    { day: 'Day 45', s1: 91, s2: 88, s3: 85, s4: 93, s5: 81, s6: 89, s7: 87, s8: 92, s9: 84, s10: 90 },
    { day: 'Day 60', s1: 92, s2: 89, s3: 86, s4: 94, s5: 82, s6: 90, s7: 88, s8: 93, s9: 85, s10: 91 },
    { day: 'Day 75', s1: 93, s2: 90, s3: 87, s4: 95, s5: 83, s6: 91, s7: 89, s8: 94, s9: 86, s10: 92 },
    { day: 'Day 90', s1: 94, s2: 91, s3: 88, s4: 96, s5: 84, s6: 92, s7: 90, s8: 95, s9: 87, s10: 93 },
  ]

  const colors = [
    '#00d9ff', '#10b981', '#a855f7', '#f59e0b', '#ef4444',
    '#06b6d4', '#8b5cf6', '#f97316', '#ec4899', '#14b8a6'
  ]

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="day" 
          stroke="#6b7280"
          style={{ fontSize: '11px' }}
        />
        <YAxis 
          stroke="#6b7280"
          domain={[75, 100]}
          style={{ fontSize: '11px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(26, 31, 46, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '11px'
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '10px', color: '#9ca3af' }}
          iconType="circle"
        />
        {colors.map((color, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={`s${i + 1}`}
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            name={`Source ${i + 1}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PerformanceTimeline
