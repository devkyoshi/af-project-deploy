import { Dropdown, Button } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { MenuIcon, SquareMenu } from "lucide-react";
import { ThemeToggle } from "./theme-toggler.jsx";
import { Menu } from "antd";
import { useAuth } from "../hooks/auth-context.jsx";
import { useTheme } from "../hooks/theme-context.jsx";

export const Navbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const { theme } = useTheme();

  const userMenu = (
    <div className="w-48  rounded-lg shadow-lg border dark:border-white/10  ">
      <Menu className="!border-0">
        <Menu.Item
          key="profile"
          icon={<UserOutlined className="text-slate-600" />}
          className=" !py-2 !h-auto"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>

        <Menu.Item
          key="theme"
          icon={<SettingOutlined className="text-slate-600" />}
          className=" !py-2 !h-auto "
        >
          <div className={"flex items-center gap-2 justify-between"}>
            <p>Theme</p>
            <ThemeToggle />
          </div>
        </Menu.Item>
        <Menu.Divider className="!my-2" />
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined className="text-slate-600" />}
          className=" !py-2 !h-auto text-red-600"
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <div
      className={`h-16 border-b dark:border-white/10 flex items-center justify-between px-4  ${theme === "dark" ? "bg-white/8" : "bg-white"}`}
    >
      <Button
        type="text"
        icon={
          collapsed ? (
            <MenuIcon className={"w-4 h-4"} />
          ) : (
            <SquareMenu className={"w-4 h-4"} />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center text-slate-600"
      />

      <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomRight">
        <img
          alt={"user-menu"}
          src={currentUser?.photoURL || "/user-avatar.jpg"}
          className={"w-8 h-8 rounded-full cursor-pointer"}
        />
      </Dropdown>
    </div>
  );
};
