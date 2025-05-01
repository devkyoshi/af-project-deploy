import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  addFavoriteCountry as addFavorite,
  removeFavoriteCountry as removeFavorite,
  getFavoriteCountries,
} from "../services/favourite-service";
import { useAuth } from "./auth-context";

const FavoritesContext = createContext({
  favorites: [],
  loading: false,
  error: null,
  isFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchFavorites = useCallback(async () => {
    try {
      if (!currentUser) return;
      setLoading(true);
      const data = await getFavoriteCountries(currentUser);
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchFavorites().then();
  }, [fetchFavorites]);

  const isFavorite = useCallback(
    (countryName) => favorites.some((c) => c.name === countryName),
    [favorites],
  );

  const addFavoriteCountry = async (country) => {
    try {
      await addFavorite(country, currentUser);
      setFavorites((prev) => [...prev, formatCountry(country)]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFavoriteCountry = async (country) => {
    try {
      await removeFavorite(currentUser, country);
      setFavorites((prev) =>
        prev.filter((c) => c.name !== country.name.common),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const formatCountry = (country) => ({
    name: country.name.common,
    capital: country.capital?.[0] || "—",
    flag: country.flags?.svg || "",
    population: country.population,
  });

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        error,
        isFavorite,
        addFavorite: addFavoriteCountry,
        removeFavorite: removeFavoriteCountry,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
