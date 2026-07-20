import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DetailView = lazy(() => import('./pages/DetailView'))
const SourceMonitor = lazy(() => import('./pages/SourceMonitor'))
const MobileHome = lazy(() => import('./pages/MobileHome'))
const MobileMap = lazy(() => import('./pages/MobileMap'))
const MobileDetail = lazy(() => import('./pages/MobileDetail'))
const ProductShowcase = lazy(() => import('./pages/ProductShowcase'))

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
        <div className="text-cyan-400 font-medium">Loading...</div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detail/:id" element={<DetailView />} />
            <Route path="/source-monitor" element={<SourceMonitor />} />
            <Route path="/mobile" element={<MobileHome />} />
            <Route path="/mobile/map" element={<MobileMap />} />
            <Route path="/mobile/detail/:id" element={<MobileDetail />} />
            <Route path="/showcase" element={<ProductShowcase />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
