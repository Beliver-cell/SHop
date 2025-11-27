import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/Shopcontext';
import { useContext } from 'react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);
  const [verifying, setVerifying] = useState(true);
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        toast.error('No verification token found');
        setVerifying(false);
        return;
      }

      try {
        const response = await axios.post(
          backendUrl + '/api/user/verify-email',
          { token }
        );

        if (response.data.success) {
          toast.success('✓ Email verified successfully!');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          toast.error(response.data.message || 'Verification failed');
          setVerifying(false);
        }
      } catch (error) {
        console.log(error);
        toast.error('Verification error. Please try again.');
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token, backendUrl, navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center py-8">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black mx-auto mb-6"></div>
            <p className="text-2xl font-semibold text-gray-800">Verifying Your Email</p>
            <p className="text-sm text-gray-500 mt-3">Please wait while we activate your account...</p>
          </>
        ) : (
          <div>
            <p className="text-lg text-gray-600">Verification failed</p>
            <p className="text-sm text-gray-400 mt-2">
              <a href="/login" className="text-black underline">Return to login</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
