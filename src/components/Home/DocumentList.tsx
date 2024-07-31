import React from "react";
import docIcon from "../../assets/icons/doc.svg";
import trashIcon from "../../assets/icons/trash.svg";
import { SelectButton } from "../Buttons/SelectButton";
import { SearchSelectButton } from "../Buttons/SearchSelectButton";

type ExtendedFile = { file: File; documentType?: string[] };
type typeOptions = { name: string; value: string };
type processOptions = { name: string; value: string };

interface ListProps {
  files: ExtendedFile[];
  typeOptions: typeOptions[];
  processOptions: processOptions[];
  onRemoveFile: (filename: string) => void;
  onDocumentTypeChange: (selectedOptions: string[], fileIndex: number) => void;
  onHandleOptionChange: (selectedOption: string) => void;
}

const DocumentList: React.FC<ListProps> = ({
  files,
  typeOptions,
  processOptions,
  onRemoveFile,
  onDocumentTypeChange,
  onHandleOptionChange,
}) => {
  return (
    <div className="px-6 pb-3">
      {files.length !== 0 && (
        <div className="flex px-2">
          <p className="w-[57%] font-semibold text-[18px]">Document List</p>
          <p className="font-semibold text-[18px]">Document Type</p>
        </div>
      )}
      {files.map((file, index) => (
        <div key={index} className="flex gap-4 p-1">
          <div className="flex bg-gray-100 gap-2 border w-[55%] border-gray-300 rounded-md p-2 h-[70px]">
            <img src={docIcon} alt="docIcon" />
            <div className="w-[79%]">
              <p className="font-bold truncate">{file.file.name}</p>
              <p>{file.file.size}</p>
            </div>
            <img
              src={trashIcon}
              alt="trash"
              className="w-[25px] cursor-pointer "
              onClick={() => onRemoveFile(file.file.name)}
            />
          </div>
          <SearchSelectButton
            options={typeOptions}
            onDocumentTypeChange={onDocumentTypeChange}
            fileIndex={index}
          />
        </div>
      ))}
      {files.length !== 0 && (
        <div className="mt-5 w-[40%]">
          <p className="font-semibold mx-2 text-[18px]">Process Type Name</p>
          <SelectButton
            options={processOptions}
            placeHolder={"Select Process Type Name"}
            onHandleOptionChange={onHandleOptionChange}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentList;
