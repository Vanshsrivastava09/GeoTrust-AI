import { motion } from 'framer-motion'

function MobileTrustGauge({ value, size = 200 }) {
  const circumference = 2 * Math.PI * ((size - 16) / 2)
  const strokeDashoffset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 16) / 2}
        fill="none"
        stroke="rgba(255, 255, 255, 0.05)"
        strokeWidth={12}
      />
      
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={(size - 16) / 2}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth={12}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(0, 217, 255, 0.5))'
        }}
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00d9ff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default MobileTrustGauge
