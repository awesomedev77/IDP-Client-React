import React, { useEffect, useState, useCallback } from "react";
import close_circle from "../assets/icons/close-circle.svg";
import "react-select-search/style.css";
import "../Select.css";

type ViewDocumentModalProps = {
  show: boolean;
  onClose: () => void;
};

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ show, onClose }) => {

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center">
      <div
        className="fixed left-0 top-0 w-screen h-screen bg-transparent"
        onClick={onClose}
      ></div>
      <div className="relative my-auto mx-auto pb-7 min-h-[550px] w-[900px] shadow-lg rounded-[14px] bg-white">
        <div className="flex items-center px-5 bg-black rounded-tr-[14px] h-[60px] rounded-tl-[14px] justify-between">
          <h2 className="text-2xl font-semibold text-white">
            View Document
          </h2>
          <img
            src={close_circle}
            className="h-8 w-8 cursor-pointer"
            alt="close"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;
