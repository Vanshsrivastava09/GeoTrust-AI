import { motion } from 'framer-motion'

function TrustGauge({ value, size = 80 }) {
  const circumference = 2 * Math.PI * ((size - 8) / 2)
  const strokeDashoffset = circumference - (value / 100) * circumference
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 8) / 2}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={6}
      />
      
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 8) / 2}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          filter: `drop-shadow(0 0 8px ${color})`
        }}
      />
      
      {/* Center text */}
      <text
        x={size / 2}
        y={size / 2}
        dy="0.3em"
        textAnchor="middle"
        fill="white"
        fontSize={size / 4}
        fontWeight="bold"
      >
        {Math.round(value)}
      </text>
    </svg>
  )
}

export default TrustGauge
