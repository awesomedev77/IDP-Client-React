import React from "react";
import docIcon from "../assets/icons/doc.svg";
import trashIcon from "../assets/icons/trash.svg";
import searchIcon from "../assets/icons/search.svg";
import { DocumentProps } from "../utils/interface";

type ExtendedFile = { file: File; documentType?: string };
type typeOptions = { name: string; value: string };

interface ListProps {
  files: ExtendedFile[];
  typeOptions: typeOptions[];
}

const DocumentList: React.FC<ListProps> = ({ files, typeOptions }) => {
  return (
    <div className="p-6">
      {files.length !== 0 && (
        <div className="flex px-2">
          <p className="w-[56%]">Document List</p>
          <p className="w-[44%]">Document Type</p>
        </div>
      )}
      {files.map((file, index) => (
        <div key={index} className="flex gap-4 p-1">
          <div className="flex bg-gray-100 border w-[60%] border-gray-300 rounded-md p-2 h-[70px]">
            <img src={docIcon} alt="docIcon" className="mr-2" />
            <div className="flex flex-col w-[80%]">
              <p className="font-bold">{file.file.name}</p>
              <p>{file.file.size}</p>
            </div>
            <img src={trashIcon} alt="trash" className="w-[25px]" />
          </div>
          <div className="w-[50%]">
            <div>
              <div className="flex flex-cols bg-gray-100 rounded-3xl border border-gray-300 h-[35px] py-2 px-3">
                <img src={searchIcon} alt="searchIcon" />
                <input
                  className="bg-gray-100 outline-none w-full ml-2"
                  placeholder="Search/Select document type(s)"
                />
              </div>
              <div className="flex mt-2 flex-wrap gap-2">
                {typeOptions.map((type) => (
                  <div
                    key={type.value}
                    className="border border-blue-400 rounded-2xl cursor-pointer px-3 text-blue-400"
                  >
                    #{type.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
