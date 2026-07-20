import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TrustGauge from '../TrustGauge'

describe('TrustGauge', () => {
  it('renders without crashing', () => {
    render(<TrustGauge value={50} size={100} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with correct size', () => {
    render(<TrustGauge value={50} size={150} />)
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('width', '150')
    expect(svg).toHaveAttribute('height', '150')
  })

  it('renders with different values', () => {
    const { rerender } = render(<TrustGauge value={0} size={100} />)
    const svg1 = screen.getByRole('img')
    expect(svg1).toBeInTheDocument()

    rerender(<TrustGauge value={100} size={100} />)
    const svg2 = screen.getByRole('img')
    expect(svg2).toBeInTheDocument()
  })

  it('has gradient definition', () => {
    render(<TrustGauge value={50} size={100} />)
    const svg = screen.getByRole('img')
    expect(svg.innerHTML).toContain('linearGradient')
  })
})
