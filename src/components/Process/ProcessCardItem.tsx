import React from "react";

import calendar from "../../assets/images/calendar.png";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Process } from "../../utils/interface";
interface ItemProps {
  item: Process;
}

const ProcessCardItem: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const status = item.documents.every((doc) => doc.status === "Y");

  return (
    <div className="bg-white shadow-md rounded-xl p-[18px] flex flex-col gap-6">
      <div className="flex flex-row gap-[18px]">
        <img
          alt="itemimage"
          src={`https://ui-avatars.com/api/?length=3&rounded=false&bold=true&name=IDP`}
          className="w-[68px] h-[68px] my-auto"
        />
        <div className="flex flex-grow overflow-hidden flex-col gap-1 my-auto">
          <p className="text-[18px] font-semibold leading-normal ">
            {item.processName}
          </p>
          <p className="text-[16px] font-semibold leading-normal truncate text-[#656F93]">
            {item.processDescription}
          </p>
        </div>
        <div
          className={`border-[1px] p-4 rounded-xl my-auto w-[108px] 
        ${
          item.documents.length === 0
            ? "bg-[#F7F8F9] border-[#E0E2E9]"
            : status
            ? "bg-[#FFF1E8] border-[#EB744166]"
            : "bg-[#E7F0FF] border-[#4182EB66]"
        }`}
        >
          <p
            className={`text-[14px] font-semibold leading-normal text-center 
          ${
            item.documents.length === 0
              ? "text-[#656F93]"
              : status
              ? "text-[#EB7441]"
              : "text-[#4182EB]"
          }`}
          >
            {item.documents.length === 0
              ? "No Documents"
              : status
              ? "Documents Processed"
              : "Documents Uploaded"}
          </p>
        </div>
      </div>

      <hr className="border-dashed border-[#D4D7E1]" />
      <div className="flex flex-col gap-7 pt-[-4px]">
        <div className="grid grid-cols-2">
          {/* <div className='flex flex-row gap-3'>
            <img alt='itemimage' src={loan} className='w-12 h-12 my-auto' />
            <div className='flex flex-col gap-1 my-auto'>
              <p className='text-[14px] font-semibold text-[#656F93] leading-normal'>Loan Amount</p>
              <p className='text-[16px] font-semibold text-[#161719] leading-normal'>{item.currency} {new Intl.NumberFormat('en-US').format(item?.loanAmount)}</p>
            </div>
          </div> */}
          <div className="flex flex-row gap-3">
            <img alt="itemimage" src={calendar} className="w-12 h-12 my-auto" />
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                Date and Time
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                {format(parseISO(item.createdAt), "dd MMM, yyyy, hh:mm aaa")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <img
            alt="itemimage"
            src={`https://ui-avatars.com/api/?length=2&rounded=true&bold=true&name=${item.creator.fullName}`}
            className="w-12 h-12"
          />
          <div className="flex flex-col gap-1 my-auto">
            <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
              Created By
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                {item.creator.role}
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                |
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal">
                {item.creator.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <button
          disabled={item.documents.length === 0}
          className="bg-blue-500 flex-grow disabled:bg-gray-400 text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          View All
        </button>
        <button
          disabled={item.documents.length === 0}
          className="bg-blue-500 flex-grow disabled:bg-gray-400 text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          Interact
        </button>
      </div>
    </div>
  );
};

export default ProcessCardItem;
