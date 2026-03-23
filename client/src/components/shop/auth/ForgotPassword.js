import React, { Fragment, useState } from "react";
import { forgotPasswordReq } from "./fetchApi";
import { useSnackbar } from 'notistack';

const ForgotPassword = ({ setAction }) => {
  const [data, setData] = useState({
    email: "",
    error: false,
    loading: false,
    success: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true, error: false, success: false });
    try {
      let responseData = await forgotPasswordReq({
        email: data.email,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
        });
      } else if (responseData.success) {
        setData({
          ...data,
          loading: false,
          success: responseData.success,
          email: "",
        });
        enqueueSnackbar('Reset email sent successfully!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false, error: "Something went wrong" });
    }
  };

  return (
    <Fragment>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold auth-typography-heading text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-500 auth-typography-body text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {data.error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-3 mb-6 text-sm auth-typography-body">
          {data.error}
        </div>
      )}

      {data.success && (
        <div className="bg-green-50 text-green-700 border border-green-200 p-4 mb-6 text-sm auth-typography-body flex flex-col items-center text-center">
          <svg className="w-8 h-8 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <span className="font-medium text-green-800">{data.success}</span>
          <span className="mt-1">Please check your email inbox and follow the link inside.</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={formSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5 auth-typography-body">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false, success: false });
            }}
            value={data.email}
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 text-gray-900 auth-typography-body auth-input focus:outline-none placeholder-gray-400"
            placeholder="john@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={data.loading || data.success}
          className="w-full flex justify-center py-3 text-sm font-medium tracking-wide uppercase auth-typography-body auth-btn disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {data.loading ? "Sending link..." : "Send Reset Link"}
        </button>
      </form>
      
      <div className="mt-8 text-center text-sm auth-typography-body text-gray-500">
        Remember your password?{" "}
        <span onClick={() => setAction("login")} className="font-medium text-gray-900 hover:underline cursor-pointer transition-colors">
          Sign in
        </span>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
