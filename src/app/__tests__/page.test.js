import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('renders the main page elements', () => {
    render(<Home />);
    
    // Check for the main title
    expect(screen.getByText('Gift Bot 🎁')).toBeInTheDocument();
    
    // Check for the gift recipient prompt
    expect(screen.getByText(/I'm looking for a gift for.../i)).toBeInTheDocument();
    
    // Check for some of the person buttons
    expect(screen.getByTestId('person-button-mom')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-dad')).toBeInTheDocument();
  });
});