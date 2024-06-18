import React, { useState } from "react";
import { isNotEmpty, isValidEmail, isValidAmount } from "../utils/validators";
import Input from "./Input";
import logo from "../assets/images/logo.png";
import { useAuthStore } from "../store/authStore";
import api from "../api/axios";

type ModalFormProps = {
  show: boolean;
  onClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({ show, onClose }) => {
  const { user } = useAuthStore();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    companyName: "",
    loanAmount: "",
    applicantName: "",
    applicantDescription: "",
    applicantEmail: "",
  });
  const [companyName, setCompanyName] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [companyTaxNumber, setCompanyTaxNumber] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [currency, setCurrency] = useState("$/USD");
  const [loanType, setLoanType] = useState("Corporate Loan");
  const [applicantName, setApplicantName] = useState("");
  const [applicantDescription, setApplicantDescription] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (filename: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== filename));
  };

  const validateForm = () => {
    let valid = true;
    let errors = {
      companyName: "",
      loanAmount: "",
      applicantName: "",
      applicantEmail: "",
      applicantDescription: "",
    };

    if (!isValidEmail(applicantEmail)) {
      errors.applicantEmail = "Invalid email format";
      valid = false;
    }
    if (!isValidAmount(loanAmount)) {
      errors.loanAmount = "Only numbers are allowed";
      valid = false;
    }
    if (!companyName) {
      errors.companyName = "Company Name is required";
      valid = false;
    }
    if (!applicantName) {
      errors.applicantName = "Applicant Name is required";
      valid = false;
    }
    if (!applicantDescription) {
      errors.applicantDescription = "Applicant Description is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyLocation", companyLocation);
    formData.append("companyTaxNumber", companyTaxNumber);
    formData.append("loanAmount", loanAmount === "" ? "0" : loanAmount);
    formData.append("currency", currency);
    formData.append("loanType", loanType);
    formData.append("applicantName", applicantName);
    formData.append("applicantDescription", applicantDescription);
    formData.append("applicantEmail", applicantEmail);
    formData.append("applicantPhone", applicantPhone);
    formData.append("createdBy", user!.id);
    files.forEach((file) => formData.append("loanDocuments", file));

    try {
      const response = await api.post("/applications/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      console.log(result);
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
      console.error("Failed to create application", error);
    }
  };

  if (!show) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full mt-0 flex items-center justify-center">
      <div
        className="fixed left-0 top-0 w-screen h-screen bg-transparent"
        onClick={onClose}
      ></div>
      <div className="relative my-auto mx-auto p-5 border w-[520px] shadow-lg rounded-[14px] bg-white">
        <div className="mb-5 flex justify-evenly items-center">
          <div className="">
            <img alt="" className="h-14 w-14" src={logo} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create Loan Application
          </h2>
        </div>
        {error && error !== "" && (
          <div className="text-center text-red-500 text-bold">{error}</div>
        )}
        <form
          className="px-8 py-2 max-h-[78vh] overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <Input
              type="text"
              value={companyName}
              label="Company Name"
              handleChange={(e) => {
                setCompanyName(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({
                    ...errors,
                    companyName: "Company Name is required",
                  });
                } else {
                  setErrors({ ...errors, companyName: "" });
                }
              }}
            />
            {errors.companyName && (
              <p className="text-red-500 ms-[43%] text-xs">
                {errors.companyName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={companyLocation}
              label="Company Location"
              handleChange={(e) => {
                setCompanyLocation(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={companyTaxNumber}
              label="Company Tax Number"
              handleChange={(e) => {
                setCompanyTaxNumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={loanAmount}
              label="Loan Amount"
              placeholder="0"
              handleChange={(e) => {
                setLoanAmount(e.target.value);
                if (!isValidAmount(e.target.value)) {
                  setErrors({
                    ...errors,
                    loanAmount: "Only numbers are allowed",
                  });
                } else {
                  setErrors({ ...errors, loanAmount: "" });
                }
              }}
            />
            {errors.loanAmount && (
              <p className="text-red-500 ms-[43%] text-xs">
                {errors.loanAmount}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <div className="w-4/5">Currency :</div>
            <select
              className="rounded-md  w-full border sm:text-sm px-2 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              name="currency"
              id=""
            >
              <option value="$/USD">$/USD</option>
              <option value="Euro">Euro</option>
              <option value="Pound">Pound</option>
              <option value="INR">INR</option>
              <option value="Yen">Yen</option>
              <option value="AED">AED</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <div className="w-4/5">Loan Type :</div>
            <select
              className="rounded-md  w-full border sm:text-sm px-2 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={loanType}
              onChange={(e) => {
                setLoanType(e.target.value);
              }}
              name="currency"
              id=""
            >
              <option value="Corporate Loan">Corporate Loan</option>
              <option value="Corporate OD">Corporate OD</option>
              <option value="Applicant Designation">
                Applicant Designation
              </option>
            </select>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={applicantName}
              label="Applicant Name"
              handleChange={(e) => {
                setApplicantName(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({
                    ...errors,
                    applicantName: "Applicant Name is required",
                  });
                } else {
                  setErrors({ ...errors, applicantName: "" });
                }
              }}
            />
            {errors.applicantName && (
              <p className="text-red-500 ms-[43%] text-xs">
                {errors.applicantName}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={applicantDescription}
              label="Applicant Description"
              handleChange={(e) => {
                setApplicantDescription(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({
                    ...errors,
                    applicantDescription: "Applicant Description is required",
                  });
                } else {
                  setErrors({ ...errors, applicantDescription: "" });
                }
              }}
            />
            {errors.applicantDescription && (
              <p className="text-red-500 ms-[43%] text-xs">
                {errors.applicantDescription}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={applicantEmail}
              error={!!errors.applicantEmail}
              label="Applicant Email"
              handleChange={(e) => {
                setApplicantEmail(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, applicantEmail: "Email is required" });
                } else if (!isValidEmail(e.target.value)) {
                  setErrors({
                    ...errors,
                    applicantEmail: "Invalid email format",
                  });
                } else {
                  setErrors({ ...errors, applicantEmail: "" });
                }
              }}
            />
            {errors.applicantEmail && (
              <p className="text-red-500 ms-[43%] text-xs">
                {errors.applicantEmail}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={applicantPhone}
              label="Applicant Phone"
              handleChange={(e) => {
                setApplicantPhone(e.target.value);
              }}
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
                  className="flex justify-between items-center p-2"
                >
                  {file.name}
                  <button
                    onClick={() => handleRemoveFile(file.name)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
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
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
