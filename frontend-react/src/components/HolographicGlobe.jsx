import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function HolographicGlobe() {
  const globeRef = useRef()
  const atmosphereRef = useRef()

  // Create sphere geometry
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])

  // Create wireframe material
  const wireframeMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    }), []
  )

  // Create glow material
  const glowMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    }), []
  )

  // Connection lines
  const connectionLines = useMemo(() => {
    const points = []
    const numLines = 20
    for (let i = 0; i < numLines; i++) {
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.random() * Math.PI
      const theta2 = Math.random() * Math.PI * 2
      const phi2 = Math.random() * Math.PI
      
      const x1 = Math.sin(phi1) * Math.cos(theta1)
      const y1 = Math.sin(phi1) * Math.sin(theta1)
      const z1 = Math.cos(phi1)
      
      const x2 = Math.sin(phi2) * Math.cos(theta2)
      const y2 = Math.sin(phi2) * Math.sin(theta2)
      const z2 = Math.cos(phi2)
      
      points.push(
        new THREE.Vector3(x1 * 1.05, y1 * 1.05, z1 * 1.05),
        new THREE.Vector3(x2 * 1.05, y2 * 1.05, z2 * 1.05)
      )
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [])

  const lineMaterial = useMemo(() => 
    new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.5
    }), []
  )

  // Satellite coverage areas
  const coverageAreas = useMemo(() => {
    const geometries = []
    for (let i = 0; i < 5; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const radius = 0.2 + Math.random() * 0.3
      
      const geometry = new THREE.CircleGeometry(radius, 32)
      const position = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * 1.02,
        Math.sin(phi) * Math.sin(theta) * 1.02,
        Math.cos(phi) * 1.02
      )
      geometry.lookAt(position)
      geometry.translate(position.x, position.y, position.z)
      geometries.push(geometry)
    }
    return geometries
  }, [])

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={globeRef}>
      {/* Main globe wireframe */}
      <mesh geometry={sphereGeometry} material={wireframeMaterial} />
      
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshBasicMaterial
          color={0x00d9ff}
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Connection lines */}
      <lineSegments geometry={connectionLines} material={lineMaterial} />

      {/* Satellite coverage areas */}
      {coverageAreas.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshBasicMaterial
            color={i % 2 === 0 ? 0x00d9ff : 0xa855f7}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Floating trust scores */}
      {[...Array(3)].map((_, i) => {
        const theta = (i / 3) * Math.PI * 2
        const phi = Math.PI / 2
        const x = Math.sin(phi) * Math.cos(theta) * 1.3
        const y = Math.sin(phi) * Math.sin(theta) * 1.3
        const z = Math.cos(phi) * 1.3
        
        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.02, 16, 16]} />
              <meshBasicMaterial color={0x00d9ff} />
            </mesh>
            <pointLight color={0x00d9ff} intensity={0.5} distance={0.5} />
          </group>
        )
      })}
    </group>
  )
}

export default HolographicGlobe
