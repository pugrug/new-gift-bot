import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GiftBot from '../page'

// Mock the fetch function
global.fetch = jest.fn()

describe('GiftBot', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders the form', () => {
    render(<GiftBot />)
    expect(screen.getByText('Gift Bot 🎁')).toBeInTheDocument()
    expect(screen.getByText('Who needs a gift?')).toBeInTheDocument()
    expect(screen.getByText('Coal Mode 😈')).toBeInTheDocument()
  })

  it('handles normal mode submission', async () => {
    // Mock successful API response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          suggestion: '🎁 A nice warm sweater because they seem like they need a hug!'
        }),
      })
    )

    render(<GiftBot />)
    
    // Fill and submit form
    const input = screen.getByPlaceholderText('Describe the person and occasion...')
    fireEvent.change(input, { target: { value: 'my friend who is always cold' } })
    
    const submitButton = screen.getByText('🎁 Get Gift Suggestion')
    fireEvent.click(submitButton)

    // Wait for and verify response
    await waitFor(() => {
      expect(screen.getByText(/A nice warm sweater/)).toBeInTheDocument()
    })
  })

  it('handles coal mode submission', async () => {
    // Mock successful API response for coal mode
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
          suggestion: '😈 A thermostat manual, since you clearly don\'t know how to use one!'
        }),
      })
    )

    render(<GiftBot />)
    
    // Fill form and enable coal mode
    const input = screen.getByPlaceholderText('Describe the person and occasion...')
    fireEvent.change(input, { target: { value: 'my friend who is always cold' } })
    
    const coalMode = screen.getByText('Coal Mode 😈')
    fireEvent.click(coalMode)
    
    const submitButton = screen.getByText('🎁 Get Gift Suggestion')
    fireEvent.click(submitButton)

    // Wait for and verify response
    await waitFor(() => {
      expect(screen.getByText(/thermostat manual/)).toBeInTheDocument()
    })
  })
})