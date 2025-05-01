import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { SideBar } from "../components/side-bar";
import { useState } from "react";
import { Navbar } from "../components/nav-bar.jsx";

const { Content } = Layout;

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider className="h-screen">
      <SideBar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="flex flex-col">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Content area with scrollable container */}
        <Content
          className={`scrollbar-hidden `}
          style={{
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          <div className="h-full min-h-0 ">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

/*
*
* ${
            theme === "dark" ? "bg-white/10" : "bg-white"
          }
* */
