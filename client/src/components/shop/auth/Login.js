import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';
import { Button } from "../partials";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setAction }) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "", 
    isAdmin: false,
    error: false,
    loading: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' })
        window.location.href = "/";
      }    
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Enter your credentials to access your account.</p>
      </div>

      {layoutData.loginSignupError && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-3 mb-6 text-sm">
          You need to login for checkout. Don't have an account? Create one.
        </div>
      )}

      {data.error && (
        <div className="bg-red-50 text-red-600 border border-red-100 p-3 mb-6 text-sm">
          {data.error}
        </div>
      )}

      <form className="space-y-5" onSubmit={formSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value, error: false });
                layoutDispatch({ type: "loginSignupError", payload: false });
              }}
              value={data.password}
              type={showPassword ? "text" : "password"}
              id="password"
              required
              className="w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400 pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 mb-8">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-600 cursor-pointer">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <span onClick={() => setAction("forgot")} className="font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
              Forgot your password?
            </span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={data.loading}
          className="w-full"
        >
          {data.loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Fragment>
  );
};

export default Login;
