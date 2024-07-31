import React, { useState, useRef, useEffect } from "react";
import vectorIcon from "../../assets/icons/vector.svg";

type processOptions = { name: string; value: string };

type props = {
  options: processOptions[];
  onClick?: () => void;
  placeHolder: string;
  onHandleOptionChange: (selectedOption: string) => void;
};

export const SelectButton: React.FC<props> = ({
  options,
  placeHolder,
  onHandleOptionChange,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [process, setProcess] = useState("");
  const optionRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
      setShowOptions(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  return (
    <div ref={optionRef} className="">
      <div className="flex items-center bg-gray-100 border border-gray-200 rounded-3xl h-9 py-1 px-3">
        <input
          className=" w-[93%] bg-gray-100 outline-none"
          placeholder= {placeHolder}
          onMouseDown={() => {
            setShowOptions(true);
            document.addEventListener("mousedown", handleClickOutside);
          }}
          value={process}
          onChange={(e) => setProcess(e.target.value)}
        />
        <img src={vectorIcon} alt="vectorIcon" className="h-[40%]" />
      </div>
      {showOptions === true && (
        <div className="shadow-lg rounded-lg mt-1 border border-gray-200 py-1 px-3">
          {options.map(
            (option, index) =>
              option.name.toLowerCase().includes(process.toLowerCase()) && (
                <p
                  className={`border border-white text-[19px] hover:bg-gray-100 cursor-pointer
                    ${index === options.length-1 ? "border-b-0": "border-b-gray-300"}
                    `}
                  key={option.value}
                  onClick={(e) => {
                    setProcess(option.name);
                    setShowOptions(false);
                    onHandleOptionChange(option.value);
                    document.removeEventListener(
                      "mousedown",
                      handleClickOutside
                    );
                  }}
                >
                  {option.name}
                </p>
              )
          )}
        </div>
      )}
    </div>
  );
};
