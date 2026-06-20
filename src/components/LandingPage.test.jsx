import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LandingPage from './LandingPage';

describe('LandingPage Component', () => {
  it('renders correctly and displays the hero title', () => {
    const mockOnStart = vi.fn();
    const mockOnStartTracker = vi.fn();

    render(
      <LandingPage 
        onStart={mockOnStart} 
        onStartTracker={mockOnStartTracker} 
      />
    );

    // Verify main headings are present
    expect(screen.getByText(/ECO-EVOLUTION/i)).toBeTruthy();
    expect(screen.getByText(/The ultimate client-side engine/i)).toBeTruthy();
  });
});
