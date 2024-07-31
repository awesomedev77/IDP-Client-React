import React, { useEffect, useState, useCallback } from "react";
import close_circle from "../../assets/icons/close-circle.svg";
import { UploadIcon } from "../icons/upload";
import api from "../../api/axios";
import { Process, Type } from "../../utils/interface";
import "react-select-search/style.css";
import "../../Select.css";
import DocumentList from "./DocumentList";
import { isNotEmpty } from "../../utils/validators";
import { useDropzone } from "react-dropzone";
import { SelectButton } from "../Buttons/SelectButton";

type FilterModalProps = {
  show: boolean;
  handleApply: (processType: string, docType: string) => void;
  onClose: () => void;
};

type ExtendedFile = { file: File; documentType?: string[] };

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  handleApply,
  onClose,
}) => {
  const [error, setError] = useState("");
  const [documentTypes, setDocumentTypes] = useState<Type[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [process, setProcess] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const [processFilterType, setProcessFilterType] = useState("");
  const [docFilterType, setDocFilterType] = useState("");

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    if (typeof acceptedFiles[0] === "undefined") return;
    if (acceptedFiles && acceptedFiles.length > 0) {
      const newFiles = Array.from(acceptedFiles).map((file: File) => ({
        file,
        documentType: [],
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    api
      .get("/type/getAll")
      .then((res) => {
        setDocumentTypes(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      });
  }, []);
  useEffect(() => {
    api
      .get("/process/getAll")
      .then((res) => {
        setProcesses(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(error);
          localStorage.removeItem("auth-storage");
          window.location.href = "/login";
        }
      });
  }, []);

  const validateForm = () => {
    let valid = true;
    if (process === "") {
      setError("Please select process");
      valid = false;
    }
    files.forEach((file) => {
      if (file.documentType?.length === 0) {
        valid = false;
        setError("Please select document type");
        return;
      }
    });
    if (files.length < 1) {
      valid = false;
      setError("Please choose at least one file");
    }
    return valid;
  };

  const handleDocOptionChange = (selectedOption: string) => {
    console.log("doctype" + selectedOption);
    setDocFilterType(selectedOption);
  };
  const handleProcessOptionChange = (selectedOption: string) => {
    console.log("processType" + selectedOption);
    setProcessFilterType(selectedOption);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("processId", process);
    files.forEach((file) => {
      formData.append("documents", file.file);
      formData.append("fileTypes", file.documentType?.join("-") || ""); // Append document type
    });
    console.log(formData);
    try {
      const response = await api.post("/document/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
      console.error("Failed to create application", error);
    }
  };
  const typeOptions = documentTypes.map((type) => ({
    name: type.typeName,
    value: type.id,
  }));

  const processOptions = processes.map((process) => ({
    name: process.processName,
    value: process.id,
  }));

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center">
      <div
        className="fixed left-0 top-0 w-screen h-screen bg-transparent"
        onClick={onClose}
      ></div>
      <div className="relative my-auto mx-auto pb-7 min-h-[400px] w-[600px] shadow-lg rounded-[14px] bg-white">
        <div className="flex items-center px-5 bg-black rounded-tr-[14px] h-[50px] rounded-tl-[14px] justify-between">
          <h2 className="text-[18px] font-semibold text-white">Filter</h2>
          <img
            src={close_circle}
            className="h-8 w-8 cursor-pointer"
            alt="close"
            onClick={onClose}
          />
        </div>
        <div className="mt-5 mx-5">
          <p className="font-semibold mx-2 text-[18px]">Document Type</p>
          <SelectButton
            options={typeOptions}
            placeHolder={"Select Document type"}
            onHandleOptionChange={handleDocOptionChange}
          />
        </div>
        <div className="mt-5 mx-5 ">
          <p className="font-semibold mx-2 text-[18px]">Process Name</p>
          <SelectButton
            options={processOptions}
            placeHolder={"Select Process Name"}
            onHandleOptionChange={handleProcessOptionChange}
          />
        </div>
        <div className="flex justify-center bottom-5 w-full absolute">
          <button
            // disabled={files.length === 0 || loading}
            className="rounded-3xl bg-blue-500 w-[120px] hover:bg-blue-600 disabled:bg-blue-300 h-[40px] text-white"
            onClick={() => {
              console.log('apply');
              console.log("processfiltertype" + processFilterType);
              console.log("docfiltertype" + docFilterType);
              handleApply(processFilterType as string, docFilterType as string);
              onClose();
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
