import React from "react";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  
  const orderId = searchParams.get("orderId");
  const method = searchParams.get("method");
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      let response;

      if (method === "paystack" || reference) {
        response = await axios.post(
          backendUrl + "/api/order/verifyPaystack",
          { reference, orderId },
          { headers: { token } }
        );
      } else {
        navigate("/cart");
        return;
      }

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment successful! Thank you for your order.");
        navigate("/orders");
      } else {
        toast.error(response.data.message || "Payment verification failed");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      navigate("/cart");
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-center py-8">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Verifying your payment...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait while we confirm your transaction.</p>
          </>
        ) : (
          <p className="text-lg text-gray-600">Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Verify;
