
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { Select } from "./Select";

import { useState } from "react";


export const Header: React.FC = () => {

  return (
    <div className="flex flex-row justify-between items-center px-[30px]">
      <div className="text-[24px] font-bold"> Intelligent Document Processing</div>
      <div className="flex flex-row gap-[18px]">
        <Select />
        <Notification />
        <Profile />
      </div>
    </div>
  );
};
