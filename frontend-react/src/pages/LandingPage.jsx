import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Shield, Globe, ArrowRight, Layers, Brain, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import HolographicGlobe from '../components/HolographicGlobe'
import ParticleField from '../components/ParticleField'
import FeatureCard from '../components/FeatureCard'

function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 glass fixed top-0 left-0 right-0 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-cyan-400" />
              <Globe className="w-4 h-4 text-purple-500 absolute -bottom-1 -right-1" />
            </div>
            <span className="text-xl font-bold gradient-text">GeoTrust AI</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link to="/source-monitor" className="text-gray-300 hover:text-white transition-colors">
              Sources
            </Link>
            <Link to="/showcase" className="text-gray-300 hover:text-white transition-colors">
              Showcase
            </Link>
            <button className="gradient-border px-6 py-2 rounded-full">
              <span className="bg-navy-900 px-5 py-1 rounded-full text-sm font-medium">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="gradient-text">Trust in Every</span>
              <br />
              <span className="text-white">Insight</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-lg"
            >
              AI-powered trust evaluation for multi-source geospatial intelligence. 
              Quantify confidence, detect anomalies, and make informed decisions.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <Link 
                to="/dashboard"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 glow-cyan"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {/* Trust score indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6 pt-8"
            >
              {[
                { score: '78.4', label: 'Avg Trust' },
                { score: '92.1', label: 'Consistency' },
                { score: '65.7', label: 'Confidence' }
              ].map((stat, i) => (
                <div key={i} className="glass-card animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="text-3xl font-bold gradient-text">{stat.score}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <HolographicGlobe />
                <ParticleField />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </div>
            
            {/* Floating glass cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-0 glass-card w-48"
            >
              <div className="text-xs text-gray-400 mb-1">Sentinel-1</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <div className="text-lg font-semibold">94.2%</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Reliability</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 left-0 glass-card w-48"
            >
              <div className="text-xs text-gray-400 mb-1">IoT Sensors</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <div className="text-lg font-semibold">87.8%</div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Reliability</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<Layers className="w-8 h-8" />}
              title="Multi-Source Fusion"
              description="Combine satellite, IoT, and crowd-sourced data with intelligent cross-validation"
              delay={0}
            />
            <FeatureCard 
              icon={<Brain className="w-8 h-8" />}
              title="Real-Time Trust Scoring"
              description="Dynamic trust scores updated continuously as new data arrives"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8" />}
              title="Explainable AI"
              description="Plain-language explanations for every trust decision"
              delay={0.4}
            />
          </motion.div>
        </div>
      </section>

      {/* Floating data visualization elements */}
      <div className="absolute top-1/4 left-10 opacity-30">
        <div className="w-24 h-24 border border-cyan-400/30 rounded-lg" />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400/50 rounded-full" />
      </div>
      <div className="absolute bottom-1/3 right-20 opacity-20">
        <div className="w-32 h-16 border border-purple-500/30 rounded-lg" />
      </div>
    </div>
  )
}

export default LandingPage
