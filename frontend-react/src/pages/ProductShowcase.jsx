import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HolographicGlobe from '../components/HolographicGlobe'
import ParticleField from '../components/ParticleField'

function DesktopMonitor() {
  return (
    <Float floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh position={[0, 0, 0]}>
        {/* Monitor frame */}
        <boxGeometry args={[3.5, 2, 0.1]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.8} roughness={0.2} />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.3, 1.8]} />
          <meshBasicMaterial color="#0a0e27" />
        </mesh>
        
        {/* Screen content glow */}
        <pointLight position={[0, 0, 0.2]} color="#00d9ff" intensity={0.5} distance={2} />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.05]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -1.65, 0]}>
        <boxGeometry args={[1, 0.05, 0.6]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

function Tablet() {
  return (
    <Float floatIntensity={0.3} rotationIntensity={0.15} delay={1000}>
      <mesh position={[-4, 0, 1]} rotation={[0, 0.3, 0]}>
        {/* Tablet frame */}
        <boxGeometry args={[1.8, 2.4, 0.08]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.7} roughness={0.3} />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.7, 2.3]} />
          <meshBasicMaterial color="#0a0e27" />
        </mesh>
        
        {/* Screen content glow */}
        <pointLight position={[0, 0, 0.15]} color="#a855f7" intensity={0.4} distance={1.5} />
      </mesh>
    </Float>
  )
}

function MobilePhone() {
  return (
    <Float floatIntensity={0.4} rotationIntensity={0.2} delay={2000}>
      <mesh position={[4, 0, 1]} rotation={[0, -0.3, 0]}>
        {/* Phone frame */}
        <boxGeometry args={[0.8, 1.6, 0.06]} />
        <meshStandardMaterial color="#1a1f2e" metalness={0.8} roughness={0.2} />
        
        {/* Screen */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[0.75, 1.55]} />
          <meshBasicMaterial color="#0a0e27" />
        </mesh>
        
        {/* Screen content glow */}
        <pointLight position={[0, 0, 0.1]} color="#10b981" intensity={0.4} distance={1.5} />
      </mesh>
    </Float>
  )
}

function DataCard({ text, position, color, delay }) {
  return (
    <Float floatIntensity={0.2} rotationIntensity={0.1} delay={delay}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[1.2, 0.4]} />
          <meshBasicMaterial color="#1a1f2e" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <Text
            fontSize={0.12}
            color={color}
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          >
            {text}
          </Text>
        </mesh>
        <pointLight position={[0, 0, 0.1]} color={color} intensity={0.3} distance={0.5} />
      </group>
    </Float>
  )
}

function ConnectionLine({ start, end, color }) {
  const points = [start, end]
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array(points.flat())}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  )
}

function ProductShowcase() {
  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900" />
      
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d9ff" />
          
          <Environment preset="city" />
          
          {/* Background globe */}
          <group position={[0, -2, -5]} scale={[2, 2, 2]}>
            <HolographicGlobe />
          </group>
          
          {/* Particle field */}
          <ParticleField />
          
          {/* Devices */}
          <DesktopMonitor />
          <Tablet />
          <MobilePhone />
          
          {/* Floating data cards */}
          <DataCard text="Trust Score: 87.3" position={[0, 2, 2]} color="#00d9ff" delay={3000} />
          <DataCard text="47 Active Sources" position={[-3, 1.5, 2]} color="#a855f7" delay={3500} />
          <DataCard text="92% Consistency" position={[3, 1.5, 2]} color="#10b981" delay={4000} />
          <DataCard text="Real-Time Analysis" position={[0, -1, 3]} color="#00d9ff" delay={4500} />
          
          {/* Connection lines between devices */}
          <group>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([-1.75, 0, 1.06, 0, 0, 0.1])}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00d9ff" transparent opacity={0.2} />
            </line>
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([1.75, 0, 1.06, 0, 0, 0.1])}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#a855f7" transparent opacity={0.2} />
            </line>
          </group>
          
          <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">GT</span>
              </div>
              <span className="text-2xl font-bold gradient-text">GeoTrust AI</span>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="px-6 py-2 glass rounded-full text-white hover:bg-white/10 transition-colors">
                Back to Home
              </Link>
              <Link to="/dashboard" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-medium">
                Launch Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Hero text */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold mb-6"
            >
              <span className="gradient-text">Trust in Every</span>
              <br />
              <span className="text-white">Geospatial Insight</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 mb-8"
            >
              Enterprise-grade trust evaluation for multi-source geospatial intelligence. 
              Deployed across desktop, tablet, and mobile platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-4"
            >
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg text-white glow-cyan"
              >
                Get Started
              </Link>
              <Link
                to="/source-monitor"
                className="px-8 py-4 glass rounded-full font-semibold text-lg text-white hover:bg-white/10 transition-colors"
              >
                View Sources
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
            {[
              { title: 'Real-Time Scoring', desc: 'Continuous trust evaluation across all data sources' },
              { title: 'Cross-Platform', desc: 'Seamless experience on desktop, tablet, and mobile' },
              { title: 'Enterprise Ready', desc: 'Built for mission-critical geospatial operations' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductShowcase
