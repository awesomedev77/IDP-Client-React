import React, { useState } from "react";
import { Type } from "../utils/interface";
import EditTypeModal from "./EditTypeModal";
import DeleteTypeModal from "./DeleteTypeModal";

type Props = {
  no: number;
  type: Type;
  refreshPage: any;
};

export const TypeItem: React.FC<Props> = ({ no, type, refreshPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{no}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {type.typeName}
      </th>
      <td className="px-6 py-4 text-right">
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className="font-small text-md text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </span>
        <span
          onClick={() => {
            setShowDeleteModal(true);
          }}
          className="font-small ml-4 text-md text-blue-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </span>
      </td>
      <EditTypeModal
        type={type}
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
        refreshPage={refreshPage}
      />
      <DeleteTypeModal
        type={type}
        key={Math.random()}
        show={showDeleteModal}
        onClose={handleDeleteClose}
        refreshPage={refreshPage}
      />
    </tr>
  );
};
