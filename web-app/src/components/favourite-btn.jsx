import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../contexts/favourites-context.jsx";

const FavoriteButton = ({ country }) => {
  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites();

  const handleToggle = async () => {
    const countryName = country.name.common;
    if (isFavorite(countryName)) {
      await removeFavorite(country);
    } else {
      await addFavorite(country);
    }
  };

  if (loading) return null;

  return (
    <button
      id={`fav-btn-${country.name.common}`}
      onClick={handleToggle}
      className="text-red-500 text-xl hover:text-red-700 cursor-pointer"
    >
      {isFavorite(country.name.common) ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default FavoriteButton;
