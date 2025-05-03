import { useAuth } from "../contexts/auth-context.jsx";
import { Card, Empty, Button, Divider } from "antd";
import {
  UserOutlined,
  SafetyOutlined,
  GlobalOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTheme } from "../contexts/theme-context.jsx";
import { format } from "date-fns";
import { useFavorites } from "../contexts/favourites-context.jsx";

export const UserProfilePage = () => {
  const { currentUser } = useAuth();
  const { favorites, loading: favLoading, removeFavorite } = useFavorites();
  const { theme } = useTheme();

  const themeClasses = {
    container: theme === "dark" ? "bg-white/10 text-gray-100 " : "bg-gray-50",
    card:
      theme === "dark"
        ? "bg-gray-800 border-gray-700 border shadow-sm border-white/10"
        : "bg-white border-gray-200",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
    hover: theme === "dark" ? "hover:bg-white/5" : "hover:bg-gray-50",
  };

  if (!currentUser)
    return (
      <div className="text-center py-12 text-lg text-red-500">
        Please log in to view your profile
      </div>
    );

  return (
    <div className={`min-h-screen p-6 ${themeClasses.container}`}>
      <div className=" mx-auto  space-y-8  flex flex-col gap-2">
        {/* User Details Section */}
        <Card className={`shadow-sm ${themeClasses.card}`}>
          <div className="flex flex-col items-center text-center mb-6">
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-blue-200/50"
            />
            <h1 className="text-2xl font-semibold mb-2">
              {currentUser.displayName || "Anonymous User"}
            </h1>
            <p className={`text-lg ${themeClasses.textMuted}`}>
              {currentUser.email}
            </p>
          </div>

          <Divider orientation="left" className="text-gray-400">
            Account Details
          </Divider>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-lg">
              <SafetyOutlined className={`text-xl ${themeClasses.textMuted}`} />
              <div>
                <p className="font-medium">Email Verification</p>
                <p className={themeClasses.textMuted}>
                  {currentUser.emailVerified
                    ? "Verified (✓)"
                    : "Not Verified (✕)"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <GlobalOutlined className={`text-xl ${themeClasses.textMuted}`} />
              <div>
                <p className="font-medium">Last Signed In</p>
                <p className={themeClasses.textMuted}>
                  {format(
                    new Date(currentUser.metadata.lastSignInTime),
                    "MMM dd, yyyy - hh:mm a",
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-lg">
              <UserOutlined className={`text-xl ${themeClasses.textMuted}`} />
              <div>
                <p className="font-medium">Account Created</p>
                <p className={themeClasses.textMuted}>
                  {format(
                    new Date(currentUser.metadata.creationTime),
                    "MMM dd, yyyy",
                  )}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Favorites Section */}
        <Card
          className={`shadow-sm ${themeClasses.card}`}
          title={
            <div className="flex items-center gap-2">
              <span className="text-red-500">❤</span>
              <span>Favorite Countries</span>
              <span className={`text-sm ${themeClasses.textMuted}`}>
                ({favorites.length} saved)
              </span>
            </div>
          }
          loading={favLoading}
        >
          {favorites.length === 0 ? (
            <Empty
              description={
                <span className={themeClasses.textMuted}>
                  No favorite countries saved yet
                </span>
              }
            />
          ) : (
            <div className="space-y-2">
              {favorites.map((country) => (
                <div
                  key={country.name}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${themeClasses.hover}`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={country.flag}
                      alt="Flag"
                      className="w-12 h-8 object-cover rounded shadow-sm border"
                    />
                    <div>
                      <h3 className="font-medium">{country.name}</h3>
                      <p className={`text-sm ${themeClasses.textMuted}`}>
                        {country.capital} • Pop:{" "}
                        {country.population.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      removeFavorite({
                        name: {
                          common: country.name,
                        },
                        capital: [country.capital],
                        population: country.population,
                        flags: country.flag,
                      })
                    }
                    className="hover:bg-red-100/50 dark:hover:bg-red-900/30"
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
