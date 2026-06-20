import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SystemTour from './SystemTour';

describe('SystemTour Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<SystemTour />);
    expect(container).toBeTruthy();
  });
});
