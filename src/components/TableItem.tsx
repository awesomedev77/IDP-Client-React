import React from "react";
import { format, parseISO } from "date-fns";
import { DocumentProps } from "../utils/interface";
import { extractFileName } from "../utils/Operations";
import interactIcon from "../assets/images/interacticon.png";

type Props = {
  no: number;
  document: DocumentProps;
};

export const TableItem: React.FC<Props> = ({ no, document }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{no}</td>
      <td className="px-6 py-4 flex font-[15px] text-[#161719]  dark:text-white">
        <span className="max-w-[200px] leading-[39px] truncate">
          {extractFileName(document.path)}
        </span>
      </td>
      <td className="px-6 py-4 font-[15px] text-[#161719] whitespace-nowrap dark:text-white">
        {document.process.processName}
      </td>
      <td className=" px-6 py-4 font-[15px] text-[#161719] whitespace-nowrap dark:text-white">
        <span>{document.documentTypes[0]?.type?.typeName}</span>
      </td>
      <td className="px-6 py-4 font-[15px] text-[#161719] whitespace-nowrap dark:text-white">
        <div
          className={`border-[1px] px-4 py-2 rounded-xl my-auto w-[108px] 
        ${
          document.status === "N"
            ? "bg-[#F7F8F9] border-[#E0E2E9]"
            : document.status === "Y"
            ? "bg-[#FFF1E8] border-[#EB744166]"
            : "bg-[#E7F0FF] border-[#4182EB66]"
        }`}
        >
          <p
            className={`text-[14px] font-semibold leading-normal text-center 
          ${
            document.status === "N"
              ? "text-[#656F93]"
              : document.status === "Y"
              ? "text-[#EB7441]"
              : "text-[#4182EB]"
          }`}
          >
            {document.status === "N"
              ? "Not Processed"
              : document.status === "Y"
              ? "Processed"
              : "Processing"}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 font-[15px] text-[#161719] whitespace-nowrap dark:text-white">
        {format(parseISO(document.createdAt), "dd MMM, yyyy, hh:mm aaa")}
      </td>
      <td className="px-6 py-4 text-right">
        <span
          onClick={() => {
            alert("Interact");
          }}
          className=""
        >
          <img alt="itemimage" src={interactIcon} className="w-9 h-9 my-auto" />
        </span>
      </td>
      {/* <EditProcessModal
        process={process}
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
        refreshPage={refreshPage}
      />
      <DeleteProcessModal
        process={process}
        key={Math.random()}
        show={showDeleteModal}
        onClose={handleDeleteClose}
        refreshPage={refreshPage}
      /> */}
    </tr>
  );
};
