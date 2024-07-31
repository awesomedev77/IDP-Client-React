import React from 'react';
import modalBg from '../assets/images/modal-bg.png'

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  error?: boolean;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, title = "", content = "", error=false }) => {
  if (!show) {
    return <></>;
  }

  let titleClass = error ? "text-[#DC4C64]" : "text-[#14A44D]";
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center">
      <div className='fixed left-0 top-0 w-screen h-screen bg-transparent' onClick={onClose}>

      </div>
      <div className="relative my-auto mx-auto p-5 border w-[520px] shadow-lg rounded-[14px] bg-white">
        <div className="mt-3 text-center">
          <img
            alt=""
            className="mx-auto"
            src={modalBg} />
          <h3 className={`text-lg leading-6 mt-2 font-bold ${titleClass}`}>{title}</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-md text-gray-900 font-medium">{content}</p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-3 bg-blue-600 text-white text-base rounded-[24px] font-medium w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;