import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SideBar } from './side-bar';
import * as authContext from '../contexts/auth-context.jsx';
import * as reactRouterDom from 'react-router-dom';
import * as useWindowHook from '../hooks/use-window.jsx';

// Mock the hooks
vi.mock('../contexts/auth-context.jsx', () => ({
  useAuth: vi.fn()
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn()
}));

vi.mock('../hooks/use-window.jsx', () => ({
  useWindowSize: vi.fn()
}));

describe('SideBar Component', () => {
  const mockNavigate = vi.fn();
  const mockLogout = vi.fn();
  const mockOnCollapse = vi.fn();
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Setup default mocks
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
    reactRouterDom.useLocation.mockReturnValue({ pathname: '/dashboard' });
    
    authContext.useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { 
        photoURL: '/test-avatar.jpg',
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });
    
    // Default to desktop view
    useWindowHook.useWindowSize.mockReturnValue({
      width: 1024,
      height: 768
    });
  });

  it('renders desktop sidebar when not on mobile', () => {
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Check that the logo is rendered
    const logo = screen.getAllByAltText('logo')[0];
    expect(logo).toBeInTheDocument();
    
    // Check that the menu items are rendered
    expect(screen.getByText('All Countries')).toBeInTheDocument();
    expect(screen.getByText('Regions')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
    
    // Check that the user info is rendered
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('renders mobile menu when on mobile', () => {
    // Mock mobile view
    useWindowHook.useWindowSize.mockReturnValue({
      width: 375,
      height: 667
    });
    
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Check that the mobile header is rendered
    const mobileMenuButton = screen.getByRole('button');
    expect(mobileMenuButton).toBeInTheDocument();
    
    // Mobile drawer should not be visible initially
    expect(screen.queryByText('All Countries')).not.toBeInTheDocument();
    
    // Click the menu button to open the drawer
    fireEvent.click(mobileMenuButton);
    
    // Now the menu items should be visible
    expect(screen.getByText('All Countries')).toBeInTheDocument();
  });

  it('navigates when menu item is clicked', () => {
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Click on a menu item
    fireEvent.click(screen.getByText('Regions'));
    
    // Check that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/regions');
  });

  it('calls logout when logout menu item is clicked', () => {
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Find and click the user dropdown to show the menu
    const userDropdown = screen.getByAltText('user');
    fireEvent.click(userDropdown);
    
    // Find and click the logout button
    // Note: In a real test, you might need to use a different approach to find the logout button
    // as it might not be immediately visible in the DOM until the dropdown is clicked
    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    
    // Check that logout was called
    expect(mockLogout).toHaveBeenCalled();
  });

  it('uses default avatar when user has no photo', () => {
    // Mock user with no photo
    authContext.useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { 
        photoURL: null,
        displayName: 'Test User',
        email: 'test@example.com'
      }
    });
    
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Check that the default avatar is used
    const avatar = screen.getByAltText('user');
    expect(avatar.src).toContain('/user-avatar.jpg');
  });

  it('collapses sidebar when onCollapse is called', () => {
    render(<SideBar collapsed={false} onCollapse={mockOnCollapse} />);
    
    // Simulate a collapse event (this would typically be triggered by the Layout component)
    // We can't directly test this without mocking the Ant Design Sider component,
    // but we can verify that the component renders correctly when collapsed
    
    // Re-render with collapsed=true
    render(<SideBar collapsed={true} onCollapse={mockOnCollapse} />);
    
    // When collapsed, the title should not be visible
    expect(screen.queryByText('NationScope')).not.toBeInTheDocument();
  });
});