import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import { LayoutContext } from "../index";
import "./AuthStyles.css";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [action, setAction] = useState("login");

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    setAction(action === "login" ? "signup" : "login");
  };

  return (
    <Fragment>
      {/* Blurred Dark Overlay  */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } fixed inset-0 z-40 w-full h-screen auth-modal-wrapper`}
      ></div>

      {/* Auth Modal Container */}
      <section
        className={` ${
          data.loginSignupModal ? "flex" : "hidden"
        } fixed z-50 inset-0 items-center justify-center p-4 sm:p-6 overflow-hidden pointer-events-none`}
      >
        <div className="w-full max-w-[1000px] h-full sm:h-auto sm:max-h-[85vh] flex flex-col md:flex-row bg-white relative auth-modal-content pointer-events-auto rounded-none overflow-hidden">
          
          {/* Left Side: Visual Showcase (Hidden on Mobile) */}
          <div 
            className="hidden md:block md:w-5/12 lg:w-1/2 auth-image-pane"
            style={{ backgroundImage: "url('/auth-bg.png')" }}
          >
            <div className="auth-image-overlay"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <h2 className="text-3xl lg:text-4xl auth-typography-heading text-white mb-3">
                Elevate your style.
              </h2>
              <p className="auth-typography-body font-light text-gray-200 text-sm md:text-base leading-relaxed">
                Join our exclusive community for early access to curated collections, personalized recommendations, and member-only benefits.
              </p>
            </div>
          </div>

          {/* Right Side: Form Area */}
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col h-full bg-white relative">
            
            {/* Close Button */}
            <button
              onClick={(e) => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors z-20 focus:outline-none"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Form Content */}
            <div className="flex-grow overflow-y-auto px-6 py-10 sm:px-12 sm:py-16 custom-scrollbar flex flex-col justify-center">
              <div className="w-full max-w-md mx-auto">
                {action === "login" ? (
                  <Login setAction={setAction} />
                ) : action === "signup" ? (
                  <Signup />
                ) : (
                  <ForgotPassword setAction={setAction} />
                )}
                
                {action !== "forgot" && (
                  <Fragment>
                    <div className="auth-separator">or</div>
                    <button
                      onClick={(e) => changeLoginSignup()}
                      className="w-full py-3 text-sm font-medium tracking-wide uppercase auth-typography-body auth-btn-outline"
                    >
                      {action === "login" ? "Create an account" : "Sign in to existing"}
                    </button>
                  </Fragment>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;
