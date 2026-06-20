import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component Integration', () => {
  it('renders the app without crashing', () => {
    render(<App />);
    expect(screen.getAllByText(/CarbonPulse/i).length).toBeGreaterThan(0);
  });

  it('handles "Calculate My Footprint" click without throwing ErrorBoundary', async () => {
    render(<App />);
    
    // Find the calculate button
    const calcButton = screen.getByText(/Calculate My Footprint/i);
    expect(calcButton).toBeInTheDocument();

    // Fire form submission (simulating the click)
    fireEvent.click(calcButton);

    // Wait and ensure no ErrorBoundary text is displayed
    await waitFor(() => {
      expect(screen.queryByText(/System Diagnostics: Interface reboot required/i)).not.toBeInTheDocument();
      // It should display the results section 
      expect(screen.getByText(/Your Estimated Footprint/i)).toBeInTheDocument();
    });
  });
});
