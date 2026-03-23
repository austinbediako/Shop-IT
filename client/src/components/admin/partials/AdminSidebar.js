import React, { Fragment } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Fragment>
      <div
        id="sidebar"
        className="hidden md:block sticky top-0 left-0 h-screen md:w-3/12 lg:w-2/12 border-r border-gray-100 bg-white text-gray-600"
      >
        <div
          onClick={(e) => history.push("/admin/dashboard")}
          className={`${
            location.pathname === "/admin/dashboard"
              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              : "hover:bg-blue-50/50 text-gray-500 hover:text-blue-600"
          } cursor-pointer flex flex-col items-center justify-center py-6 transition-all duration-300`}
        >
          <span>
            <svg
              className={`w-8 h-8 ${location.pathname === "/admin/dashboard" ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-widest">Dashboard</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/categories")}
          className={`${
            location.pathname === "/admin/dashboard/categories"
              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              : "hover:bg-blue-50/50 text-gray-500 hover:text-blue-600"
          } cursor-pointer flex flex-col items-center justify-center py-6 transition-all duration-300`}
        >
          <span>
            <svg
              className={`w-8 h-8 ${location.pathname === "/admin/dashboard/categories" ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-widest">Categories</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/products")}
          className={`${
            location.pathname === "/admin/dashboard/products"
              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              : "hover:bg-blue-50/50 text-gray-500 hover:text-blue-600"
          } cursor-pointer flex flex-col items-center justify-center py-6 transition-all duration-300`}
        >
          <span>
            <svg
              className={`w-8 h-8 ${location.pathname === "/admin/dashboard/products" ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}
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
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-widest">Products</span>
        </div>
        <hr className="border-b border-gray-200" />
        <div
          onClick={(e) => history.push("/admin/dashboard/orders")}
          className={`${
            location.pathname === "/admin/dashboard/orders"
              ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              : "hover:bg-blue-50/50 text-gray-500 hover:text-blue-600"
          } cursor-pointer flex flex-col items-center justify-center py-6 transition-all duration-300`}
        >
          <span>
            <svg
              className={`w-8 h-8 ${location.pathname === "/admin/dashboard/orders" ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </span>
          <span className="mt-2 text-xs font-semibold uppercase tracking-widest">Orders</span>
        </div>
        <hr className="border-b border-gray-200" />
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
