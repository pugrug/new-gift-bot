import { render, screen } from '@testing-library/react';
import Home from './page';
import { ModeProvider } from './contexts/ModeContext';

describe('Home Page', () => {
  it('renders the main page elements', () => {
    render(
      <ModeProvider>
        <Home />
      </ModeProvider>
    );
    
    // Check for the main title
    expect(screen.getByText('Gift Bot 🎁')).toBeInTheDocument();
    
    // Check for the mode toggle specifically
    expect(screen.getByText(/Coal Mode/)).toBeInTheDocument();
    
    // Check for the person selector title
    expect(screen.getByText("I'm looking for a gift for...")).toBeInTheDocument();
    
    // Check for specific person buttons
    expect(screen.getByTestId('person-button-mom')).toBeInTheDocument();
    expect(screen.getByTestId('person-button-dad')).toBeInTheDocument();
    // Add more specific checks as needed
  });
});