import { useState, useEffect, useMemo } from "react";
import { Input, Skeleton, Card, Alert } from "antd";
import { SearchIcon, Users, DollarSign, MapPin, Globe } from "lucide-react";
import { getCountriesByCurrency } from "../services/country-service.js";
import { useTheme } from "../contexts/theme-context.jsx";
import FavoriteButton from "../components/favourite-btn.jsx";

const { Meta } = Card;

export const CurrencyPage = () => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    if (currencyCode.trim().length >= 3) {
      setLoading(true);
      setError("");
      getCountriesByCurrency(currencyCode.trim().toUpperCase())
        .then((data) => {
          if (data.length === 0) {
            setError("No countries found for this currency code");
          }
          setCountries(data);
        })
        .catch((err) => {
          setError("Invalid currency code or API error");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [currencyCode]);

  const filteredCountries = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          country.name.official
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [countries, searchQuery],
  );

  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-white/10 text-gray-100"
        : "bg-gray-50 text-gray-900",
    card:
      theme === "dark"
        ? "bg-gray-800 border-gray-700 hover:border-blue-400"
        : "bg-white border-gray-200 hover:border-blue-300",
    input:
      theme === "dark"
        ? "bg-gray-800 border-gray-700 text-white"
        : "bg-white border-gray-300",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${themeClasses.container}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 border-b pb-2 border-gray-200 ${
            theme === "dark" ? "border-white/10" : ""
          }`}
        >
          <h1
            className={`text-4xl mb-1 font-bold flex items-center justify-center gap-3 ${themeClasses.textMuted}`}
          >
            <DollarSign className="h-9 w-9" />
            Currency Explorer
          </h1>
          <p className={`text-lg ${themeClasses.textMuted}`}>
            Discover countries using {currencyCode.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Enter currency code (e.g., USD, EUR)..."
            prefix={
              <DollarSign className={`h-4 w-4 ${themeClasses.textMuted}`} />
            }
            onChange={(e) => setCurrencyCode(e.target.value)}
            className={`rounded-lg ${themeClasses.input}`}
            value={currencyCode}
            maxLength={3}
            allowClear
          />

          <Input
            placeholder="Filter countries..."
            prefix={
              <SearchIcon className={`h-4 w-4 ${themeClasses.textMuted}`} />
            }
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`rounded-lg ${themeClasses.input}`}
            allowClear
          />
        </div>

        {error && (
          <Alert
            message={error}
            type="warning"
            showIcon
            className="mb-6"
            closable
          />
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                active
                avatar
                paragraph={{ rows: 3 }}
                className={`rounded-lg ${themeClasses.card} p-4`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCountries.map((country) => (
              <Card
                key={country.name.common}
                hoverable
                className={`transition-all duration-300 shadow-lg ${themeClasses.card} border-2`}
                cover={
                  <div className="relative h-48 overflow-hidden">
                    <img
                      alt={country.name.common}
                      src={country.flags.png}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0" />
                  </div>
                }
              >
                <Meta
                  title={
                    <div className={"flex items-center justify-between mb-2"}>
                      <h3
                        className={`text-xl font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {country.name.common}
                      </h3>
                      <FavoriteButton
                        country={{
                          ...country,
                          flag: country.flags.png,
                        }}
                      />
                    </div>
                  }
                  description={
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Users
                          className={`h-5 w-5 ${themeClasses.textMuted}`}
                        />
                        <span className={themeClasses.textMuted}>
                          {new Intl.NumberFormat().format(country.population)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <DollarSign
                          className={`h-5 w-5 ${themeClasses.textMuted}`}
                        />
                        <span className={themeClasses.textMuted}>
                          {Object.values(country.currencies)
                            .map((c) => `${c.name} (${c.symbol})`)
                            .join(", ")}
                        </span>
                      </div>

                      {country.capital && (
                        <div className="flex items-center gap-3">
                          <MapPin
                            className={`h-5 w-5 ${themeClasses.textMuted}`}
                          />
                          <span className={themeClasses.textMuted}>
                            {country.capital.join(", ")}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <Globe
                          className={`h-5 w-5 ${themeClasses.textMuted}`}
                        />
                        <a
                          href={country.mapLinks.googleMaps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View on Map
                        </a>
                      </div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredCountries.length === 0 && !error && (
          <div
            className={`text-center py-12 rounded-lg ${themeClasses.card} ${themeClasses.textMuted}`}
          >
            <div className="text-2xl mb-4">💱</div>
            Enter a valid 3-letter currency code to begin
          </div>
        )}
      </div>
    </div>
  );
};
