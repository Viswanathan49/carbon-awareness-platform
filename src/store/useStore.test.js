import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('Zustand Global Store', () => {
  beforeEach(() => {
    // Reset state before each test
    useStore.setState({
      language: 'EN',
      carbonScore: 0,
      pointsEarned: 0,
      theme: 'light',
    });
  });

  it('toggles language between EN and HI', () => {
    expect(useStore.getState().language).toBe('EN');
    useStore.getState().toggleLanguage();
    expect(useStore.getState().language).toBe('HI');
  });

  it('sets and adds carbon score', () => {
    useStore.getState().setCarbonScore(50);
    expect(useStore.getState().carbonScore).toBe(50);
    
    useStore.getState().addCarbonScore(100);
    expect(useStore.getState().carbonScore).toBe(150);
  });

  it('sets and adds points without going below zero', () => {
    useStore.getState().setPointsEarned(10);
    expect(useStore.getState().pointsEarned).toBe(10);

    useStore.getState().addPointsEarned(5);
    expect(useStore.getState().pointsEarned).toBe(15);
    
    useStore.getState().addPointsEarned(-20);
    expect(useStore.getState().pointsEarned).toBe(0); // Math.max(0, ...)
  });

  it('toggles theme correctly', () => {
    expect(useStore.getState().theme).toBe('light');
    useStore.getState().toggleTheme();
    expect(useStore.getState().theme).toBe('dark');
    useStore.getState().toggleTheme();
    expect(useStore.getState().theme).toBe('light');
  });
});
