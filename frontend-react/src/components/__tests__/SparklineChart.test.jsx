import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SparklineChart from '../SparklineChart'

describe('SparklineChart', () => {
  it('renders without crashing', () => {
    render(<SparklineChart data={[1, 2, 3, 4, 5]} color="#00d9ff" />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders with correct number of data points', () => {
    render(<SparklineChart data={[1, 2, 3, 4, 5]} color="#00d9ff" />)
    const svg = screen.getByRole('img')
    expect(svg.innerHTML).toContain('path')
  })

  it('renders with empty data', () => {
    render(<SparklineChart data={[]} color="#00d9ff" />)
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
  })

  it('renders with single data point', () => {
    render(<SparklineChart data={[50]} color="#00d9ff" />)
    const svg = screen.getByRole('img')
    expect(svg).toBeInTheDocument()
  })

  it('renders with different colors', () => {
    const { rerender } = render(<SparklineChart data={[1, 2, 3]} color="#00d9ff" />)
    const svg1 = screen.getByRole('img')
    expect(svg1).toBeInTheDocument()

    rerender(<SparklineChart data={[1, 2, 3]} color="#10b981" />)
    const svg2 = screen.getByRole('img')
    expect(svg2).toBeInTheDocument()
  })
})
