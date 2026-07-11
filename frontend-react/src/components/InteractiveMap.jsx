import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function MapSurface() {
  const meshRef = useRef()

  // Create terrain-like surface
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100)
    const positions = geometry.attributes.position.array
    
    // Add height variation for terrain effect
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      positions[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.3
    }
    
    geometry.computeVertexNormals()
    return geometry
  }, [])

  // Heatmap overlay
  const heatmapGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(10, 10, 50, 50)
    return geometry
  }, [])

  // Sentinel-1 coverage (blue)
  const sentinel1Geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-2, -2)
    shape.lineTo(2, -2)
    shape.lineTo(2, 2)
    shape.lineTo(-2, 2)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  // Sentinel-2 coverage (green)
  const sentinel2Geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, -3)
    shape.lineTo(3, -1)
    shape.lineTo(2, 2)
    shape.lineTo(-1, 1)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  // IoT coverage (orange)
  const iotGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-3, 0)
    shape.lineTo(-1, -2)
    shape.lineTo(1, -1)
    shape.lineTo(0, 2)
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  return (
    <group ref={meshRef} rotation={[-Math.PI / 4, 0, 0]}>
      {/* Base terrain */}
      <mesh geometry={terrainGeometry}>
        <meshStandardMaterial
          color="#0a0e27"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid overlay */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[10, 10, 20, 20]} />
        <meshBasicMaterial
          color="#00d9ff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* Sentinel-1 coverage */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={sentinel1Geometry}>
          <meshBasicMaterial
            color="#00d9ff"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>

      {/* Sentinel-2 coverage */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={sentinel2Geometry}>
          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>

      {/* IoT coverage */}
      <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={iotGeometry}>
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </mesh>

      {/* Trust heatmap overlay */}
      <mesh position={[0, 0.05, 0]}>
        <planeGeometry args={[10, 10, 30, 30]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Glowing border for query region */}
      <mesh position={[0, 0.06, 0]}>
        <ringGeometry args={[2, 2.1, 64]} />
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Data points */}
      {[...Array(20)].map((_, i) => {
        const x = (Math.random() - 0.5) * 8
        const z = (Math.random() - 0.5) * 8
        return (
          <mesh key={i} position={[x, 0.1, z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#00d9ff" />
            <pointLight color="#00d9ff" intensity={0.5} distance={1} />
          </mesh>
        )
      })}
    </group>
  )
}

function InteractiveMap() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <MapSurface />
        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
      </Canvas>
    </div>
  )
}

export default InteractiveMap
