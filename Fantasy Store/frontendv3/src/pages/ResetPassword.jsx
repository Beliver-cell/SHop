import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/Shopcontext';
import { useContext } from 'react';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('No reset token found');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        backendUrl + '/api/user/reset-password',
        { token, newPassword }
      );

      if (response.data.success) {
        toast.success('✓ Password reset successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.message || 'Reset failed');
      }
    } catch (error) {
      console.log(error);
      toast.error('Reset error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 pb-20">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Reset Password</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-700" />
      </div>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your new password below
      </p>

      <input
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:border-black"
        placeholder="New Password (min 8 chars)"
        type="password"
        required
      />

      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:border-black"
        placeholder="Confirm Password"
        type="password"
        required
      />

      <button
        disabled={loading}
        className="bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 disabled:bg-gray-400"
        type="submit"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Remembered your password? <a href="/login" className="text-black underline">Login here</a>
      </p>
    </form>
  );
};

export default ResetPassword;
