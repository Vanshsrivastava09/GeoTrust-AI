import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar')).toBe('foo')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null)).toBe('foo')
  })

  it('handles empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('handles conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })

  it('handles object syntax', () => {
    expect(cn({ foo: true, bar: false })).toBe('foo')
  })

  it('handles array syntax', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
  })
})
