// src/components/Sidebar.tsx
import React from "react";
import logo from "../assets/images/logo.png";
import { SidebarItem } from "./Sidebar/item";
import dashboardIcon from "../assets/icons/dashboard.svg";
import analysisIcon from "../assets/icons/analysis.svg";
import transactionIcon from "../assets/icons/transactions.svg";
import { useAuthStore } from "../store/authStore";

const Sidebar: React.FC = () => {
  const { logout, user } = useAuthStore();
  return (
    <div className="h-full w-[265px] bg-[#151719] shadow-md px-[15px]">
      <div className="flex flex-row justify-center">
        <div className="pt-8 pb-6 flex flex-row gap-3 mx-auto">
          <img src={logo} alt="" className="w-[46px] h-[46px]" />
          <h1 className="text-xl font-bold text-white my-auto">LoanEazy</h1>
        </div>
      </div>
      <hr className="border-[#4E525A] opacity-20 pb-7" />
      <div className="flex flex-col gap-4">
        <SidebarItem name="Dashboard" link="/" icon={dashboardIcon} />
        {user?.role.toLowerCase() === "admin" && (
          <SidebarItem name="Admin" link="/admin" icon={dashboardIcon} />
        )}
        <SidebarItem name="Analysis" link="/" icon={analysisIcon} />
        <SidebarItem name="Transactions" link="/" icon={transactionIcon} />
        <div
          onClick={logout}
          className="flex items-center px-4 py-3 text-base font-normal text-gray-100 rounded-lg hover:bg-blue-500"
        >
          <span className="flex-1 whitespace-nowrap">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
