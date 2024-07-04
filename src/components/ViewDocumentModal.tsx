import React, { useState } from "react";
import close_circle from "../assets/icons/close-circle.svg";
import "react-select-search/style.css";
import "../Select.css";

type ViewDocumentModalProps = {
  show: boolean;
  onClose: () => void;
  currentDoc: string;
};
const URL = process.env.REACT_APP_URL;

const ViewDocumentModal: React.FC<ViewDocumentModalProps> = ({ show, onClose, currentDoc }) => {
  const [zoom, setZoom] = useState(100);

  if (!show) {
    return null;
  }
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 10, 150)); // Maximum 200%
  };
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 10, 50)); // Minimum 50%
  };
  const getImageUrl = (imgPath: string) => {
    return imgPath.split('/')[1]
  };
  const isPDF = currentDoc.toLowerCase().endsWith('.pdf');

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center z-[100000]">
      <div
        className="fixed left-0 top-0 w-screen h-screen"
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
        <div className="relative p-5 flex flex-col items-center h-[440px]">
          <div className="overflow-auto border w-full h-full">
            <div className="bg-gray-100 overflow-x-auto overflow-y-auto w-full h-full flex items-center justify-center">
              {isPDF ? (
                <object data={`${URL}${getImageUrl(currentDoc)}`} type="application/pdf"
                  width="100%"
                  height="100%"
                >
                </object>
              ) : (
                <>
                  <img
                    src={`${URL}${getImageUrl(currentDoc)}`}
                    alt="doc"
                    style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
                  />
                  <div className="absolute -bottom-[30px] left-4 px-4 flex items-center space-x-2 rounded-md bg-white border p-1 shadow-lg">
                    <span className="text-base font-semibold">0{currentDoc.split('/').length - 1}/0{currentDoc.split('/').length - 1}</span>
                  </div>
                  <div className="absolute -bottom-[35px] right-4 flex items-center space-x-2 bg-white border shadow-lg p-2 rounded-md">
                    <button
                      className="flex items-center justify-center text-black hover:text-blue-500"
                      onClick={handleZoomOut}
                      disabled={zoom <= 50}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <span className="px-1 text-black font-semibold">{zoom}%</span>
                    <button
                      className="flex items-center justify-center w-6 h-6 text-black hover:text-blue-500"
                      onClick={handleZoomIn}
                      disabled={zoom >= 150}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;
