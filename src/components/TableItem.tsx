import React from "react";
import { format, parseISO } from "date-fns";
import { DocumentProps } from "../utils/interface";
import { extractFileName } from "../utils/Operations";

type Props = {
  no: number;
  document: DocumentProps;
};

export const TableItem: React.FC<Props> = ({ no, document }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{no}</td>
      <td className="px-6 py-4 flex font-medium text-gray-900  dark:text-white">
        <span className="max-w-[200px] truncate">
          {extractFileName(document.path)}
        </span>
      </td>
      <td className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span>{document.documentType.typeName}</span>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {document.process.processName}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {document.status === "Y"
          ? "Processed"
          : document.status === "N"
          ? "Not Processed"
          : "Processing"}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {`${document.creator.fullName}(${document.creator.role})`}
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {format(parseISO(document.createdAt), "dd MMM, yyyy, hh:mm aaa")}
      </td>
      <td className="px-6 py-4 text-right">
        <span
          onClick={() => {
            alert("Interact");
          }}
          className="font-small ml-4 text-md text-blue-600 dark:text-blue-500 hover:underline"
        >
          Interact
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
