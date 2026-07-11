import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import DetailView from './pages/DetailView'
import SourceMonitor from './pages/SourceMonitor'
import MobileHome from './pages/MobileHome'
import MobileMap from './pages/MobileMap'
import MobileDetail from './pages/MobileDetail'
import ProductShowcase from './pages/ProductShowcase'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default App
