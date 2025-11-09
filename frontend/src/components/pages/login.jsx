import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ForgotPassDialog } from "./forgotPassworDialog";
import axios from "axios";

const Login = () => {
  const [forgotPassDialog, showforgotPassDialog] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      {forgotPassDialog && (
        <ForgotPassDialog showforgotPassDialog={showforgotPassDialog} />
      )}
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                placeholder="Enter Email"
                type="text"
                ref={emailRef}
                className="focus:outline-none w-full border border-gray-200 py-2 px-4 rounded-lg"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-600 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                placeholder="Enter Password"
                type="password"
                ref={passwordRef}
                className="focus:outline-none w-full border mt-1 border-gray-200 py-2 px-4 rounded-lg"
              />
            </div>
            <div className="inline-flex justify-between items-center mt-2">
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor="check-2"
              >
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                  id="check-2"
                />
                <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <label
                  className="cursor-pointer ml-2 text-slate-600 text-sm"
                  htmlFor="check-2"
                >
                  Remember Me
                </label>
              </label>
              <p
                onClick={() => showforgotPassDialog(true)}
                className="text-sm text-blue-600 underline cursor-pointer mt-2 ml-34"
              >
                Forgot Password?
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 font-semibold">{error}</p>
            )}
            {success && (
              <p className="text-green-500 text-sm mt-2 font-semibold">
                {success}
              </p>
            )}

            <button
              type="submit"
              className="focus:outline-none w-full bg-primary-color py-2 px-4 rounded-lg hover:bg-secondary-color transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-md text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to={`/register`}
              className="text-md text-primary-color hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
