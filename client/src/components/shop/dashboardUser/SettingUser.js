import React, { Fragment, useState, useContext } from "react";
import Layout from "./Layout";
import { handleChangePassword } from "./Action";
import { DashboardUserContext } from "./Layout";

const SettingComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);

  const [fData, setFdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    passwordView: false,
    type: "password",
  });

  if (fData.success || fData.error) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 1500);
  }

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center ">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-sm border border-gray-200 bg-white rounded-none-none p-6 sm:p-10 mb-8 w-full max-w-3xl mx-auto">
          <div className="border-b border-gray-100 pb-6 mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h2>
            <p className="text-gray-500 mt-2 font-medium">Update your password to keep your account secure.</p>
          </div>
          
          <div className="flex flex-col space-y-8">
            {fData.success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-none-none font-medium shadow-sm">
                {fData.success}
              </div>
            )}
            {fData.error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-none-none font-medium shadow-sm">
                {fData.error}
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="oldPassword" className="text-sm font-bold text-gray-700 tracking-wide">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setFdata({ ...fData, oldPassword: e.target.value })}
                  value={fData.oldPassword}
                  type={fData.type}
                  id="oldPassword"
                  name="oldPassword"
                  autoComplete="current-password"
                  className="w-full pl-5 pr-12 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                  placeholder="Enter current password"
                />
                {!fData.passwordView ? (
                  <button
                    type="button"
                    onClick={() => setFdata({ ...fData, passwordView: true, type: "text" })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setFdata({ ...fData, passwordView: false, type: "password" })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword" className="text-sm font-bold text-gray-700 tracking-wide">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setFdata({ ...fData, newPassword: e.target.value })}
                value={fData.newPassword}
                type={fData.type}
                id="newPassword"
                name="newPassword"
                autoComplete="new-password"
                className="w-full px-5 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 tracking-wide">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setFdata({ ...fData, confirmPassword: e.target.value })}
                value={fData.confirmPassword}
                type={fData.type}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                className="w-full px-5 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                placeholder="Confirm new password"
              />
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div
                onClick={(e) => handleChangePassword(fData, setFdata, dispatch)}
                className="relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 overflow-hidden outline-none focus:ring-4 focus:ring-blue-500/30 w-full sm:w-auto px-10 py-4 text-base rounded-none-none bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:translate-y-px cursor-pointer group"
              >
                Change password
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingUser = (props) => {
  return (
    <Fragment>
      <Layout children={<SettingComponent />} />
    </Fragment>
  );
};

export default SettingUser;
