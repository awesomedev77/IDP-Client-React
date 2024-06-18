import searchIcon from "../assets/icons/search.svg";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { Select } from "./Select";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between px-[30px]">
      <div className="flex flex-row gap-3 px-4 py-3 bg-[#F4F4F6] border-[1px] border-[#E8E9EE] rounded-l-full rounded-r-full w-[523px]">
        <img alt="" src={searchIcon} className="w-[22px] h-[22px]" />
        <input
          placeholder="Search..."
          className="bg-transparent text-[#656F93] placeholder:text-[#656F93] text-[18px] grow py-0 outline-none leading-[13px]"
        />
      </div>
      <div className="flex flex-row gap-[18px]">
        <Select />
        <Notification />
        <Profile />
      </div>
    </div>
  );
};
