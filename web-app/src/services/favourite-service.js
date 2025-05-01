import { db } from "../config/firebase.config.js";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

/**
 * Check if a country is in the favorite list.
 * @param {Array} favorites - Array of favorite country objects.
 * @param {string} countryName - Common name of the country.
 * @returns {boolean}
 */
export const isCountryFavorite = (favorites, countryName) => {
  return favorites.some((c) => c.name === countryName);
};

/**
 * Format a country object to store in Firestore.
 * @param {object} country
 * @returns {object}
 */
const formatCountryForFirestore = (country) => ({
  name: country.name.common,
  capital: country.capital || "—",
  flag: country.flag || "",
  population: country.population,
});

/**
 * Add a country to the user's favorites in Firestore.
 * @param {object} country - Full country object.
 * @param {object} currentUser - Firebase auth user object.
 */
export const addFavoriteCountry = async (country, currentUser) => {
  if (!currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", currentUser.uid);
  const formatted = formatCountryForFirestore(country);

  try {
    await setDoc(
      userRef,
      {
        favorites: arrayUnion(formatted),
      },
      { merge: true },
    );
  } catch (e) {
    console.error("Error adding favorite:", e);
  }
};

/**
 * Remove a country from the user's favorites in Firestore.
 * @param {object} currentUser - Firebase auth user object.
 * @param {object} country - Full country object.
 */
export const removeFavoriteCountry = async (currentUser, country) => {
  if (!currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", currentUser.uid);
  const formatted = formatCountryForFirestore(country);

  try {
    await updateDoc(userRef, {
      favorites: arrayRemove(formatted),
    });
  } catch (e) {
    console.error("Error removing favorite:", e);
  }
};

/**
 * Get all favorite countries for the user.
 * @param {object} currentUser - Firebase auth user object.
 * @returns {Promise<Array>}
 */
export const getFavoriteCountries = async (currentUser) => {
  if (!currentUser) throw new Error("User not logged in");

  const userRef = doc(db, "users", currentUser.uid);

  try {
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites || [];
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error fetching favorites:", e);
    return [];
  }
};
