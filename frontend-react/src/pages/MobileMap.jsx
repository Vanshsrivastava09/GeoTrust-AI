import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Map, Database, FileText, Settings, Layers, Clock, Navigation } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function MobileMapSurface() {
  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      {/* Base terrain */}
      <mesh>
        <planeGeometry args={[10, 10, 50, 50]} />
        <meshStandardMaterial color="#0a0e27" roughness={0.8} />
      </mesh>

      {/* Grid overlay */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[10, 10, 20, 20]} />
        <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Data layers */}
      <mesh position={[0, 0.02, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} />
      </mesh>
      <mesh position={[1.5, 0.03, 1]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.25} />
      </mesh>
      <mesh position={[-1, 0.04, -1.5]}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
      </mesh>

      {/* Data points */}
      {[...Array(15)].map((_, i) => {
        const x = (Math.random() - 0.5) * 6
        const z = (Math.random() - 0.5) * 6
        return (
          <mesh key={i} position={[x, 0.1, z]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00d9ff" />
            <pointLight color="#00d9ff" intensity={0.5} distance={1} />
          </mesh>
        )
      })}
    </group>
  )
}

function MobileMap() {
  const [selectedLayer, setSelectedLayer] = useState('all')
  const [timeValue, setTimeValue] = useState(50)

  const layers = [
    { id: 'all', label: 'All Layers' },
    { id: 'satellite', label: 'Satellite' },
    { id: 'iot', label: 'IoT' },
    { id: 'weather', label: 'Weather' },
  ]

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col max-w-md mx-auto relative">
      {/* Full-screen map */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <MobileMapSurface />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>

        {/* Trust score badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 glass-card px-4 py-2"
        >
          <div className="text-xs text-gray-400">Trust Score</div>
          <div className="text-xl font-bold gradient-text">78.4</div>
        </motion.div>

        {/* Back button */}
        <Link
          to="/mobile"
          className="absolute top-4 left-4 p-2 glass rounded-full"
        >
          <Navigation className="w-5 h-5 text-white" />
        </Link>
      </div>

      {/* Bottom control panel */}
      <div className="glass border-t border-white/10 p-4 space-y-4">
        {/* Layer selector */}
        <div>
          <div className="text-xs text-gray-400 mb-2">Data Layers</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setSelectedLayer(layer.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                  selectedLayer === layer.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-gray-300'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Temporal Analysis</div>
            <div className="text-xs text-cyan-400">{timeValue}%</div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Evaluate button */}
        <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-white glow-cyan">
          Evaluate Region
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="glass border-t border-white/10 px-6 py-4">
        <div className="flex justify-around">
          {[
            { icon: Home, label: 'Home', active: false, path: '/mobile' },
            { icon: Map, label: 'Map', active: true, path: '/mobile/map' },
            { icon: Database, label: 'Sources', active: false, path: '/mobile' },
            { icon: FileText, label: 'Reports', active: false, path: '/mobile' },
            { icon: Settings, label: 'Settings', active: false, path: '/mobile' },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                item.active ? 'text-cyan-400' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileMap
