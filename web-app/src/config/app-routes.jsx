import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../components/protected-routes.jsx";
import { DashboardPage } from "../pages/dashboard-main.jsx";
import { HomePage } from "../pages/home-page.jsx";
import { DashboardLayout } from "./dashboard-layout.jsx";
import { CountryProvider } from "../hooks/country-context.jsx";
import { CountryPage } from "../pages/country-page.jsx";
import LoginPage from "../pages/auth-page.jsx";
import { AuthProvider } from "../hooks/auth-context.jsx";
import { RegionsPage } from "../pages/regions-page.jsx";
import { FavoritesProvider } from "../hooks/favourites-context.jsx";
import { UserProfilePage } from "../pages/user-profile-page.jsx";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CountryProvider>
          <FavoritesProvider>
            <AppRouteContent />
          </FavoritesProvider>
        </CountryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

const AppRouteContent = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard index route */}
          <Route index path="/dashboard" element={<DashboardPage />} />
          <Route path="countries/:name" element={<CountryPage />} />
          <Route path={"/regions"} element={<RegionsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
