import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './nav-bar';
import * as authContext from '../contexts/auth-context.jsx';
import * as themeContext from '../contexts/theme-context.jsx';
import * as reactRouterDom from 'react-router-dom';

// Mock the hooks
vi.mock('../contexts/auth-context.jsx', () => ({
  useAuth: vi.fn()
}));

vi.mock('../contexts/theme-context.jsx', () => ({
  useTheme: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}));

// Mock the ThemeToggle component
vi.mock('./theme-toggler.jsx', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle Mock</div>
}));

describe('Navbar Component', () => {
  const mockNavigate = vi.fn();
  const mockLogout = vi.fn();
  const mockSetCollapsed = vi.fn();
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup default mocks
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
    
    authContext.useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { photoURL: '/test-avatar.jpg' }
    });
    
    themeContext.useTheme.mockReturnValue({
      theme: 'light'
    });
  });

  it('renders correctly with collapsed sidebar', () => {
    render(<Navbar collapsed={true} setCollapsed={mockSetCollapsed} />);
    
    // Check that the user avatar is rendered
    const avatar = screen.getByAltText('user-menu');
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toContain('/test-avatar.jpg');
  });

  it('renders correctly with expanded sidebar', () => {
    render(<Navbar collapsed={false} setCollapsed={mockSetCollapsed} />);
    
    // Check that the user avatar is rendered
    const avatar = screen.getByAltText('user-menu');
    expect(avatar).toBeInTheDocument();
  });

  it('toggles sidebar when button is clicked', () => {
    render(<Navbar collapsed={true} setCollapsed={mockSetCollapsed} />);
    
    // Find and click the toggle button
    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    
    // Check that setCollapsed was called with the opposite of the current state
    expect(mockSetCollapsed).toHaveBeenCalledWith(false);
  });

  it('uses default avatar when user has no photo', () => {
    // Mock user with no photo
    authContext.useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { photoURL: null }
    });
    
    render(<Navbar collapsed={true} setCollapsed={mockSetCollapsed} />);
    
    // Check that the default avatar is used
    const avatar = screen.getByAltText('user-menu');
    expect(avatar.src).toContain('/user-avatar.jpg');
  });

  it('applies dark theme styles when theme is dark', () => {
    // Mock dark theme
    themeContext.useTheme.mockReturnValue({
      theme: 'dark'
    });
    
    render(<Navbar collapsed={true} setCollapsed={mockSetCollapsed} />);
    
    // Check that the navbar has the dark theme class
    const navbar = screen.getByRole('button').parentElement;
    expect(navbar.className).toContain('bg-white/8');
  });
});