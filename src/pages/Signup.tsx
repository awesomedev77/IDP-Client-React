// src/pages/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isNotEmpty } from '../utils/validators';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Modal from '../components/Modal';


const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({ email: '', fullName: '', password: '', confirmPassword: '', role: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let errors = { email: '', fullName: '', password: '', confirmPassword: '', role: '' };

    if (!isNotEmpty(email)) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }
    if (!isNotEmpty(fullName)) {
      errors.fullName = 'Full name is required';
      valid = false;
    }
    if (!isNotEmpty(password)) {
      errors.password = 'Password is required';
      valid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    if (!isNotEmpty(role)) {
      errors.role = 'Role is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleClose = () => {
    setShowModal(false);
    if (isSignupSuccess) {
      navigate('/login'); // Redirects to the login page if signup was successful
    }
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}auth/register`, { email, fullName, role, password });
      setModalContent({ title: 'Success', content: "You signed up successfully." });
      setIsSignupSuccess(true);
      setShowModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again.';
        setIsSignupSuccess(false);
        setModalContent({ title: 'Error', content: errorMessage });
        setShowModal(true);
      } else {
        setIsSignupSuccess(false);
        setModalContent({ title: 'Error', content: 'An unexpected error occurred. Please try again.' });
        setShowModal(true);
      }
    }
  };

  return (

    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader heading='Signup to create an account' paragraph='Already have an account? ' linkName='Login' linkUrl='/login' />
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSignup}>
          <div className="mb-4">
            <Input
              type="text"
              value={email}
              error={!!errors.email}
              placeholder='Email address'
              handleChange={(e) => {
                setEmail(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, email: 'Email is required' })
                } else if (!isValidEmail(e.target.value)) {
                  setErrors({ ...errors, email: 'Invalid email format' })
                } else {
                  setErrors({ ...errors, email: '' })
                }
              }}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={fullName}
              error={!!errors.fullName}
              placeholder='Full Name'
              handleChange={(e) => {
                setFullName(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, fullName: 'Full Name is required' })
                } else {
                  setErrors({ ...errors, fullName: '' })
                }
              }}
            />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              value={role}
              error={!!errors.role}
              placeholder='Description'
              handleChange={(e) => {
                setRole(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, role: 'Description is required' })
                } else {
                  setErrors({ ...errors, role: '' })
                }
              }}
            />
            {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              value={password}
              placeholder='Password'
              error={!!errors.password}
              handleChange={(e) => {
                setPassword(e.target.value);
                let newPassword = ""
                if (!isNotEmpty(e.target.value)) {
                  newPassword = 'Password is required';
                } else {
                  newPassword = '';
                }

                if (e.target.value !== confirmPassword) {
                  setErrors({ ...errors, password: newPassword, confirmPassword: 'Passwords do not match' })
                } else {
                  setErrors({ ...errors, password: newPassword, confirmPassword: '' })
                }
              }}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <Input
              type="password"
              value={confirmPassword}
              placeholder='Confirm Password'
              error={!!errors.confirmPassword}
              handleChange={(e) => {
                setConfirmPassword(e.target.value)
                if (password !== e.target.value) {
                  setErrors({ ...errors, confirmPassword: 'Passwords do not match' })
                } else {
                  setErrors({ ...errors, confirmPassword: '' })
                }
              }}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
          >
            Sign Up
          </button>
        </form>
      </div>
      <Modal
        show={showModal}
        onClose={handleClose}
        title={modalContent.title}
        content={modalContent.content}
        error={!isSignupSuccess}
      />
    </div>

  );
};

export default Signup;