
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders the application correctly', () => {
    render(<App />);
    // Verify the gamification header renders properly
    expect(screen.getByText(/5 Day Streak/i)).toBeInTheDocument();
    expect(screen.getByText(/Eco Warrior/i)).toBeInTheDocument();
  });
});
