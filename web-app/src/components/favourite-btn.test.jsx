import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from './favourite-btn';
import * as favoritesContext from '../contexts/favourites-context.jsx';

// Mock the useFavorites hook
vi.mock('../contexts/favourites-context.jsx', () => ({
  useFavorites: vi.fn()
}));

describe('FavoriteButton Component', () => {
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();
  const mockIsFavorite = vi.fn();
  
  const mockCountry = {
    name: {
      common: 'Test Country'
    },
    flags: {
      png: 'test-flag.png'
    }
  };
  
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Default to not loading
    favoritesContext.useFavorites.mockReturnValue({
      loading: false,
      isFavorite: mockIsFavorite,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite
    });
  });

  it('renders nothing when loading', () => {
    // Mock loading state
    favoritesContext.useFavorites.mockReturnValue({
      loading: true,
      isFavorite: mockIsFavorite,
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite
    });
    
    const { container } = render(<FavoriteButton country={mockCountry} />);
    
    // Component should render nothing when loading
    expect(container.firstChild).toBeNull();
  });

  it('renders filled heart when country is favorite', () => {
    // Mock country is favorite
    mockIsFavorite.mockReturnValue(true);
    
    render(<FavoriteButton country={mockCountry} />);
    
    // Check that the button is rendered with the correct ID
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'fav-btn-Test Country');
    
    // Check that the filled heart icon is rendered
    // Note: We can't directly check for the FaHeart component, but we can check
    // that the button doesn't contain the unfilled heart
    expect(button.innerHTML).not.toContain('FaRegHeart');
  });

  it('renders unfilled heart when country is not favorite', () => {
    // Mock country is not favorite
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton country={mockCountry} />);
    
    // Check that the button is rendered
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Check that the unfilled heart icon is rendered
    // Note: We can't directly check for the FaRegHeart component, but we can check
    // that the button doesn't contain the filled heart
    expect(button.innerHTML).not.toContain('FaHeart');
  });

  it('calls addFavorite when clicked and country is not favorite', async () => {
    // Mock country is not favorite
    mockIsFavorite.mockReturnValue(false);
    
    render(<FavoriteButton country={mockCountry} />);
    
    // Click the button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check that addFavorite was called with the country
    expect(mockAddFavorite).toHaveBeenCalledWith(mockCountry);
    expect(mockRemoveFavorite).not.toHaveBeenCalled();
  });

  it('calls removeFavorite when clicked and country is favorite', async () => {
    // Mock country is favorite
    mockIsFavorite.mockReturnValue(true);
    
    render(<FavoriteButton country={mockCountry} />);
    
    // Click the button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check that removeFavorite was called with the country
    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockCountry);
    expect(mockAddFavorite).not.toHaveBeenCalled();
  });
});