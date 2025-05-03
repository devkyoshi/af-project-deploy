import { useCountry } from "../contexts/country-context.jsx";
import { useMemo, useState } from "react";
import { Card, Pagination, Skeleton, Input } from "antd";
import { useTheme } from "../contexts/theme-context.jsx";
import { Search, Users, MapPin, DollarSign, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/favourite-btn.jsx";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { countries, loading, setSelectedCountry } = useCountry();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

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
    pagination:
      theme === "dark"
        ? "bg-white/5 border border-white/10"
        : "bg-white border-gray-200",
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    navigate(`/countries/${encodeURIComponent(country.name.common)}`);
  };

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name?.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [countries, searchTerm]);

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${themeClasses.container}`}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 border-b pb-2 ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}
        >
          <h1
            className={`text-4xl mb-1 font-bold flex items-center justify-center gap-3 ${themeClasses.textMuted}`}
          >
            <Globe2 className="h-9 w-9" />
            Global Explorer
          </h1>
          <p className={`text-lg ${themeClasses.textMuted}`}>
            Browse all {countries.length} countries worldwide
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search countries..."
            prefix={<Search className={`h-4 w-4 ${themeClasses.textMuted}`} />}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`rounded-lg ${themeClasses.input}`}
            allowClear
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCountries
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((country) => (
                  <Card
                    key={country.name.common}
                    hoverable
                    onClick={() => handleCountryClick(country)}
                    className={`transition-all duration-300 shadow-lg ${themeClasses.card} border-2`}
                    cover={
                      <div className="relative h-48 overflow-hidden">
                        <img
                          alt={country.name.common}
                          src={country.flags.png}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    }
                  >
                    <div className="flex items-center justify-between mb-2">
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

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin
                          className={`h-5 w-5 ${themeClasses.textMuted}`}
                        />
                        <span className={themeClasses.textMuted}>
                          {country.capital?.[0] || "N/A"}
                        </span>
                      </div>

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
                          {country.currencies
                            ? Object.values(country.currencies)
                                .map((c) => c.name)
                                .join(", ")
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            <div className="mt-8">
              <div
                className={`rounded-lg p-4 ${themeClasses.pagination} shadow-sm`}
              >
                <Pagination
                  total={filteredCountries.length}
                  current={currentPage}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger
                  pageSizeOptions={[8, 20, 50, 100]}
                  className="flex justify-center"
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} countries`
                  }
                />
              </div>
            </div>
          </>
        )}

        {!loading && filteredCountries.length === 0 && (
          <div
            className={`text-center py-12 rounded-lg ${themeClasses.card} ${themeClasses.textMuted}`}
          >
            <div className="text-2xl mb-4">🌎</div>
            No countries found matching your search
          </div>
        )}
      </div>
    </div>
  );
};
