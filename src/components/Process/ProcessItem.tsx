import React from "react";
import { format, parseISO } from "date-fns";
import { Process } from "../../utils/interface";
import interactIcon from "../../assets/images/interacticon.png";
import viewIcon from "../../assets/images/viewicon.png";
import { useNavigate } from "react-router-dom";

type Props = {
  no: number;
  process: Process;
};

export const ProcessItem: React.FC<Props> = ({ no, process }) => {
  const status = process.documents.every((doc) => doc.status === "Y");
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const handleClose = () => {
  //   setShowModal(false);
  // };
  // const handleDeleteClose = () => {
  //   setShowDeleteModal(false);
  // };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{no}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {process.processName}
      </td>
      <td className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row">
        <span className="max-w-[450px] truncate leading-[39px]">
          {process.processDescription}
        </span>
      </td>
      <td>
        <div
          className={`border-[1px] px-4 py-2 rounded-xl my-auto ml-6 max-w-[150px] 
        ${
          process.documents.length === 0
            ? "bg-[#F7F8F9] border-[#E0E2E9]"
            : status
            ? "bg-[#FFF1E8] border-[#EB744166]"
            : "bg-[#E7F0FF] border-[#4182EB66]"
        }`}
        >
          <p
            className={`text-[14px] font-semibold leading-normal text-nowrap text-center 
          ${
            process.documents.length === 0
              ? "text-[#656F93]"
              : status
              ? "text-[#EB7441]"
              : "text-[#4182EB]"
          }`}
          >
            {process.documents.length === 0
              ? "No Documents"
              : status
              ? "Processed"
              : "Uploaded"}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {format(parseISO(process.createdAt), "dd MMM, yyyy, hh:mm aaa")}
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex gap-3">
          <img
            onClick={() => {
              navigate(`/?process=${process.id}`);
            }}
            alt="itemimage"
            src={viewIcon}
            className="w-9 h-9 my-auto"
          />
          <img
            onClick={() => {
              navigate(`/details/${process.id}`);
            }}
            alt="itemimage"
            src={interactIcon}
            className="w-9 h-9 my-auto"
          />
        </div>
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
