import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the dependencies
vi.mock('./config/app-routes.jsx', () => ({
  AppRoutes: () => <div data-testid="app-routes">Mocked App Routes</div>
}));

vi.mock('./contexts/theme-context.jsx', () => ({
  CustomThemeProvider: ({ children }) => <div data-testid="theme-provider">{children}</div>
}));

vi.mock('antd-style', () => ({
  StyleProvider: ({ children }) => <div data-testid="style-provider">{children}</div>
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    
    // Verify that all providers are rendered
    expect(screen.getByTestId('style-provider')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();
  });

  it('renders providers in the correct order', () => {
    render(<App />);
    
    // Get all elements
    const styleProvider = screen.getByTestId('style-provider');
    const themeProvider = screen.getByTestId('theme-provider');
    const appRoutes = screen.getByTestId('app-routes');
    
    // Check nesting order
    expect(styleProvider).toContainElement(themeProvider);
    expect(themeProvider).toContainElement(appRoutes);
  });
});