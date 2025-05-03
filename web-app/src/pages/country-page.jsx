import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCountryByName } from "../services/country-service.js";
import {
  ArrowLeftIcon,
  Globe,
  Compass,
  MapPinned,
  MapPin,
  NavigationIcon,
} from "lucide-react";
import { useTheme } from "../contexts/theme-context.jsx";
import FavoriteButton from "../components/favourite-btn.jsx";

export const CountryPage = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { name } = useParams();
  const { theme } = useTheme();

  const [formattedCountry, setFormattedCountry] = useState({
    name: {
      common: "",
    },
    capital: "",
    flag: "",
    population: 0,
  });

  useEffect(() => {
    const decoded = decodeURIComponent(name);
    setLoading(true);

    getCountryByName(decoded)
      .then((full) => {
        if (!full) navigate("/");
        else {
          setCountry(full);
          setFormattedCountry({
            name: {
              common: full.commonName,
            },
            capital: full.capital,
            flag: full.flagImages.png,
            population: full.population,
          });
        }
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [name, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent dark:border-blue-400"></div>
      </div>
    );
  }

  if (!country) return null;

  const basicInfo = [
    { label: "Official Name", value: country.officialName },
    { label: "ISO Codes", value: `${country.alpha2} / ${country.alpha3}` },
    { label: "Population", value: country.population.toLocaleString() },
    { label: "Area", value: `${country.areaKm2.toLocaleString()} km²` },
    { label: "Capital", value: country.capital },
    { label: "Region", value: `${country.region} / ${country.subregion}` },
  ];

  const culturalInfo = [
    { label: "Languages", value: country.languages.join(", ") },
    {
      label: "Currencies",
      value: country.currencies
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", "),
    },
    { label: "Calling Code", value: country.callingCode },
    { label: "Driving Side", value: country.driving.side },
    { label: "Start of Week", value: country.startOfWeek },
    { label: "Time Zones", value: country.timezones.join(", ") },
  ];

  const renderDetailItem = (label, value) => (
    <div
      className={`flex  justify-between items-center py-3 px-4  ${
        theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-50"
      }  last:border-0 transition-colors`}
    >
      <span
        className={`text-sm   ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
      >
        {label}
      </span>
      <span
        className={`text-right font-medium ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
      >
        {value || "—"}
      </span>
    </div>
  );

  return (
    <div
      className={`mx-auto p-4 sm:p-6 lg:p-8  ${theme === "dark" ? "bg-white/10" : ""}`}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 flex items-center px-4 py-2 rounded-lg transition-colors ${
          theme === "dark"
            ? "text-gray-300 hover:bg-white/10 hover:text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back
      </button>

      {/* Main card */}
      <div
        className={`rounded-xl shadow-lg p-6 transition-colors min-h-lvh ${
          theme === "dark" ? "bg-white/4 border border-white/10" : "bg-white"
        }`}
      >
        {/* Header section */}
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
          <div className="flex-shrink-0">
            <img
              src={country.flagImages.png}
              alt={`${country.commonName} flag`}
              className="w-48 h-36 object-cover rounded-lg border shadow-sm dark:border-white/10"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className={`text-3xl font-bold mb-1  ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {country.commonName}
            </h1>
            <p
              className={`text-lg font-bold mb-1  ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {country.officialName}
            </p>

            <div
              className={`group transition-all items-center duration-300 hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "text-gray-400 bg-white/10 hover:bg-white/20 hover:shadow-black/20"
                  : "text-gray-700 bg-gray-200/30 hover:bg-gray-300/50 hover:shadow-gray-400/30"
              } flex items-center justify-between w-28 mt-4 p-2 gap-2 rounded-md cursor-pointer transform-gpu`}
            >
              <p className="transition-colors duration-300 ">Favourite</p>
              |
              <FavoriteButton country={formattedCountry} />
            </div>
          </div>

          {country.coatOfArmsImages?.png && (
            <div className="hidden sm:block flex-shrink-0">
              <img
                src={country.coatOfArmsImages.png}
                alt={`${country.commonName} coat of arms`}
                className="w-24 h-24 object-contain dark:invert"
              />
            </div>
          )}
        </div>

        {/* Tabs navigation */}
        <nav
          className={`border-b  mb-6 ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}
        >
          <div className="flex space-x-8 ">
            {["overview", "cultural", "maps"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? `border-b-2 border-blue-500 ${theme === "dark" ? "text-blue-600" : "dark:text-blue-400"}  `
                    : ` ${theme === "dark" ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"} `
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Tab content */}
        <div>
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {basicInfo.map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${
                    theme === "dark"
                      ? "bg-white/2 border-white/10"
                      : "bg-gray-50 border-gray-600/10"
                  }`}
                >
                  <dt
                    className={`text-sm font-medium   ${theme === "dark" ? "text-blue-500/80" : "text-gray-500"}`}
                  >
                    {item.label}
                  </dt>
                  <dd
                    className={`mt-1   ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          )}

          {activeTab === "cultural" && (
            <div
              className={`rounded-lg overflow-hidden border  ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}
            >
              {culturalInfo.map((item, i) => (
                <div key={i}>{renderDetailItem(item.label, item.value)}</div>
              ))}
            </div>
          )}

          {activeTab === "maps" && (
            <div className="space-y-6">
              {/* Map Links with improved styling */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={country.mapLinks?.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all 
          ${
            theme === "dark"
              ? "border-blue-400/20 bg-blue-400/10 hover:bg-blue-400/15 hover:border-blue-400/30 text-blue-300"
              : "border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/15 hover:border-blue-500/30 text-blue-700"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-400/50`}
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
                <a
                  href={country?.mapLinks.openStreet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-all 
          ${
            theme === "dark"
              ? "border-emerald-400/20 bg-emerald-400/10 hover:bg-emerald-400/15 hover:border-emerald-400/30 text-emerald-300"
              : "border-emerald-600/20 bg-emerald-600/10 hover:bg-emerald-600/15 hover:border-emerald-600/30 text-emerald-700"
          }
          focus:outline-none focus:ring-2 focus:ring-emerald-400/50`}
                >
                  <MapPinned className="w-4 h-4" />
                  OpenStreetMap
                </a>
              </div>

              {/* Geographic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className={`p-6 rounded-xl  border ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-50 border-gray-200/80"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <Globe className="w-5 h-5 inline-block mr-2" />
                    Geographic Context
                  </h3>
                  <div className="space-y-3">
                    {renderDetailItem(
                      "Continents",
                      country.continents.join(", ") + " " + country?.emojiFlag,
                    )}
                    {renderDetailItem(
                      "Bordering Countries",
                      country.borders?.length ? (
                        <span className="flex flex-wrap gap-2">
                          {country?.borders?.map((border, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 rounded-md bg-gray-200/30 text-sm ${theme === "dark" ? "bg-white/10 " : ""}`}
                            >
                              {border}
                            </span>
                          ))}
                        </span>
                      ) : (
                        "No land borders"
                      ),
                    )}
                  </div>
                </div>

                <div
                  className={`p-6 rounded-xl border ${
                    theme === "dark"
                      ? "bg-white/5 border-white/10"
                      : "bg-gray-50 border-gray-200/80"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-4 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <NavigationIcon className="w-5 h-5 inline-block mr-2" />
                    Coordinates
                  </h3>
                  <div className="space-y-3">
                    {renderDetailItem(
                      "Latitude",
                      `${country?.coordinates.lat.toFixed(4)}° ${country?.coordinates.lat > 0 ? "N" : "S"}`,
                    )}
                    {renderDetailItem(
                      "Longitude",
                      `${country?.coordinates.lng.toFixed(4)}° ${country?.coordinates.lng > 0 ? "E" : "W"}`,
                    )}
                    {renderDetailItem(
                      "Map Region",
                      `${country?.region} (${country?.subregion})`,
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Map Services */}
              <div
                className={`p-6 rounded-xl border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200/80"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  <Compass className="w-5 h-5 inline-block mr-2" />
                  Additional Navigation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {country?.timezones.map((tz, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-white/10"
                          : "bg-white hover:bg-gray-100"
                      } transition-colors`}
                    >
                      🕒 {tz}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
