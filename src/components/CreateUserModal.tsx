import React, { useState } from "react";
import { isNotEmpty, isValidEmail } from "../utils/validators";
import Input from "./Input";
import logo from "../assets/images/logo.png";
import api from "../api/axios";
import axios from "axios";

type CreateUserModalProps = {
  show: boolean;
  onClose: () => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ show, onClose }) => {
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const validateForm = () => {
    let valid = true;
    let errors = {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
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
    if (!isNotEmpty(password)) {
      errors.password = "Password is required";
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
      const response = await api.post(`/auth/user/add`, {
        email,
        fullName,
        role,
        password,
      });
      const result = response.data;
      console.log(result);
      window.location.reload();
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
        <div className="mb-5 flex justify-center items-center gap-4">
          <div className="">
            <img alt="" className="h-14 w-14" src={logo} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create IDP User
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
            <select
              className="rounded-md  w-full border sm:text-sm px-2 py-2 border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, role: "role is required" });
                } else {
                  setErrors({ ...errors, role: "" });
                }
              }}
              name="role"
              id=""
            >
              <option value="">Slect Role</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role}</p>
            )}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              value={password}
              placeholder="Password"
              error={!!errors.password}
              handleChange={(e) => {
                setPassword(e.target.value);
                let newPassword = "";
                if (!isNotEmpty(e.target.value)) {
                  newPassword = "Password is required";
                } else {
                  newPassword = "";
                }

                if (e.target.value !== confirmPassword) {
                  setErrors({
                    ...errors,
                    password: newPassword,
                    confirmPassword: "Passwords do not match",
                  });
                } else {
                  setErrors({
                    ...errors,
                    password: newPassword,
                    confirmPassword: "",
                  });
                }
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="mb-7">
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              error={!!errors.confirmPassword}
              handleChange={(e) => {
                setConfirmPassword(e.target.value);
                if (password !== e.target.value) {
                  setErrors({
                    ...errors,
                    confirmPassword: "Passwords do not match",
                  });
                } else {
                  setErrors({ ...errors, confirmPassword: "" });
                }
              }}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
