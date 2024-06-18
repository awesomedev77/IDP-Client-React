import React, { useState } from "react";
import { isNotEmpty, isValidEmail } from "../utils/validators";
import Input from "./Input";
import logo from "../assets/images/logo.png";
import api from "../api/axios";
import axios from "axios";
import { User } from "../utils/interface";

type EditUserModalProps = {
  show: boolean;
  onClose: () => void;
  user: User;
  refreshPage: any;
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onClose,
  user,
  refreshPage,
}) => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    role: "",
  });
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.fullName);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(user.role);

  const validateForm = () => {
    let valid = true;
    let errors = {
      email: "",
      fullName: "",
      role: "",
    };

    if (!isNotEmpty(email)) {
      errors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }
    if (!isNotEmpty(fullName)) {
      errors.fullName = "Full name is required";
      valid = false;
    }
    if (!isNotEmpty(role)) {
      errors.role = "Role is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post(`/auth/user/edit/${user.id}`, {
        email,
        fullName,
        role,
        password,
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
            Create Loan User
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
              value={email}
              error={!!errors.email}
              placeholder="Email address"
              handleChange={(e) => {
                setEmail(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, email: "Email is required" });
                } else if (!isValidEmail(e.target.value)) {
                  setErrors({ ...errors, email: "Invalid email format" });
                } else {
                  setErrors({ ...errors, email: "" });
                }
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={fullName}
              error={!!errors.fullName}
              placeholder="Full Name"
              handleChange={(e) => {
                setFullName(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, fullName: "Full Name is required" });
                } else {
                  setErrors({ ...errors, fullName: "" });
                }
              }}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs">{errors.fullName}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={role}
              error={!!errors.role}
              placeholder="Description"
              handleChange={(e) => {
                setRole(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, role: "Description is required" });
                } else {
                  setErrors({ ...errors, role: "" });
                }
              }}
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>
          <div className="mb-7">
            <Input
              type="password"
              value={password}
              placeholder="Password"
              handleChange={(e) => {
                setPassword(e.target.value);
              }}
            />
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

export default EditUserModal;
