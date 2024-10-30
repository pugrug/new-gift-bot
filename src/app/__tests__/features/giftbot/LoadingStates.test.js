// src/app/__tests__/features/giftbot/LoadingStates.test.js
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GiftBot from '@/app/page';

// Mock the LoadingSpinner component with different test IDs
jest.mock('@/app/components/LoadingSpinner', () => ({
  __esModule: true,
  default: ({ size, className }) => (
    <div 
      data-testid={size === 'small' ? 'button-spinner' : 'result-spinner'} 
      className={className}
    >
      Loading...
    </div>
  )
}));

describe('GiftBot Loading States', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset modules before each test
    jest.resetModules();
    // Mock development environment
    process.env.NODE_ENV = 'development';
  });

  it('disables form elements during loading', async () => {
    render(<GiftBot />);
    
    // Get form elements
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    const coalModeCheckbox = screen.getByLabelText(/Coal Mode/);
    const submitButton = screen.getByRole('button');
    
    // Enter text to enable submit button
    fireEvent.change(textarea, { target: { value: 'test input' } });
    
    // Enable mock data mode first
    const mockDataCheckbox = screen.getByText('Use Mock Data').previousElementSibling;
    fireEvent.click(mockDataCheckbox);
    
    // Submit form
    fireEvent.click(submitButton);
    
    // Wait for elements to be disabled
    await waitFor(() => {
      expect(textarea).toBeDisabled();
      expect(coalModeCheckbox).toBeDisabled();
      expect(submitButton).toBeDisabled();
    }, { timeout: 2000 });
  });

  it('shows loading spinner while fetching suggestion', async () => {
    render(<GiftBot />);
    
    // Fill form
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    fireEvent.change(textarea, { target: { value: 'test input' } });
    
    // Enable mock data
    const mockDataCheckbox = screen.getByText('Use Mock Data').previousElementSibling;
    fireEvent.click(mockDataCheckbox);
    
    // Submit form
    fireEvent.click(screen.getByRole('button'));
    
    // Wait for loading spinner
    await waitFor(() => {
      expect(screen.getByTestId('result-spinner')).toBeInTheDocument();
      expect(screen.getByText("Santa's elves are brainstorming...")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('clears previous result when starting new request', async () => {
    render(<GiftBot />);
    
    // Enable mock data
    const mockDataCheckbox = screen.getByText('Use Mock Data').previousElementSibling;
    fireEvent.click(mockDataCheckbox);
    
    // Submit first request
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    fireEvent.change(textarea, { target: { value: 'first request' } });
    fireEvent.click(screen.getByRole('button'));
    
    // Wait for first result and loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId('result-spinner')).not.toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Submit second request
    fireEvent.change(textarea, { target: { value: 'second request' } });
    fireEvent.click(screen.getByRole('button'));
    
    // Verify loading state is shown
    await waitFor(() => {
      expect(screen.getByTestId('result-spinner')).toBeInTheDocument();
      expect(screen.getByText("Santa's elves are brainstorming...")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows correct button text during loading state', async () => {
    render(<GiftBot />);
    
    // Enable mock data
    const mockDataCheckbox = screen.getByText('Use Mock Data').previousElementSibling;
    fireEvent.click(mockDataCheckbox);
    
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    fireEvent.change(textarea, { target: { value: 'test input' } });
    
    // Check initial button text
    expect(screen.getByRole('button')).toHaveTextContent('🎁 Get Gift Suggestion');
    
    // Submit and check loading text
    fireEvent.click(screen.getByRole('button'));
    
    // Wait for loading state to update
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('🎄 Thinking...');
    }, { timeout: 2000 });
  });
});