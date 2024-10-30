import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GiftBot from '@/app/page';
describe('GiftBot Loading States', () => {
  it('disables form elements during loading', async () => {
    render(<GiftBot />);
    
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    const coalModeCheckbox = screen.getByText('Coal Mode 😈').previousElementSibling;
    const submitButton = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    fireEvent.click(submitButton);

    expect(textarea).toBeDisabled();
    expect(coalModeCheckbox).toBeDisabled();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(textarea).not.toBeDisabled();
    });
  });

  it('shows loading spinner when submitting', async () => {
    render(<GiftBot />);
    
    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    const submitButton = screen.getByRole('button');
    
    fireEvent.change(textarea, { target: { value: 'test prompt' } });
    fireEvent.click(submitButton);

    expect(screen.getByText("🎄 Thinking...")).toBeInTheDocument();
    expect(screen.getByText("Santa's elves are brainstorming...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("🎄 Thinking...")).not.toBeInTheDocument();
    });
  });

  it('clears previous result when starting new request', async () => {
    render(<GiftBot />);
    
    const mockDataCheckbox = screen.getByText('Use Mock Data').previousElementSibling;
    fireEvent.click(mockDataCheckbox);

    const textarea = screen.getByPlaceholderText('Describe the person and occasion...');
    const submitButton = screen.getByRole('button');
    
    fireEvent.change(textarea, { target: { value: 'first request' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText("🎄 Thinking...")).not.toBeInTheDocument();
    });

    const firstResult = screen.getByText(/🎁|😈/);
    const firstResultText = firstResult.textContent;

    fireEvent.change(textarea, { target: { value: 'second request' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(firstResultText)).not.toBeInTheDocument();
    expect(screen.getByText("Santa's elves are brainstorming...")).toBeInTheDocument();
  });
});