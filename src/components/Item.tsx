import React, { useState } from "react";

import loan from "../assets/images/loan.png";
import calendar from "../assets/images/calendar.png";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { DocumentProps } from "../utils/interface";
import { useAuthStore } from "../store/authStore";
import { extractFileName } from "../utils/Operations";
interface ItemProps {
  item: DocumentProps;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-[18px] flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[18px]">
          <img
            alt="itemimage"
            src={`https://ui-avatars.com/api/?length=3&rounded=false&bold=true&name=IDP`}
            className="w-[68px] h-[68px] my-auto"
          />
          <div className="flex flex-col gap-1 my-auto">
            <p className="text-[18px] font-semibold leading-normal ">
              {extractFileName(item.path)}
            </p>
            <p className="text-[16px] font-semibold leading-normal text-[#656F93]">
              {item.documentType.typeName}
            </p>
          </div>
        </div>
        <div
          className={`border-[1px] p-4 rounded-xl my-auto w-[108px] 
        ${
          item.status === "N"
            ? "bg-[#F7F8F9] border-[#E0E2E9]"
            : item.status === "Y"
            ? "bg-[#FFF1E8] border-[#EB744166]"
            : "bg-[#E7F0FF] border-[#4182EB66]"
        }`}
        >
          <p
            className={`text-[14px] font-semibold leading-normal text-center 
          ${
            item.status === "N"
              ? "text-[#656F93]"
              : item.status === "Y"
              ? "text-[#EB7441]"
              : "text-[#4182EB]"
          }`}
          >
            {item.status === "N"
              ? "Document Not Processed"
              : item.status === "Y"
              ? "Document Processed"
              : "Document Processing"}
          </p>
        </div>
      </div>
      <hr className="border-dashed border-[#D4D7E1]" />
      <div className="flex flex-col gap-7 pt-[-4px]">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-row gap-3">
            <img alt="itemimage" src={loan} className="w-12 h-12 my-auto" />
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                {item.process.processName}
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal overflow-hidden line-clamp-1 break-all">
                {item.process.processDescription}
              </p>
            </div>
          </div>
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
              Applied By
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
      <div className="flex">
        <button
          className="bg-blue-500 flex-grow text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          Interact With Application Document
        </button>
      </div>
    </div>
  );
};

export default Item;
