import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';
import { Button } from "../partials";
import { Eye, EyeOff } from "lucide-react";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const alertMsg = (msg, type) => (
    <div className={`text-sm text-${type}-500 mt-1`}>{msg}</div>
  );
  
  const { enqueueSnackbar } = useSnackbar();
  
  const formSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        loading: false,
        error: {
          cPassword: "Passwords don't match",
          password: "Passwords don't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.token) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        })
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        })
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
      setData({ ...data, loading: false });
    }
  };

  return (
    <Fragment>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-500 text-sm">Join us for an exclusive shopping experience.</p>
      </div>

      <form className="space-y-4" onSubmit={formSubmit}>
        {data.success && (
          <div className="bg-green-50 text-green-700 border border-green-200 p-3 text-sm">
            {data.success}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            className={`w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400 ${
              data.error?.name ? "border-red-500 focus:border-red-500 shadow-[0_0_0_1px_#ef4444]" : ""
            }`}
            placeholder="Jane Doe"
          />
          {data.error?.name && alertMsg(data.error.name, "red")}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className={`w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400 ${
              data.error?.email ? "border-red-500 focus:border-red-500 shadow-[0_0_0_1px_#ef4444]" : ""
            }`}
            placeholder="jane@example.com"
          />
          {data.error?.email && alertMsg(data.error.email, "red")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    success: false,
                    error: {},
                    password: e.target.value,
                  })
                }
                value={data.password}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                required
                className={`w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400 pr-12 ${
                  data.error?.password ? "border-red-500 focus:border-red-500 shadow-[0_0_0_1px_#ef4444]" : ""
                }`}
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
            {data.error?.password && alertMsg(data.error.password, "red")}
          </div>

          <div>
            <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    success: false,
                    error: {},
                    cPassword: e.target.value,
                  })
                }
                value={data.cPassword}
                type={showConfirmPassword ? "text" : "password"}
                id="cPassword"
                name="cPassword"
                autoComplete="new-password"
                required
                className={`w-full px-4 py-3 text-gray-900 auth-input focus:outline-none placeholder-gray-400 pr-12 ${
                  data.error?.cPassword ? "border-red-500 focus:border-red-500 shadow-[0_0_0_1px_#ef4444]" : ""
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {data.error?.cPassword && alertMsg(data.error.cPassword, "red")}
          </div>
        </div>

        <div className="pt-4 pb-2">
          <Button
            type="submit"
            disabled={data.loading}
            className="w-full"
          >
            {data.loading ? "Creating..." : "Create Account"}
          </Button>
        </div>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          By registering, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </Fragment>
  );
};

export default Signup;
