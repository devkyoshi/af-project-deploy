import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useTheme } from "../hooks/theme-context";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      style={{
        // Adjust the background color based on the active theme
        backgroundColor: theme === "dark" ? "#2d333b" : "#e8e8e8",
      }}
    />
  );
};
