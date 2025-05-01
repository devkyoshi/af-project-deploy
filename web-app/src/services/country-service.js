import api from "../config/axios-config.js";

export const getAllCountries = async () => {
  try {
    const res = await api.get(
      "/all?fields=name,capital,currencies,flags,population,maps",
    );

    return (
      res.data &&
      res.data.map((country) => ({
        name: country.name,
        currencies: country.currencies,
        capital: country.capital,
        flags: country.flags,
        population: country.population,
      }))
    );
  } catch (e) {
    console.error("Error fetching countries:", e);
    return [];
  }
};

/**
 * Fetches detailed info for one country.
 * @param {string} countryName – the common name, e.g. "Sri Lanka"
 * @returns {Promise<CountryDetails|null>}
 */
export const getCountryByName = async (countryName) => {
  try {
    // fullText=true ensures an exact match on the common name
    const res = await api.get(
      `/name/${encodeURIComponent(countryName)}?fullText=true&fields=` +
        [
          // identity
          "name,cca2,cca3,cioc,flag",
          // geography & codes
          "capital,region,subregion,continents,area,latlng,timezones,borders",
          // people & society
          "population,demonyms,gini,startOfWeek",
          // languages & money
          "languages,currencies,idd",
          // transport & postal
          "car,postalCode",
          // media
          "flags,coatOfArms,maps",
        ].join(","),
    );

    if (!Array.isArray(res.data) || res.data.length === 0) return null;
    const c = res.data[0];

    // transform into a friendlier shape
    return {
      commonName: c.name.common,
      officialName: c.name.official,
      nativeNames: Object.values(c.name.nativeName || {}).map((n) => ({
        lang: n.common,
        official: n.official,
      })),
      alpha2: c.cca2,
      alpha3: c.cca3,
      cioc: c.cioc,
      emojiFlag: c.flag,

      capital: c.capital?.[0] || "—",
      region: c.region,
      subregion: c.subregion,
      continents: c.continents,
      coordinates: { lat: c.latlng[0], lng: c.latlng[1] },
      timezones: c.timezones,
      borders: c.borders || [],

      population: c.population,
      areaKm2: c.area,
      demonyms: c.demonyms?.eng || { m: "", f: "" },
      gini: c.gini ? c.gini[Object.keys(c.gini)[0]] : null,
      startOfWeek: c.startOfWeek,

      languages: Object.values(c.languages || {}),
      currencies: Object.entries(c.currencies || {}).map(([code, cur]) => ({
        code,
        name: cur.name,
        symbol: cur.symbol,
      })),
      callingCode: `${c.idd.root}${c.idd.suffixes?.[0] || ""}`,
      driving: { side: c.car.side, signs: c.car.signs },

      postalCode: c.postalCode?.format,

      flagImages: { png: c.flags.png, svg: c.flags.svg },
      coatOfArmsImages: { png: c.coatOfArms.png, svg: c.coatOfArms.svg },
      mapLinks: {
        google: c.maps.googleMaps,
        openStreet: c.maps.openStreetMaps,
      },
    };
  } catch (e) {
    console.error("Error fetching country details:", e);
    return null;
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const res = await api.get(
      `/region/${region}?fields=name,capital,currencies,flags,population,maps`,
    );

    return (
      res.data &&
      res.data.map((country) => ({
        name: country.name,
        currencies: country.currencies,
        capital: country.capital,
        flags: country.flags,
        population: country.population,
        mapLinks: country.maps,
      }))
    );
  } catch (e) {
    console.error("Error fetching countries by region:", e);
    return [];
  }
};
