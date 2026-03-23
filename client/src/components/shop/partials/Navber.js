import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const renderNavLink = (name, path) => {
    const isActive = location.pathname === path;
    return (
      <span
        className={`relative pb-1 cursor-pointer transition-colors duration-300 ${
          isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-blue-600"
        } after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:bg-blue-600 after:transition-all after:duration-300 ${
          isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
        }`}
        onClick={() => history.push(path)}
      >
        {name}
      </span>
    );
  };

  const renderMobileLink = (name, path) => {
    const isActive = location.pathname === path;
    return (
      <div
        className={`block px-3 py-4 rounded-none border-b border-gray-50 cursor-pointer transition-colors ${
          isActive ? "text-blue-600 bg-blue-50 font-bold" : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
        }`}
        onClick={(e) => {
          history.push(path);
          dispatch({ type: "hamburgerToggle", payload: false });
        }}
      >
        {name}
      </div>
    );
  };

  return (
    <Fragment>
      {/* Navber Section */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={(e) => navberToggleOpen()}
                className="p-2 -ml-2 text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation Links (Left) */}
            <div className="hidden lg:flex flex-1 items-center space-x-10 text-[13px] font-medium tracking-widest text-gray-500 uppercase">
              {renderNavLink("Shop", "/")}
              {renderNavLink("Blog", "/blog")}
              {renderNavLink("Contact", "/contact-us")}
            </div>

            {/* Logo (Center) */}
            <div
              className="flex-shrink-0 flex items-center justify-center cursor-pointer"
              onClick={(e) => history.push("/")}
            >
              <span className="text-2xl font-bold text-gray-900 tracking-wider">
                SHOP IT.
              </span>
            </div>

            {/* Right Icons: Wishlist, User, Cart */}
            <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-6">
              
              {/* WishList */}
              <button
                onClick={(e) => history.push("/wish-list")}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
                title="Wishlist"
              >
                <svg
                  className={`w-6 h-6 ${
                    location.pathname === "/wish-list"
                      ? "fill-current text-blue-600"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              {/* User / Auth */}
              {localStorage.getItem("jwt") ? (
                <div
                  className="relative group p-2 cursor-pointer"
                  title="Account"
                >
                  <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-600 object-cover transition-all duration-300 shadow-sm"
                  />
                  
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-50">
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-none transform origin-top-right scale-95 group-hover:scale-100 py-2">
                      <ul className="flex flex-col text-sm text-[#1a1a1a] font-medium tracking-wide">
                        {isAdmin() && (
                          <>
                            <li
                              onClick={(e) => history.push("/admin/dashboard")}
                              className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300 font-bold text-blue-700 bg-blue-50/50"
                            >
                              Admin Dashboard
                            </li>
                            <div className="my-1 border-t border-gray-100"></div>
                          </>
                        )}
                        <li
                          onClick={(e) => history.push("/user/orders")}
                          className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300"
                        >
                          My Orders
                        </li>
                        <li
                          onClick={(e) => history.push("/user/profile")}
                          className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300"
                        >
                          My Account
                        </li>
                        <li
                          onClick={(e) => history.push("/wish-list")}
                          className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300"
                        >
                          My Wishlist
                        </li>
                        <li
                          onClick={(e) => history.push("/user/setting")}
                          className="px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:pl-8 cursor-pointer transition-all duration-300"
                        >
                          Settings
                        </li>
                        <div className="my-1 border-t border-gray-100"></div>
                        <li
                          onClick={(e) => logout()}
                          className="px-6 py-3 hover:bg-red-50 hover:text-red-600 hover:pl-8 cursor-pointer transition-all duration-300"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={(e) => loginModalOpen()}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
                  title="Login"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </button>
              )}

              {/* Cart */}
              <button
                onClick={(e) => cartModalOpen()}
                className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors focus:outline-none"
                title="Cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                  {data.cartProduct !== null ? data.cartProduct.length : 0}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            data.navberHamburger ? "block" : "hidden"
          } lg:hidden border-t border-gray-100 bg-white`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 text-xs font-medium text-gray-500 uppercase tracking-widest">
            {renderMobileLink("Shop", "/")}
            {renderMobileLink("Blog", "/blog")}
            {renderMobileLink("Contact", "/contact-us")}
          </div>
        </div>
      </nav>
      {/* End Navber Section */}
    </Fragment>
  );
};

export default Navber;
