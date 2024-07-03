import React, { useState } from "react";

import loan from "../assets/images/loan.png";
import calendar from "../assets/images/calendar.png";
import documentType from "../assets/images/type.png";
import processImage from "../assets/images/process.png";
import documentImage from "../assets/images/document.png";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { DocumentProps } from "../utils/interface";
import { extractFileName } from "../utils/Operations";
import ViewDocumentModal from "../components/ViewDocumentModal"
interface ItemProps {
  item: DocumentProps;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const [viewDocumentModal, setViewDocumentModal] = useState(false);

  const handleViewDocumentClose = () => {
    setViewDocumentModal(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-[18px] flex flex-col gap-6">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-[18px]">
          <img
            alt="itemimage"
            src={documentImage}
            className="w-12 h-12 my-auto"
          />
          <div className="flex flex-col my-auto justify-center">
            <p className="text-[18px] font-semibold leading-normal text-[#656F93] ">
              Document Name
            </p>
            <p className="text-[16px] font-semibold leading-normal">
              {extractFileName(item.path)}
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
            <img
              alt="itemimage"
              src={processImage}
              className="w-12 h-12 my-auto"
            />
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                Process Type
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal overflow-hidden line-clamp-1 break-all">
                {item.process.processName}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <img
              alt="itemimage"
              src={documentType}
              className="w-12 h-12 my-auto"
            />
            <div className="flex flex-col gap-1 my-auto">
              <p className="text-[14px] font-semibold text-[#656F93] leading-normal">
                Document Type
              </p>
              <p className="text-[16px] font-semibold text-[#161719] leading-normal overflow-hidden line-clamp-1 break-all">
                {item.documentTypes[0]?.type?.typeName}
              </p>
            </div>
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
      <div className="flex">
      <button
          className="bg-blue-500 flex-grow text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]"
          onClick={() => {
                setViewDocumentModal(true);}}
        >
          View Document
        </button>
        <button
          className="bg-blue-500 flex-grow text-white py-[16px] rounded-full text-[18px] font-bold leading-[13px]"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          Interact With Application Document
        </button>
      </div>
      <ViewDocumentModal key={Math.random()} show={viewDocumentModal} onClose={handleViewDocumentClose} />
    </div>
  );
};

export default Item;
