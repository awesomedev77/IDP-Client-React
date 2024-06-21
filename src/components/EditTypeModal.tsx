import React, { useState } from "react";
import { isNotEmpty, isValidEmail } from "../utils/validators";
import Input from "./Input";
import logo from "../assets/images/logo.png";
import api from "../api/axios";
import axios from "axios";
import { Type } from "../utils/interface";

type EditTypeModalProps = {
  show: boolean;
  onClose: () => void;
  type: Type;
  refreshPage: any;
};

const EditTypeModal: React.FC<EditTypeModalProps> = ({
  show,
  onClose,
  type,
  refreshPage,
}) => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    typeName: "",
  });
  const [typeName, setTypeName] = useState(type.typeName);

  const validateForm = () => {
    let valid = true;
    let errors = {
      typeName: "",
    };


    if (!isNotEmpty(typeName)) {
      errors.typeName = "Type name is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post(`/type/edit/${type.id}`, {
        typeName
      });
      const result = response.data;
      refreshPage(result);
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          "An unexpected error occurred. Please try again.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
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
            Edit IDP Type
          </h2>
        </div>
        {error && error !== "" && (
          <div className="text-center text-red-500 text-bold">{error}</div>
        )}
        <form
          className="px-8 py-2 max-h-[78vh] overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-7">
            <Input
              type="text"
              value={typeName}
              error={!!errors.typeName}
              placeholder="Type Name"
              handleChange={(e) => {
                setTypeName(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, typeName: "Type Name is required" });
                } else {
                  setErrors({ ...errors, typeName: "" });
                }
              }}
            />
            {errors.typeName && (
              <p className="text-red-500 text-xs">{errors.typeName}</p>
            )}
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTypeModal;
