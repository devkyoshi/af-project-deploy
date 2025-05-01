import { useCountry } from "../hooks/country-context.jsx";
import { useMemo, useState } from "react";
import { Card, Pagination, Spin, Input } from "antd";
import { useTheme } from "../hooks/theme-context.jsx";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { countries, loading, setSelectedCountry } = useCountry();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const { theme } = useTheme();

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    navigate(`/countries/${encodeURIComponent(country.name.common)}`);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name?.common.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [countries, searchTerm]);

  return (
    <div
      className={`flex flex-col overflow-hidden  ${theme === "dark" ? "bg-white/10" : "bg-white"} h-full`}
    >
      <Spin spinning={loading}>
        {/* Searchbar*/}
        <div className={`mx-4 flex justify-end`}>
          <div className={`flex justify-center rounded-lg py-2 mt-2`}>
            <Input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for a country..."
              prefix={<Search className={"h-4 w-4"} />}
            />
          </div>
        </div>
        <div className="flex flex-col h-full">
          {/* Scrollable content area */}
          <div className={`flex-1 overflow-y-auto p-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCountries
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((country, index) => (
                  <div key={index}>
                    <Card
                      hoverable
                      onClick={() => handleCountryClick(country)}
                      className="w-full h-full shadow-md hover:shadow-lg transition-shadow duration-300"
                      cover={
                        <img
                          alt={country.name?.common}
                          src={country.flags?.png}
                          className="h-32 object-cover rounded-t-lg"
                        />
                      }
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg truncate">
                          {country.name?.common}
                        </h3>
                        <span className="text-xs border rounded px-2 py-1  text-green-600 font-semibold">
                          {country.currencies
                            ? Object.keys(country.currencies)[0]
                            : "N/A"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <span className="font-semibold">Capital:</span>{" "}
                          {country.capital?.[0] || "N/A"}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
            </div>
          </div>

          <div className="mx-4">
            <div
              className={`flex justify-center rounded-lg p-2 mt-2 ${
                theme === "dark"
                  ? "bg-white/5 border border-white/10"
                  : "bg-white"
              }`}
            >
              <Pagination
                total={countries.length}
                current={currentPage}
                pageSize={pageSize}
                onChange={handlePageChange}
                showTotal={(total, range) =>
                  window.innerWidth >= 1024
                    ? `${range[0]}-${range[1]} of ${total} countries`
                    : `${total} countries`
                }
                showSizeChanger
                pageSizeOptions={[8, 20, 50, 100]}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
};
