import { useRef, useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log({ name, email, password });
    axios({
      method: "POST",
      url: "http://localhost:1111/register",
      data: {
        username,
        email,
        password,
      },
    })
      .then((res) => {
        console.log("user Register succesfull", res.data.message);
        setSuccess("Register successfull. Redirecting to login...");
        navigate("/login");
      })
      .catch((err) => {
        console.log("user register error ", err);
        setError("Something is wrong!! can't register your account");
      });
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your name"
              ref={usernameRef}
              className="w-full border border-gray-200 py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              className="w-full border border-gray-200 py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
              className="w-full border border-gray-200 py-2 px-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2 font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm mt-2 font-semibold">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary-color hover:bg-secondary-color active:bg-primary-color font-semibold rounded-lg shadow-md transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-md text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-color hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
