import { AppRoutes } from "./config/app-routes.jsx";
import { CustomThemeProvider } from "./contexts/theme-context.jsx";
import { StyleProvider } from "antd-style";

export default function App() {
  return (
    <>
      <StyleProvider hashPriority="high">
        <CustomThemeProvider>
          <AppRoutes />
        </CustomThemeProvider>
      </StyleProvider>
    </>
  );
}
