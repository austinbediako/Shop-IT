import React, { Fragment, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);

  const history = useHistory();
  const location = useLocation();

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-6 md:w-3/12 font-medium">
        <div className="flex items-center space-x-4 rounded-none-none shadow-sm border border-gray-200 p-6 bg-white text-gray-800">
          <div className="flex-shrink-0">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-16 h-16 rounded-full border border-gray-200 object-cover shadow-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm text-gray-500 tracking-widest font-bold">Hello,</span>
            <span className="text-xl font-bold text-gray-900">
              {data.userDetails ? data.userDetails.name : "User"}
            </span>
          </div>
        </div>
        
        <div className="shadow-sm border border-gray-200 hidden md:flex flex-col w-full bg-white rounded-none-none overflow-hidden py-4">
          <div
            onClick={(e) => history.push("/user/orders")}
            className={`mx-4 px-5 py-3 rounded-none-none transition-all duration-200 cursor-pointer mb-2 flex items-center space-x-3 ${
              location.pathname === "/user/orders"
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span>My Orders</span>
          </div>
          
          <div
            onClick={(e) => history.push("/user/profile")}
            className={`mx-4 px-5 py-3 rounded-none-none transition-all duration-200 cursor-pointer mb-2 flex items-center space-x-3 ${
              location.pathname === "/user/profile"
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span>My Account</span>
          </div>
          
          <div
            onClick={(e) => history.push("/wish-list")}
            className={`mx-4 px-5 py-3 rounded-none-none transition-all duration-200 cursor-pointer mb-2 flex items-center space-x-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900`}
          >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            <span>My Wishlist</span>
          </div>
          
          <div
            onClick={(e) => history.push("/user/setting")}
            className={`mx-4 px-5 py-3 rounded-none-none transition-all duration-200 cursor-pointer mb-2 flex items-center space-x-3 ${
              location.pathname === "/user/setting"
                ? "bg-blue-50 text-blue-600 font-bold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>Settings</span>
          </div>
          
          <div className="px-4 py-2"><hr className="border-gray-200" /></div>
          
          <div
            onClick={(e) => logout()}
            className={`mx-4 px-5 py-3 rounded-none-none transition-all duration-200 cursor-pointer mt-1 flex items-center space-x-3 text-red-600 hover:bg-red-50 hover:text-red-700`}
          >
             <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span>Log Out</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
