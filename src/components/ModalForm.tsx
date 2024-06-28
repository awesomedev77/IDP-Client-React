import React, { useEffect, useState } from "react";
import close_circle from "../assets/icons/close-circle.svg";
import { UploadIcon } from "../components/icons/upload";
import api from "../api/axios";
import { Process, Type } from "../utils/interface";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import "../Select.css";
import DocumentList from "./DocumentList";

type ModalFormProps = {
  show: boolean;
  onClose: () => void;
};

type ExtendedFile = { file: File; documentType?: string };

const ModalForm: React.FC<ModalFormProps> = ({ show, onClose }) => {
  const [error, setError] = useState("");
  const [documentTypes, setDocumentTypes] = useState<Type[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [process, setProcess] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<ExtendedFile[]>([]);
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files).map((file: File) => ({
        file,
        documentType: "",
      }));
      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (filename: string) => {
    setFiles(files.filter((file) => file.file.name !== filename));
  };
  const handleDocumentTypeChange = (
    selectedOption: string,
    fileIndex: number
  ) => {
    const updatedFiles = files.map((file, index) => {
      if (index === fileIndex) {
        return { file: file.file, documentType: selectedOption };
      }
      return file;
    });
    console.log(updatedFiles);
    setFiles(updatedFiles);
  };

  const validateForm = () => {
    let valid = true;

    if (process === "") {
      setError("Please select process");
      valid = false;
    }
    files.forEach((file) => {
      if (file.documentType === "") {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("processId", process);
    files.forEach((file) => {
      formData.append("documents", file.file);
      formData.append("fileTypes", file.documentType || ""); // Append document type
    });

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
      <div className="relative my-auto mx-auto pb-7 min-h-[550px] w-[900px] shadow-lg rounded-[14px] bg-white">
        <div className="flex items-center px-5 bg-black rounded-tr-[14px] h-[60px] rounded-tl-[14px] justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Upload Document(s)
          </h2>
          <img
            src={close_circle}
            className="h-8 w-8 cursor-pointer"
            alt="close"
            onClick={onClose}
          />
        </div>
        <label htmlFor="file_input">
          <div className="flex flex-col items-center cursor-pointer justify-center border border-dashed border-gray-400 m-7 p-7 rounded-xl ">
            <UploadIcon className="stroke-2 stroke-black w-[30px] h-[40px]" />
            <span className="text-[25px] font-semibold">
              Click or drag all the files to this area to upload
            </span>
            <span className="text-[17px] text-gray-500">
              Upload each document as a seperate file in PDF, JPG, PNG format.
            </span>
          </div>
        </label>
        <input
          onChange={handleFileChange}
          className="hidden"
          aria-describedby="file_input_help"
          id="file_input"
          accept=".pdf, .docs, .txt"
          type="file"
        />
        <div className="max-h-[300px] overflow-auto mb-[50px]">
          <DocumentList files={files} typeOptions={typeOptions} />
        </div>
        <div className="flex justify-center bottom-5 w-full absolute">
          <button className="rounded-3xl bg-blue-500 w-[120px] h-[40px] text-white">
            Upload
          </button>
        </div>
        {/* <form
          className="px-8 py-2 max-h-[78vh] overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex justify-between items-center px-3">
            <div>Please Select Process:</div>
            <SelectSearch
              placeholder="select process"
              search
              value={process}
              onChange={(value) => setProcess(value as string)}
              options={processOptions}
              className="select-search"
            />
          </div>
          <div className="mb-7">
            <div className="flex items-center">
              <label
                htmlFor="file_input"
                className="relative m-0 w-full block min-w-0  cursor-pointer rounded border border-solid border-gray-300 text-white bg-gray-700 bg-clip-padding px-3 py-2 text-center font-normal text-surface transition duration-300 ease-in-out focus:border-primary focus:shadow-inset focus:outline-none"
              >
                <span className="text-center">
                  {files.length > 0 ? "Add another file" : "Choose file"}
                </span>
              </label>
              <input
                onChange={handleFileChange}
                className="hidden"
                aria-describedby="file_input_help"
                id="file_input"
                accept=".pdf, .docs, .txt"
                type="file"
              />
            </div>
            <p className="text-xs mt-1" id="file_input_help">
              PDF, DOCS or TXT
            </p>
            <ul>
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex flex-row p-2 gap-3 items-center"
                >
                  <p className="grow truncate">{file.file?.name}</p>
                  <div className="selectsearch">
                    <SelectSearch
                      placeholder="select file type"
                      search
                      value={file.documentType}
                      onChange={(option) =>
                        handleDocumentTypeChange(option as string, index)
                      }
                      options={typeOptions}
                      className="select-search"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveFile(file.file?.name)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex mt-0 mb-5">
            <button
              onClick={onClose}
              className="me-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="group relative disabled:bg-blue-400 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Create
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default ModalForm;
