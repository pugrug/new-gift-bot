// src/app/__tests__/components/LoadingSpinner.test.js
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';  // Add screen import
import LoadingSpinner from '@/app/components/LoadingSpinner';  // Update path

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Loader2: ({ className, 'data-testid': dataTestId }) => (
    <div data-testid={dataTestId} className={className} />
  )
}));

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const loader = screen.getByTestId('loader-icon');
    expect(loader).toHaveClass('w-6', 'h-6');  // Check for medium size classes
  });

  it('renders with specified size', () => {
    render(<LoadingSpinner size="large" />);
    const loader = screen.getByTestId('loader-icon');
    expect(loader).toHaveClass('w-8', 'h-8');  // Check for large size classes
  });

  it('applies custom className', () => {
    const { container } = render(<LoadingSpinner className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});