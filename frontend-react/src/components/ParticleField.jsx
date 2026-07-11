import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField() {
  const particlesRef = useRef()

  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Create particles in a spherical distribution around the globe
      const radius = 1.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      
      // Velocities pointing toward center
      velocities[i3] = -positions[i3] * 0.001
      velocities[i3 + 1] = -positions[i3 + 1] * 0.001
      velocities[i3 + 2] = -positions[i3 + 2] * 0.001
    }
    
    return { positions, velocities, count }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3))
    return geo
  }, [particles.positions])

  const material = useMemo(() => 
    new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    }), []
  )

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particles.count; i++) {
        const i3 = i * 3
        
        // Move particles toward center
        positions[i3] += particles.velocities[i3]
        positions[i3 + 1] += particles.velocities[i3 + 1]
        positions[i3 + 2] += particles.velocities[i3 + 2]
        
        // Reset if too close to center
        const dist = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        )
        
        if (dist < 1.1) {
          const radius = 3 + Math.random()
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI
          
          positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i3 + 2] = radius * Math.cos(phi)
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return <points ref={particlesRef} geometry={geometry} material={material} />
}

export default ParticleField
