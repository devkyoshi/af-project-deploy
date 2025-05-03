import React, { useState } from "react";
import { Layout, Menu, Dropdown, Drawer, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  ArrowDown,
  CreditCard,
  Globe,
  Globe2,
  LogOut,
  Settings,
  User,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/auth-context.jsx";
import { useWindowSize } from "../hooks/use-window.jsx";

const { Sider } = Layout;

export const SideBar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 768;

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
    {
      key: "/currency",
      icon: <CreditCard className="w-4 h-4 text-base" />,
      label: "Currency",
      className: "mb-1",
    },
  ];

  const userMenu = (
    <div className="w-48 rounded-lg shadow-sm border dark:border-white/10">
      <Menu className="!border-0">
        <Menu.Item
          key="profile"
          icon={<User className="w-4 h-4" />}
          className="!py-2 !h-auto"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Menu.Item>

        <Menu.Divider className="!my-2" />
        <Menu.Item
          data-testid="logout-btn"
          id="logout-menu-item"
          key="logout"
          icon={<LogOut className="w-4 h-4" />}
          className="!py-2 !h-auto text-red-600"
          onClick={() => logout()}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );

  const MobileMenu = () => (
    <Drawer
      placement="left"
      open={mobileMenuVisible}
      onClose={() => setMobileMenuVisible(false)}
      closable={false}
      width={240}
      bodyStyle={{ padding: 0 }}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b dark:border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={"/logo.png"} alt="logo" className="h-8 w-8" />
            <p className="dark:text-white text-xl font-semibold tracking-tight text-gray-900 font-serif">
              Nation<span className="font-mono">Scope</span>
            </p>
          </div>
          <Button
            type="text"
            icon={<X className="w-5 h-5" />}
            onClick={() => setMobileMenuVisible(false)}
          />
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          className="flex-1 bg-transparent px-4"
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
            setMobileMenuVisible(false);
          }}
        />

        <div className="p-4 border-t dark:border-white/10">
          <Dropdown overlay={userMenu} trigger={["click"]} placement="topRight">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-50/10 rounded-lg p-2 transition-colors">
              <img
                src={currentUser?.photoURL || "/user-avatar.jpg"}
                alt="user"
                className="h-8 w-8 rounded-full"
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
    </Drawer>
  );

  return (
    <>
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm h-14 flex items-center px-4">
          <Button
            type="text"
            icon={<MenuIcon className="w-6 h-6" />}
            onClick={() => setMobileMenuVisible(true)}
          />
          <img src="/logo.png" alt="logo" className="h-8 w-8 ml-4" />
        </div>
      )}

      {!isMobile && (
        <Sider
          width={240}
          theme="light"
          collapsed={collapsed}
          onCollapse={onCollapse}
          breakpoint="md"
          collapsedWidth={0}
          className="h-screen fixed left-0 top-0 bottom-0 z-50 shadow-lg"
        >
          <div className="flex flex-col h-full">
            <div className="px-6 py-4 border-b dark:border-white/10 mb-5 flex flex-row items-center justify-center">
              <img
                src="/logo.png"
                alt="logo"
                className={`${collapsed ? "h-8 w-8" : "h-14 w-14"} transition-all duration-300`}
              />
              {!collapsed && (
                <p className="dark:text-white text-xl font-semibold tracking-tight text-gray-900 font-serif ml-3">
                  Nation<span className="font-mono">Scope</span>
                </p>
              )}
            </div>

            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              className="flex-1 bg-transparent px-4 [&_.ant-menu-submenu-arrow]:!hidden"
              items={menuItems}
              onClick={({ key }) => navigate(key)}
              expandIcon={({ isSubMenuOpen }) => (
                <span
                  className={`text-xs transform transition-transform ${
                    isSubMenuOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                </span>
              )}
            />

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
                    className="h-8 w-8 rounded-full"
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
      )}

      <MobileMenu />
    </>
  );
};
