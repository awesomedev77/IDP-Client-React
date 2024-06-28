import React, { useState, useRef } from "react";
import searchIcon from "../../assets/icons/search.svg";

type typeOptions = { name: string; value: string };

type props = {
  options: typeOptions[];
  onClick?: () => void;
  onDocumentTypeChange: (selectedOptions: string[], fileIndex: number) => void;
  fileIndex: number;
};

export const SearchSelectButton: React.FC<props> = ({
  options,
  onDocumentTypeChange,
  fileIndex,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState("");
  const optionRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setShowOptions(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const onOptionClick = (option: typeOptions) => {
    setType(option.name);
    setShowOptions(false);
    document.removeEventListener("mousedown", handleClickOutside);
    if (types.find((type) => type === option.value) === undefined) {
      setTypes([...types, option.value]);
      onDocumentTypeChange([...types, option.value], fileIndex);
    }
  };

  const onOptionBadgeClick = (option: typeOptions) => {
    if (types.find((type) => type === option.value) === undefined) {
      setTypes([...types, option.value]);
    } else {
      const updatedTypes = types.filter((type) => type !== option.value);
      setTypes(updatedTypes);
    }
    onDocumentTypeChange([...types, option.value], fileIndex);
  };

  return (
    <div ref={optionRef} className="w-[40%] relative">
      <div className="flex flex-cols bg-gray-100 rounded-3xl border border-gray-300 h-[35px] py-2 px-3">
        <img src={searchIcon} alt="searchIcon" />
        <input
          className="bg-gray-100 outline-none w-full ml-2"
          placeholder="Search/Select document type(s)"
          onMouseDown={() => {
            setShowOptions(true);
            document.addEventListener("mousedown", handleClickOutside);
          }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
      </div>
      {showOptions === true && (
        <div className="shadow-lg rounded-lg mt-1 border border-gray-200 py-1 px-3 absolute bg-white w-full z-[10]">
          {options.map(
            (option, index) =>
              option.name.toLowerCase().includes(type.toLowerCase()) && (
                <p
                  className="border border-white border-b-gray-300 text-[19px] hover:bg-gray-100 cursor-pointer"
                  key={option.value}
                  onClick={(event) => onOptionClick(option)}
                >
                  {option.name}
                </p>
              )
          )}
        </div>
      )}
      <div className="flex mt-2 flex-wrap gap-2">
        {options.map((option) =>
          types.find((type) => type === option.value) === undefined ? (
            <div
              key={option.value}
              className="border border-blue-400 rounded-2xl cursor-pointer px-3 text-blue-400 hover:bg-blue-600 hover:text-white"
              onClick={() => onOptionBadgeClick(option)}
            >
              #{option.name}
            </div>
          ) : (
            <div
              key={option.value}
              className="border border-blue-200 rounded-2xl cursor-pointer px-3 text-blue-400 bg-blue-600 text-white"
              onClick={() => onOptionBadgeClick(option)}
            >
              #{option.name}
            </div>
          )
        )}
      </div>
    </div>
  );
};
