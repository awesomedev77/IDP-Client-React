// src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { isNotEmpty, isValidEmail } from '../utils/validators';
import { useAuthStore } from '../store/authStore';
import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import Modal from '../components/Modal';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const login = useAuthStore((state) => state.login);

  const validateForm = () => {
    let valid = true;
    let errors = { email: '', password: '' };

    if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogin = async (event: React.FormEvent) => {
    console.log(process.env.REACT_APP_API_URL);
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}auth/login`, { email, password });
      const { token } = response.data;
      login(token);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'An unexpected error occurred. Please try again.';
        setModalContent({ title: 'Error', content: errorMessage });
        setShowModal(true);
      } else {
        setModalContent({ title: 'Error', content: 'An unexpected error occurred. Please try again.' });
        setShowModal(true);
      }
    }
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader heading='Signin to the application' paragraph="Don't have an account yet? " linkName='Signup' linkUrl='/signup' />
        <form className="px-8 pt-2 pb-8 mb-4" onSubmit={handleLogin}>
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
              type="password"
              value={password}
              placeholder='Password'
              handleChange={(e) => {
                setPassword(e.target.value);
                if (!isNotEmpty(e.target.value)) {
                  setErrors({ ...errors, password: 'Password is required' });
                } else {
                  setErrors({ ...errors, password: '' });
                }
              }}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[24px] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
          >
            Login
          </button>
        </form>
      </div>
      <Modal
        show={showModal}
        onClose={handleClose}
        title={modalContent.title}
        content={modalContent.content}
        error = {true}
      />
    </div>
  );
};

export default Login;