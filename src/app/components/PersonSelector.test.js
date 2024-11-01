import { render, screen, fireEvent } from '@testing-library/react';
import PersonSelector from './PersonSelector';

describe('PersonSelector', () => {
  it('renders all person options', () => {
    render(<PersonSelector />);
    
    // Check for the main heading
    expect(screen.getByText(/I'm looking for a gift for.../i)).toBeInTheDocument();
    
    // Check that all options are rendered
    expect(screen.getByTestId('person-button-mom')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-dad')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-partner')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-friend')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-sibling')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-other')).toBeInTheDocument();
  });

  it('handles button selection correctly', () => {
    render(<PersonSelector />);
    
    // Next step button should not be visible initially
    expect(screen.queryByTestId('next-step-button')).not.toBeInTheDocument();
    
    // Click the "Mom" button
    fireEvent.click(screen.getByTestId('person-button-mom'));
    
    // Next step button should now be visible
    expect(screen.getByTestId('next-step-button')).toBeInTheDocument();
    
    // The selected button should have different styling
    const momButton = screen.getByTestId('person-button-mom');
    expect(momButton.className).toContain('bg-green-500');
  });

  it('allows changing selection', () => {
    render(<PersonSelector />);
    
    // First select Mom
    fireEvent.click(screen.getByTestId('person-button-mom'));
    expect(screen.getByTestId('person-button-mom').className).toContain('bg-green-500');
    
    // Then select Dad
    fireEvent.click(screen.getByTestId('person-button-dad'));
    expect(screen.getByTestId('person-button-dad').className).toContain('bg-green-500');
    expect(screen.getByTestId('person-button-mom').className).not.toContain('bg-green-500');
  });
});