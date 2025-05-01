import { Button } from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useTheme } from "../hooks/theme-context";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { theme } = useTheme();

  const themeClasses = {
    bg: theme === "dark" ? "bg-gray-900" : "bg-gray-50",
    text: theme === "dark" ? "text-gray-100" : "text-gray-900",
    card: theme === "dark" ? "bg-gray-800" : "bg-white",
    muted: theme === "dark" ? "text-gray-400" : "text-gray-600",
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={"/logo.png"} alt={"logo"} className={" h-10 w-10"} />
            <h1 className="text-xl font-bold">NationScope</h1>
          </div>
          <Link to="/auth/login">
            <Button type="primary">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
            alt="World map"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
          />
        </div>
        <div className="relative max-w-4xl text-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore the World with NationScope
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${themeClasses.muted}`}>
            Discover countries, compare statistics, and track your favorites
          </p>
          <Link to="/auth/login">
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              className="flex items-center mx-auto"
            >
              Explore Countries
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-xl ${themeClasses.card} shadow-lg`}>
            <GlobalOutlined className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Country Profiles</h3>
            <p className={themeClasses.muted}>
              Detailed information on demographics, economy, geography, and more
            </p>
          </div>

          <div className={`p-6 rounded-xl ${themeClasses.card} shadow-lg`}>
            <StarOutlined className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Favorites System</h3>
            <p className={themeClasses.muted}>
              Save and organize your favorite countries for quick access
            </p>
          </div>

          <div className={`p-6 rounded-xl ${themeClasses.card} shadow-lg`}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2094/2094170.png"
              className="w-10 h-10 mb-4"
              alt="Comparison"
            />
            <h3 className="text-xl font-semibold mb-2">Comparisons</h3>
            <p className={themeClasses.muted}>
              Compare multiple countries side-by-side
            </p>
          </div>
        </div>
      </section>

      {/* Country Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Countries
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "France",
                image:
                  "https://thevanmasters.com/wp-content/uploads/2019/10/Eiffel-tower.jpg",
                capital: "Paris",
                population: "67M",
              },
              {
                name: "Japan",
                image:
                  "https://th.bing.com/th/id/R.7114d4a3db977057b43c065568a741b3?rik=fRZP3kZrLdRNjg&pid=ImgRaw&r=0",
                capital: "Tokyo",
                population: "125M",
              },
              {
                name: "Brazil",
                image:
                  "https://cdn.pixabay.com/photo/2020/01/31/21/25/brazil-4809011_1280.jpg",
                capital: "Brasília",
                population: "213M",
              },
              {
                name: "Canada",
                image:
                  "https://wallpapers.com/images/hd/canadian-flag-landscape-407gr02rvne05cq9.jpg",
                capital: "Ottawa",
                population: "38M",
              },
            ].map((country) => (
              <div
                key={country.name}
                className={`rounded-xl overflow-hidden shadow-lg ${themeClasses.card}`}
              >
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{country.name}</h3>
                  <div className={`space-y-1 ${themeClasses.muted}`}>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 ${theme === "dark" ? "bg-gray-800" : "bg-blue-50"}`}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Global Journey Today
          </h2>
          <p className={`text-xl mb-8 ${themeClasses.muted}`}>
            Join thousands of users exploring the world with NationScope
          </p>
          <Link to="/auth/login">
            <Button type="primary" size="large">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={themeClasses.muted}>
            © 2025 NationScope. Ashan Tharindu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
