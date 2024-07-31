// src/components/Sidebar.tsx
import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { SidebarItem } from "./Sidebar/item";
import dashboardIcon from "../assets/icons/dashboard.svg";
import analysisIcon from "../assets/icons/analysis.svg";
import transactionIcon from "../assets/icons/transactions.svg";
import settingIcon from "../assets/icons/setting.svg";
import processesIcon from "../assets/icons/processes.svg";
import { useAuthStore } from "../store/authStore";
import { ArrowDownIcon } from "./icons/arrowdown";
import { ArrowUpIcon } from "./icons/arrowup";
import { DownIcon } from "./icons/down";
import { UpIcon } from "./icons/up";

const Sidebar: React.FC = () => {
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const loadFromLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const { logout, user } = useAuthStore();
  const [settingsExpanded, setSettingsExpanded] = useState(() =>
    loadFromLocalStorage("settingsExpanded")
  );

  useEffect(() => {
    saveToLocalStorage("settingsExpanded", settingsExpanded);
  }, [settingsExpanded]);

  return (
    <div className="h-full min-w-[225px] max-w-[225px] bg-[#151719] shadow-md px-[15px]">
      <div className="flex flex-row justify-center">
        <div className="pt-8 pb-6 flex flex-row gap-3 mx-auto">
          <img src={logo} alt="" className="w-[46px] h-[46px]" />
          <h1 className="text-xl font-bold text-white my-auto">IDP</h1>
        </div>
      </div>
      <hr className="border-[#4E525A] opacity-20 pb-7" />
      <div className="flex flex-col gap-4">
        <SidebarItem name="Dashboard" link="/" icon={dashboardIcon} />
        {user?.role.toLowerCase() === "admin" && (
          <>
            <SidebarItem name="Admin" link="/admin" icon={dashboardIcon} />
            {/* <SidebarItem name="Process" link="/process" icon={analysisIcon} /> */}
            <SidebarItem name="Processes" link="/processes" icon={processesIcon} />
            <div>
              <div
                onClick={() => setSettingsExpanded(!settingsExpanded)}
                className="flex items-center text-base justify-between pr-4 font-normal text-gray-100 rounded-lg hover:bg-blue-500 cursor-pointer"
              >
                <SidebarItem name={"Setting"} link="" icon={settingIcon} />
                <span>
                  {settingsExpanded ? <DownIcon/> : <UpIcon/>}
                </span>
                {" "}
              </div>
              {settingsExpanded && (
                <div className="pl-4">
                  <SidebarItem
                    name="Process Types"
                    link="/process"
                    icon={transactionIcon}
                  />
                  <SidebarItem
                    name="File Types"
                    link="/type"
                    icon={analysisIcon}
                  />
                </div>
              )}
            </div>
          </>
        )}
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
