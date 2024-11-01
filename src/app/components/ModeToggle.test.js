import { render, screen, fireEvent } from '@testing-library/react';
import { ModeProvider } from '../contexts/ModeContext';
import ModeToggle from './ModeToggle';

describe('ModeToggle', () => {
  const renderWithProvider = (component) => {
    return render(
      <ModeProvider>
        {component}
      </ModeProvider>
    );
  };

  it('renders the mode toggle button', () => {
    renderWithProvider(<ModeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('starts in normal mode', () => {
    renderWithProvider(<ModeToggle />);
    expect(screen.getByText(/Coal Mode/)).toBeInTheDocument();
  });

  it('toggles between normal and coal mode', () => {
    renderWithProvider(<ModeToggle />);
    const button = screen.getByRole('button');
    
    // Click to switch to coal mode
    fireEvent.click(button);
    expect(screen.getByText(/Normal Mode/)).toBeInTheDocument();
    
    // Click to switch back to normal mode
    fireEvent.click(button);
    expect(screen.getByText(/Coal Mode/)).toBeInTheDocument();
  });

  it('shows snark level selector only in coal mode', () => {
    renderWithProvider(<ModeToggle />);
    const modeButton = screen.getByRole('button');

    // Initially no snark level
    expect(screen.queryByText(/Snark Level/)).not.toBeInTheDocument();

    // Switch to coal mode
    fireEvent.click(modeButton);
    expect(screen.getByText(/Snark Level/)).toBeInTheDocument();
  });

  it('cycles through snark levels in coal mode', () => {
    renderWithProvider(<ModeToggle />);
    const modeButton = screen.getByRole('button');

    // Switch to coal mode
    fireEvent.click(modeButton);
    const levelButton = screen.getByText(/Snark Level/);

    // Test cycling through levels
    fireEvent.click(levelButton);
    expect(screen.getByText(/Snark Level: 2/)).toBeInTheDocument();

    fireEvent.click(levelButton);
    expect(screen.getByText(/Snark Level: 3/)).toBeInTheDocument();

    fireEvent.click(levelButton);
    expect(screen.getByText(/Snark Level: 1/)).toBeInTheDocument();
  });
});