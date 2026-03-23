import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const AdminNavber = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <nav className="sticky z-10 flex items-center shadow-md justify-between px-4 py-4 md:px-8 top-0 w-full bg-white">
        {/* Removed Large Screen Hamburger */}
          <span
            onClick={(e) => history.push("/admin/dashboard")}
            className="hidden lg:flex items-left text-center font-serif font-light uppercase tracking-[0.3em] text-[#1a1a1a] text-2xl cursor-pointer px-4 select-none"
          >
            SHOP-IT
          </span>
        {/* Small Screen Show */}
        <div className="lg:hidden flex items-center">
          <svg
            id="hamburgerBtn"
            className="lg:hidden w-8 h-8 cursor-pointer text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span
            onClick={(e) => history.push("/admin/dashboard")}
            className="flex items-left text-center font-serif font-light uppercase tracking-[0.2em] text-[#1a1a1a] text-xl cursor-pointer px-2"
          >
            SHOP-IT
          </span>
        </div>
        {/* Both Screen show */}
        <div className="flex items-center space-x-2">

          {/* Logout Button Dropdown */}
          <div
            className="relative group p-2 cursor-pointer flex items-center justify-center"
            title="Account"
          >
            <img
              src="/profile.png"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-600 object-cover transition-all duration-300 shadow-sm"
            />
            
            {/* The invisible hover bridge */}
            <div className="absolute right-0 top-full h-4 w-full bg-transparent"></div>

            <div className="absolute right-0 top-[110%] w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white border border-gray-100 shadow-2xl rounded-none transform origin-top-right scale-95 group-hover:scale-100 py-2">
                <ul className="flex flex-col text-sm text-[#1a1a1a] font-medium tracking-wide">
                <li
                  onClick={(e) => history.push("/")}
                  className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300 flex items-center space-x-3"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Shop</span>
                </li>
                <li className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300 flex items-center space-x-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Setting</span>
                </li>
                <div className="my-1 border-t border-gray-100"></div>
                <li
                  onClick={(e) => logout()}
                  className="px-6 py-3 hover:bg-red-50 hover:text-red-600 hover:pl-8 cursor-pointer transition-all duration-300 flex items-center space-x-3"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        {/* Mobile Navber */}
        {/* End Mobile Navber */}
      </nav>
    </Fragment>
  );
};

export default AdminNavber;
