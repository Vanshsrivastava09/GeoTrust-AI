import { useRef, useMemo, useState } from 'react'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function MapLayer({ color, opacity, geometry, position }) {
  const [hovered, setHovered] = useState(false)
  
  return (
    <mesh 
      geometry={geometry} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={hovered ? opacity + 0.2 : opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function DetailMapSurface() {
  const meshRef = useRef()

  // Create base terrain
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(8, 8, 80, 80)
    const positions = geometry.attributes.position.array
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      positions[i + 2] = Math.sin(x * 0.8) * Math.cos(y * 0.8) * 0.4
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Sentinel-1 layer (cyan)
  const sentinel1Geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-2.5, -2)
    shape.lineTo(1.5, -2.5)
    shape.lineTo(2, 1)
    shape.lineTo(-1.5, 2)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  // Sentinel-2 layer (green)
  const sentinel2Geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-1, -2.5)
    shape.lineTo(2.5, -1.5)
    shape.lineTo(2, 2)
    shape.lineTo(-1.5, 1.5)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  // IoT layer (purple)
  const iotGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-2, -1)
    shape.lineTo(0, -2)
    shape.lineTo(2.5, -0.5)
    shape.lineTo(1.5, 2)
    shape.lineTo(-1, 1.5)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  // Weather API layer (orange)
  const weatherGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-2.5, 0.5)
    shape.lineTo(-0.5, -1)
    shape.lineTo(1.5, -0.5)
    shape.lineTo(1, 2)
    shape.lineTo(-2, 1.5)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  return (
    <group ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
      {/* Base terrain */}
      <mesh geometry={terrainGeometry}>
        <meshStandardMaterial
          color="#0a0e27"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Grid overlay */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[8, 8, 16, 16]} />
        <meshBasicMaterial
          color="#00d9ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Query region border */}
      <mesh position={[0, 0.02, 0]}>
        <ringGeometry args={[2.8, 2.9, 64]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Data source layers */}
      <MapLayer 
        color="#00d9ff" 
        opacity={0.35} 
        geometry={sentinel1Geometry}
        position={[0, 0.03, 0]}
      />
      <MapLayer 
        color="#10b981" 
        opacity={0.3} 
        geometry={sentinel2Geometry}
        position={[0, 0.04, 0]}
      />
      <MapLayer 
        color="#a855f7" 
        opacity={0.25} 
        geometry={iotGeometry}
        position={[0, 0.05, 0]}
      />
      <MapLayer 
        color="#f59e0b" 
        opacity={0.2} 
        geometry={weatherGeometry}
        position={[0, 0.06, 0]}
      />

      {/* Data points */}
      {[...Array(30)].map((_, i) => {
        const x = (Math.random() - 0.5) * 6
        const z = (Math.random() - 0.5) * 6
        return (
          <mesh key={i} position={[x, 0.1, z]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#00d9ff" />
            <pointLight color="#00d9ff" intensity={0.3} distance={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

function DetailMap() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#00d9ff" />
        <DetailMapSurface />
        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-6 left-6 glass-card p-4">
        <div className="text-sm font-medium text-white mb-3">Data Sources</div>
        <div className="space-y-2">
          {[
            { color: '#00d9ff', name: 'Sentinel-1' },
            { color: '#10b981', name: 'Sentinel-2' },
            { color: '#a855f7', name: 'IoT Sensors' },
            { color: '#f59e0b', name: 'Weather API' },
          ].map((source, i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <span className="text-xs text-gray-300">{source.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailMap
