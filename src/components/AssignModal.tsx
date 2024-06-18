import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png'
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import { ApplicationProps, User } from '../utils/interface';
import { isNotEmpty } from '../utils/validators';

type ModalFormProps = {
  show: boolean;
  onClose: () => void;
  item: ApplicationProps;
  setItems: any;
};



const AssignModal: React.FC<ModalFormProps> = ({ show, onClose, item, setItems }) => {

  const { user } = useAuthStore();
  const [error, setError] = useState("");
  const [assign, setAssign] = useState("")
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (item.assignee) {
      setAssign(item.assignee.id);
    }
    api.get("/auth/users")
      .then((res) => {
        setUsers(res.data);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  const validateForm = () => {
    let valid = true;

    if (assign === '') {
      setError('Please select one');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await api.post(`/applications/assign/${item.id}`, { assign });
      setItems((prev: ApplicationProps[]) => {
        return prev.map((each) => {
          if (each.id !== item.id)
            return each;
          return {
            ...each,
            assignee: result.data
          }
        })
      })
      onClose();
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error('Failed to create application', error);
    }
  };

  if (!show) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center">
      <div className='fixed left-0 top-0 w-screen h-screen bg-transparent' onClick={onClose}>
      </div>
      <div className="relative my-auto mx-auto p-5 border w-[520px] shadow-lg rounded-[14px] bg-white">
        <div className="mb-5 flex justify-evenly items-center">
          <div className="">
            <img
              alt=""
              className="h-14 w-14"
              src={logo} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Assign Application
          </h2>
        </div>
        {error && error !== "" && <div className='text-center text-red-500 text-lg mb-3 text-bold'>{error}</div>}
        <form className="px-8 py-2 max-h-[78vh] overflow-auto" onSubmit={handleSubmit}>

          <div className="mb-7 flex items-center">
            <div className='w-3/5'>Assign to :</div>
            <select
              className='rounded-md  w-full border sm:text-sm px-2 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5'
              value={assign}
              onChange={(e) => {
                setAssign(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setError('Please select one')
                } else {
                  setError('');
                }
              }}
              name="assign"
            >
              <option value="">Select</option>
              {users.map((each, index) => {
                return <option key={index} value={each.id}>{each.id === user?.id ? "Me" : each.email}</option>;
              })}
            </select>
          </div>



          <div className='flex'>
            <button
              onClick={onClose}
              className="me-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignModal;