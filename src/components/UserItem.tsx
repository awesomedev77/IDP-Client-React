import React, { useState } from "react";
import { User } from "../utils/interface";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

type Props = {
  no: number;
  user: User;
  refreshPage: any;
};

export const UserItem: React.FC<Props> = ({ no, user, refreshPage }) => {
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
        {user.fullName}
      </th>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
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
      <EditUserModal
        user={user}
        key={Math.random()}
        show={showModal}
        onClose={handleClose}
        refreshPage={refreshPage}
      />
      <DeleteUserModal
        user={user}
        key={Math.random()}
        show={showDeleteModal}
        onClose={handleDeleteClose}
        refreshPage={refreshPage}
      />
    </tr>
  );
};
