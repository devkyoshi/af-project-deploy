import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './theme-toggler';
import * as themeContext from '../contexts/theme-context.jsx';

// Mock the useTheme hook
vi.mock('../contexts/theme-context.jsx', () => ({
  useTheme: vi.fn()
}));

describe('ThemeToggle Component', () => {
  it('renders in light mode correctly', () => {
    // Mock the useTheme hook to return light theme
    themeContext.useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn()
    });

    render(<ThemeToggle />);
    
    // Check that the switch is rendered and not checked (light mode)
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).not.toBeChecked();
  });

  it('renders in dark mode correctly', () => {
    // Mock the useTheme hook to return dark theme
    themeContext.useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn()
    });

    render(<ThemeToggle />);
    
    // Check that the switch is rendered and checked (dark mode)
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
  });

  it('calls toggleTheme when clicked', () => {
    // Create a mock function for toggleTheme
    const toggleThemeMock = vi.fn();
    
    // Mock the useTheme hook
    themeContext.useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock
    });

    render(<ThemeToggle />);
    
    // Get the switch and click it
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    
    // Check that toggleTheme was called
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
});