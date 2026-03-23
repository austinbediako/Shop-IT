import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [fData, setFdata] = useState({
    id: "",
    name: "",
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    success: false,
  });

  useEffect(() => {
    let rawPhone = userDetails.phoneNumber || "";
    let extractedCode = "+1";
    let extractedNumber = rawPhone;
    
    if (rawPhone.startsWith("+")) {
      const codes = ["+1", "+44", "+233", "+234", "+254", "+27", "+61", "+91", "+49", "+33"];
      // Sort by length descending to match longest code first
      codes.sort((a, b) => b.length - a.length);
      for (let code of codes) {
        if (rawPhone.startsWith(code)) {
          extractedCode = code;
          extractedNumber = rawPhone.substring(code.length).trim();
          break;
        }
      }
    }

    setFdata({
      ...fData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      countryCode: extractedCode,
      phoneNumber: extractedNumber,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSubmit = () => {
    updatePersonalInformationAction(dispatch, fData);
  };

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
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Personal Details</h2>
            <p className="text-gray-500 mt-2 font-medium">Manage your personal information and contact details.</p>
          </div>
          
          <div className="flex flex-col space-y-8">
            {fData.success ? (
              <div className="bg-green-200 px-4 py-2 rounded-none">
                {fData.success}
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-gray-700 tracking-wide">
                Full Name
              </label>
              <input
                value={fData.name}
                onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                type="text"
                id="name"
                className="w-full px-5 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                placeholder="Your full name"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide flex items-center justify-between">
                <span>Email Address</span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-none">Primary</span>
              </label>
              <input
                value={fData.email}
                readOnly
                type="email"
                id="email"
                className="w-full px-5 py-4 text-gray-500 bg-gray-100 border-2 border-gray-200 rounded-none cursor-not-allowed font-medium"
                placeholder="Email address"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-gray-700 tracking-wide">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  value={fData.countryCode || "+1"}
                  onChange={(e) => setFdata({ ...fData, countryCode: e.target.value })}
                  className="w-[120px] md:w-[160px] cursor-pointer px-3 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                >
                  <option value="+1">🇺🇸 (+1)</option>
                  <option value="+44">🇬🇧 (+44)</option>
                  <option value="+233">🇬🇭 (+233)</option>
                  <option value="+234">🇳🇬 (+234)</option>
                  <option value="+254">🇰🇪 (+254)</option>
                  <option value="+27">🇿🇦 (+27)</option>
                  <option value="+61">🇦🇺 (+61)</option>
                  <option value="+91">🇮🇳 (+91)</option>
                  <option value="+49">🇩🇪 (+49)</option>
                  <option value="+33">🇫🇷 (+33)</option>
                </select>
                <input
                  value={fData.phoneNumber}
                  onChange={(e) => setFdata({ ...fData, phoneNumber: e.target.value })}
                  type="tel"
                  id="phone"
                  className="flex-1 px-5 py-4 text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-none focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                  placeholder="Phone number"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <div
                onClick={(e) => handleSubmit()}
                className="relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 overflow-hidden outline-none focus:ring-4 focus:ring-blue-500/30 w-full sm:w-auto px-10 py-4 text-base rounded-none-none bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:translate-y-px cursor-pointer group"
              >
                Save Changes
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

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;
