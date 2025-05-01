import React from "react";
import { Layout, Menu, Dropdown } from "antd";

import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowDown,
  CreditCard,
  Globe,
  Globe2,
  LogOut,
  PieChart,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "../hooks/auth-context.jsx";

const { Sider } = Layout;

export const SideBar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  const menuItems = [
    {
      key: "/dashboard",
      icon: <Globe2 className="w-4 h-4 text-base" />,
      label: "All Countries",
      className: "mb-1",
    },
    {
      key: "/regions",
      icon: <Globe className="w-4 h-4 text-base" />,
      label: "Regions",
      className: "mb-1",
    },
  ];

  const userMenu = (
    <div className="w-48 rounded-lg shadow-sm border dark:border-white/10  ">
      <Menu className="!border-0">
        <Menu.Item
          key="profile"
          icon={<User className="w-4 h-4" />}
          className="!py-2 !h-auto"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key="settings"
          icon={<Settings className="w-4 h-4" />}
          className=" !py-2 !h-auto"
          onClick={() => navigate("/settings")}
        >
          Settings
        </Menu.Item>
        <Menu.Divider className="!my-2" />
        <Menu.Item
          key="logout"
          icon={<LogOut className="w-4 h-4" />}
          className=" !py-2 !h-auto text-red-600"
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <Sider
      width={240}
      theme="light"
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      className="h-screen fixed left-0 top-0 bottom-0 "
    >
      <div className="flex flex-col h-full">
        <div className="px-6 py-4 border-b dark:border-white/10 mb-5 flex flex-row items-center justify-center">
          <img
            src={"/logo.png"}
            alt="logo"
            className={`${collapsed ? "h-8 w-8" : "h-14 w-14"} transform translate-x-auto transition-opacity`}
          />
          {!collapsed && (
            <p
              className={
                "dark:text-white text-xl font-semibold tracking-tight text-gray-900 font-serif"
              }
            >
              Nation<span className={"font-mono"}>Scope</span>
            </p>
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="flex-1 bg-transparent px-4 [&_.ant-menu-submenu-arrow]:!hidden "
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          expandIcon={({ isSubMenuOpen }) => (
            <span
              className={`text-xs  transform transition-transform ${
                isSubMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <ArrowDown className="w-4 h-4" />
            </span>
          )}
        />

        {/* User Menu Section */}
        <div className="p-4 border-t dark:border-white/10">
          <Dropdown
            overlay={userMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-50/10 rounded-lg p-2 transition-colors">
              <img
                src={currentUser?.photoURL || "/user-avatar.jpg"}
                alt="user"
                className={"h-8 w-8 rounded-full"}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium dark:text-gray-50/80 truncate m-0">
                  {currentUser?.displayName}
                </p>
                <p className="text-xs dark:text-gray-50/50 truncate m-0">
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </Sider>
  );
};
