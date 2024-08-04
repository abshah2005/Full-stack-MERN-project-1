import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../ContextProvider/LoginProvider";
import Loader from "./Loader"

const LoginForm = () => {
  const navigate=useNavigate();
  const {
    user,
    setuser,
    setrole,
    role,
    isadmin,
    setIsadmin,
    isloggedin,
    setIsloggedin,
  } = useContext(LoginContext);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [Lformdata, setLFormdata] = useState({
    email: "",
    password: "",
  });
  const[isLoading,setIsLoading]=useState(false);

  console.log(token);

  const handleLchange = (e) => {
    setLFormdata({ ...Lformdata, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/users/login", Lformdata)
      .then((res) => {
        setrole(res.data.data[0].role);
        localStorage.setItem("Token", JSON.stringify(res.data.data[1]));
        setToken(JSON.parse(localStorage.getItem("Token")));
        localStorage.setItem("role", res.data.data[0].role);

        setuser(res.data.data[0]);
        
        localStorage.setItem("User", JSON.stringify(res.data.data[0]));
        setIsloggedin(true);

        if (res.data.data[0].role === "admin") {
          setIsadmin(true);
          if (isadmin) {
            console.log("you are logged in as admin");
          }
        } else {
          setIsadmin(false);
          console.log(`You are logged in as ${user.role}`);
        }
        alert("Logged in successfully");
        navigate("/");
        console.log("this is user data:- ", res.data.data[0]);
        console.log("this is the role of user", res.data.data[0].role);
        console.log("your access token is ", res.data.data[1]);
      })
      .catch((err) => {
        // console.log("logging in failed", err.message);
        alert("Incorrect Pass or Email",err);
        localStorage.removeItem("User");
      }).finally(()=>{
        setIsLoading(false);
        
      });
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
     {isLoading && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur pointer-events-none z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <Loader />
          </div>
          <div className="fixed inset-0 pointer-events-auto z-50">
            {/* This div intercepts clicks to make background unclickable */}
          </div>
        </>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        <div className="px-10 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            Log in to your account
          </h2>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={handleLchange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                placeholder="Password"
                onChange={handleLchange}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <button
                  type="button"
                  className="text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a9 9 0 110 14.142V17a2 2 0 01-4 0v-2.858A9 9 0 0110 3zm0 4a2 2 0 100 4 2 2 0 000-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M10 3a9 9 0 110 14.142V17a2 2 0 01-4 0v-2.858A9 9 0 0110 3zm0 4a2 2 0 100 4 2 2 0 000-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>

              <div className="flex justify-around ">
                <p className="text-sm mt-2 font-medium rounded-md  text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  not signed up? signup now
                </p>

                <Link to="/Signup">
                  <button
                    type="submit"
                    className="w-[100%] ml-6 mt-2 py-2 px-3 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    sign up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
