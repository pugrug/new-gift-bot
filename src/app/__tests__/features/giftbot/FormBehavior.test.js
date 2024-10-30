import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import GiftBot from '@/app/page';
describe('GiftBot Form Behavior', () => {
  it('renders the main heading', () => {
    render(<GiftBot />);
    expect(screen.getByText('Gift Bot 🎁')).toBeInTheDocument();
  });

  it('toggles coal mode when checkbox is clicked', () => {
    render(<GiftBot />);
    const checkbox = screen.getByText('Coal Mode 😈').previousElementSibling;
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('enables submit button only when prompt has text', () => {
    render(<GiftBot />);
    const submitButton = screen.getByRole('button');
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    
    expect(submitButton).toBeDisabled();
    
    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    expect(submitButton).not.toBeDisabled();
    
    fireEvent.change(textarea, { target: { value: '' } });
    expect(submitButton).toBeDisabled();
  });
});