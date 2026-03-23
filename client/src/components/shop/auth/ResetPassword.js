import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Layout from "../layout";
import { useSnackbar } from "notistack";
import { Eye, EyeOff } from "lucide-react";
import "./AuthStyles.css";

const ResetPasswordComponent = () => {
  const { token } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      return setData({ ...data, error: "Passwords do not match" });
    }
    
    setData({ ...data, loading: true, error: false, success: false });
    try {
      let responseData = await resetPasswordReq({
        token,
        newPassword: data.newPassword,
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
          newPassword: "",
          confirmPassword: "",
        });
        enqueueSnackbar('Password reset successful!', { variant: 'success' });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false, error: "Something went wrong" });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white pb-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl sm:text-5xl font-light text-gray-900 auth-typography-heading tracking-tight">
          Reset Password
        </h2>
        <p className="mt-3 text-center text-sm text-gray-500 auth-typography-body uppercase tracking-widest">
          Enter your new credentials
        </p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="absolute inset-0 z-0 bg-gray-50 transform -skew-y-2 translate-y-4 shadow-sm"></div>
        <div className="bg-white py-12 px-8 sm:px-12 relative z-10 border border-gray-100 shadow-xl">
          
          {data.error && (
            <div className="bg-red-50 text-red-600 border border-red-100 p-4 mb-8 text-sm auth-typography-body">
              {data.error}
            </div>
          )}

          {data.success && (
             <div className="bg-green-50 text-green-700 border border-green-200 p-6 mb-8 text-sm auth-typography-body flex flex-col items-center text-center">
               <svg className="w-10 h-10 text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
               </svg>
               <span className="font-medium text-green-900 text-lg uppercase tracking-wider">{data.success}</span>
               <span className="mt-2 text-green-700">Redirecting to homepage...</span>
             </div>
          )}

          <form className="space-y-8" onSubmit={formSubmit}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900 auth-typography-body mb-2 uppercase tracking-wide">
                New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={data.newPassword}
                  onChange={(e) => setData({ ...data, newPassword: e.target.value, error: false })}
                  className="appearance-none block w-full px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white sm:text-lg auth-typography-body transition-all duration-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 auth-typography-body mb-2 uppercase tracking-wide">
                Confirm New Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={data.confirmPassword}
                  onChange={(e) => setData({ ...data, confirmPassword: e.target.value, error: false })}
                  className="appearance-none block w-full px-5 py-4 border-b-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white sm:text-lg auth-typography-body transition-all duration-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={data.loading || data.success}
                className="w-full flex justify-center py-5 text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="group-hover:tracking-widest transition-all duration-300">
                  {data.loading ? "Processing..." : "Secure Account"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResetPassword = (props) => {
  return (
    <Layout children={<ResetPasswordComponent />} />
  );
};

export default ResetPassword;
