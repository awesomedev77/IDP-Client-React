import searchIcon from "../assets/icons/search.svg";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { Select } from "./Select";
import useDebounce from "../utils/debounce";
import { useState } from "react";

type HeaderProps = {
  query?: string;
  setQuery?: any;
};

export const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  const [search, setSearch] = useState(query ?? "");
  const handleSearch = useDebounce((term: string) => {
    setQuery(term);
  }, 1000);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex flex-row justify-between px-[30px]">
      <div className="flex flex-row gap-3 px-4 py-3 bg-[#F4F4F6] border-[1px] border-[#E8E9EE] rounded-l-full rounded-r-full w-[523px]">
        <img alt="" src={searchIcon} className="w-[22px] h-[22px]" />
        <input
          value={search}
          onChange={handleChange}
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
