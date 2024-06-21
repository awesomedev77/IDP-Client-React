import React from "react";
import { format, parseISO } from "date-fns";
import { Process } from "../../utils/interface";

type Props = {
  no: number;
  process: Process;
};

export const ProcessItem: React.FC<Props> = ({ no, process }) => {
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
      <td
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {process.processName}
      </td>
      <td
        className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row"
      >
        <span className="max-w-[150px] truncate">
        {process.processDescription}
        </span>
      </td>
      <td
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {process.creator.fullName}
      </td>
      <td
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {format(parseISO(process.createdAt), "dd MMM, yyyy, hh:mm aaa")}
      </td>
      <td className="px-6 py-4 text-right">
        <span
          onClick={() => {
            alert("View all");
          }}
          className="font-small text-md mr-5 text-blue-600 dark:text-blue-500 hover:underline"
        >
          View All
        </span>
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
